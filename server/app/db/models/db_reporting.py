from sqlalchemy import Boolean, ForeignKey, Integer, String
from app.db.database import BaseDbModel
from sqlalchemy.orm import mapped_column


class DbReporting(BaseDbModel):
    __tablename__ = "reporting"

    reporting_survivor_id = mapped_column(
        Integer, ForeignKey("survivor.id"), primary_key=True
    )
    reported_survivor_id = mapped_column(
        Integer, ForeignKey("survivor.id"), primary_key=True
    )
