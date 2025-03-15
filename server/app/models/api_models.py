from enum import Enum
from typing import Dict, List, Tuple

from pydantic import BaseModel, field_validator


class Survivor(BaseModel):
    id: int
    name: str
    age: int
    gender: str
    latitude: int
    longitude: int

    @field_validator("age")
    @classmethod
    def check_non_negative(cls, value: int) -> int:
        if value < 0:
            raise ValueError("age must be >= 0")
        return value


class SurvivorListReply(BaseModel):
    survivors_with_reported: List[Tuple[Survivor, int]]


class InventoryItem(BaseModel):
    id: int
    survivor_id: int
    item_type: str
    amount: int


class CreateSurvivorRequest(BaseModel):

    survivor: Survivor
    item_type_and_amount_dict: Dict[str, int]


class TradeRequest(BaseModel):
    sender_id: int
    receiver_id: int
    item_deltas: Dict[str, int]


class ItemType(Enum):
    WATER = 0
    FOOD = 1
    MEDICATION = 2
    AMMUNITION = 3


PRICE_TABLE = dict(
    {
        "Water": 4,
        "Food": 3,
        "Medication": 2,
        "Ammunition": 1,
    }
)
