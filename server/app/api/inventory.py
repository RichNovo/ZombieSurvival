from typing import List
from fastapi import APIRouter

from app.db.database import SessionLocal
from app.db.models.db_inventory_item import DbInventoryItem
from app.models.api_models import PRICE_TABLE, InventoryItem, TradeRequest

router = APIRouter()


@router.get("/")
async def get_survivor_inventory(suvivor_id: int) -> List[InventoryItem]:
    """
    Retrieves the inventory of a specific survivor.

    Args:
        suvivor_id (int): The ID of the survivor whose inventory is being requested.

    Returns:
        List[InventoryItem]: A list of inventory items belonging to the specified survivor.
    """
    with SessionLocal() as sess:
        item_list = (
            sess.query(DbInventoryItem)
            .where(DbInventoryItem.survivor_id == suvivor_id)
            .all()
        )
        ret = [
            InventoryItem(
                id=item.id,
                survivor_id=item.survivor_id,
                item_type=item.item_type,
                amount=item.amount,
            )
            for item in item_list
        ]
        return ret


@router.post("/trade")
async def trade(
    trade_request: TradeRequest,
) -> None:
    """
    Handles the trading of inventory items between two survivors.

    Args:
        trade_request (TradeRequest): The trade request containing sender ID, receiver ID,
                                      and the item deltas.

    Raises:
        Exception: If the trade is imbalanced or if a survivor has insufficient items.

    Returns:
        None
    """
    item_deltas = trade_request.item_deltas

    if (
        sum(
            [
                PRICE_TABLE[item_type] * item_deltas[item_type]
                for item_type in item_deltas
            ]
        )
        != 0
    ):
        raise Exception("Inbalanced trade")

    with SessionLocal() as sess:

        def trade(survivor_id, trade_sign):
            db_item_list = (
                sess.query(DbInventoryItem)
                .where(
                    DbInventoryItem.survivor_id == survivor_id,
                    DbInventoryItem.item_type.in_(
                        [item_type for item_type in item_deltas]
                    ),
                )
                .all()
            )
            db_item_dict = {item.item_type: item for item in db_item_list}
            for item_type in item_deltas:
                if (
                    item_deltas[item_type] != 0
                    and item_deltas[item_type] * trade_sign < 0
                    and (
                        (item_type not in db_item_dict)
                        or db_item_dict[item_type].amount
                        < trade_sign * item_deltas[item_type]
                    )
                ):
                    sess.rollback()
                    raise Exception(
                        f"Insufficient balance for survivor with id: {survivor_id} has no balance"
                    )

            # calculate new balance
            for item_type in item_deltas:
                if item_deltas[item_type] == 0:
                    continue
                if item_type in db_item_dict:
                    db_item = db_item_dict[item_type]
                else:
                    db_item = DbInventoryItem(
                        survivor_id=survivor_id, item_type=item_type, amount=0
                    )

                db_item.amount += trade_sign * item_deltas[item_type]

                if item_type in db_item_dict:
                    if db_item.amount == 0:
                        sess.delete(db_item)
                else:
                    if db_item.amount != 0:
                        sess.add(db_item)

        trade(trade_request.sender_id, 1)
        trade(trade_request.receiver_id, -1)
        sess.commit()
