from sqlalchemy import ForeignKey, Integer, String
from app.db.database import BaseDbModel
from sqlalchemy.orm import mapped_column


class DbInventoryItem(BaseDbModel):
    __tablename__ = "inventory_item"

    id = mapped_column(Integer, primary_key=True, index=True)
    survivor_id = mapped_column(
        Integer,
        ForeignKey("survivor.id"),
        index=False,
        nullable=False,
    )
    item_type = mapped_column(String, unique=False, nullable=False)
    amount = mapped_column(Integer, unique=False, nullable=False)
