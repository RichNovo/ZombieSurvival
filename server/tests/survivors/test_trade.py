import pytest

from app.api.inventory import trade
from app.api.survivors import get_survivors
from app.db.models.db_inventory_item import DbInventoryItem
from app.db.models.db_survivor import DbSurvivor
from app.models.api_models import TradeRequest
from conftest import TestingSessionLocal


@pytest.mark.asyncio
async def test_add_survivor(db_engine):
    with TestingSessionLocal() as sess:
        user = DbSurvivor(
            name="Alice", age=12, gender="Male", latitude=12, longitude=10
        )
        sess.add(user)
        sess.commit()
        ret = await get_survivors()
        assert ret.survivors_with_reported[0][0].name == "Alice"


@pytest.fixture
def populate_inventory():
    with TestingSessionLocal() as sess:
        sess.add(DbInventoryItem(survivor_id=1, item_type="Water", amount=5))
        sess.add(DbInventoryItem(survivor_id=2, item_type="Food", amount=5))
        sess.commit()
        yield sess


@pytest.mark.asyncio
async def test_successful_trade(db_engine, populate_inventory):
    trade_request = TradeRequest(
        sender_id=1, receiver_id=2, item_deltas={"Water": -3, "Food": 4}
    )

    with TestingSessionLocal() as sess:
        sender_water = (
            sess.query(DbInventoryItem)
            .filter_by(survivor_id=1, item_type="Water")
            .first()
        )
        receiver_food = (
            sess.query(DbInventoryItem)
            .filter_by(survivor_id=2, item_type="Food")
            .first()
        )

        assert sender_water.amount == 5
        assert receiver_food.amount == 5

        sess.commit()

        await trade(trade_request)

        sender_water = (
            sess.query(DbInventoryItem)
            .filter_by(survivor_id=1, item_type="Water")
            .first()
        )
        receiver_food = (
            sess.query(DbInventoryItem)
            .filter_by(survivor_id=2, item_type="Food")
            .first()
        )
        assert sender_water.amount == 2  # Sender lost 3 water
        assert receiver_food.amount == 1  # Receiver lost 4 food


@pytest.mark.asyncio
async def test_imbalanced_trade():
    trade_request = TradeRequest(
        sender_id=1, receiver_id=2, item_deltas={"Water": -2, "Food": 1}
    )

    with pytest.raises(Exception, match="Inbalanced trade"):
        await trade(trade_request)


@pytest.mark.asyncio
async def test_insufficient_balance(db_engine, populate_inventory):
    trade_request = TradeRequest(
        sender_id=1, receiver_id=2, item_deltas={"Medication": 10, "Ammunition": -20}
    )
    with pytest.raises(Exception, match="Insufficient balance"):
        await trade(trade_request)
