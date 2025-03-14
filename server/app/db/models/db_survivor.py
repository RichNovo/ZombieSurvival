from sqlalchemy import Boolean, Integer, String
from app.db.database import BaseDbModel
from sqlalchemy.orm import mapped_column


class DbSurvivor(BaseDbModel):
    __tablename__ = "survivor"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String, index=False, nullable=False)
    age = mapped_column(Integer, unique=False, nullable=False)
    gender = mapped_column(String, unique=False, nullable=False)
    latitude = mapped_column(Integer, unique=False, nullable=False)
    longitude = mapped_column(Integer, unique=False, nullable=False)
