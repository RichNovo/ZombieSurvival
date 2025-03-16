from typing import Optional
from fastapi import APIRouter
from sqlalchemy import func

from app.db.database import SessionLocal
from app.db.models.db_inventory_item import DbInventoryItem
from app.db.models.db_reporting import DbReporting
from app.db.models.db_survivor import DbSurvivor
from app.models.api_models import CreateSurvivorRequest, Survivor, SurvivorListReply

router = APIRouter()


@router.get("/")
async def get_survivors() -> SurvivorListReply:
    with SessionLocal() as sess:
        survivor_list = (
            sess.query(
                DbSurvivor,
                func.count(DbReporting.reported_survivor_id).label("reported_count"),
            )
            .outerjoin(DbReporting, DbSurvivor.id == DbReporting.reported_survivor_id)
            .group_by(DbSurvivor.id, DbReporting.reported_survivor_id)
            .all()
        )
        survivors_with_reported = [
            (
                Survivor(
                    id=survivor.id,
                    name=survivor.name,
                    age=survivor.age,
                    gender=survivor.gender,
                    latitude=survivor.latitude,
                    longitude=survivor.longitude,
                ),
                reported_count,
            )
            for survivor, reported_count in survivor_list
        ]
        return SurvivorListReply(survivors_with_reported=survivors_with_reported)


@router.post("/")
async def create_survivor(new_survivor_request: CreateSurvivorRequest) -> None:
    with SessionLocal() as sess:
        survivor = new_survivor_request.survivor
        item_type_and_amount_dict = new_survivor_request.item_type_and_amount_dict
        new_survivor = DbSurvivor(
            id=None,
            name=survivor.name,
            age=survivor.age,
            gender=survivor.gender,
            latitude=survivor.latitude,
            longitude=survivor.longitude,
        )
        sess.add(new_survivor)
        sess.flush()

        for item_type in item_type_and_amount_dict:
            if item_type_and_amount_dict[item_type] > 0:
                new_item = DbInventoryItem(
                    id=None,
                    survivor_id=new_survivor.id,
                    item_type=item_type,
                    amount=item_type_and_amount_dict[item_type],
                )
                sess.add(new_item)
        sess.commit()


@router.put("/")
async def update_survivor(id: int, longitude: int, latitude: int) -> Optional[Survivor]:
    with SessionLocal() as sess:
        db_survivor = sess.query(DbSurvivor).filter(DbSurvivor.id == id).first()
        if not db_survivor:
            return None
        db_survivor.longitude = longitude
        db_survivor.latitude = latitude
        sess.commit()
    return None


@router.put("/report")
async def report_survivor(
    reporting_survivor_id: int, reported_survivor_id: int
) -> bool:
    with SessionLocal() as sess:
        reporting_relation_count = (
            sess.query(DbReporting)
            .where(
                DbReporting.reporting_survivor_id == reporting_survivor_id,
                DbReporting.reported_survivor_id == reported_survivor_id,
            )
            .count()
        )

        # survivor already reported
        if reporting_relation_count > 0:
            return False

        sess.add(
            DbReporting(
                reporting_survivor_id=reporting_survivor_id,
                reported_survivor_id=reported_survivor_id,
            )
        )
        sess.commit()
    return True
