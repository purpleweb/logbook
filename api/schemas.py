from pydantic import BaseModel
from datetime import date
from typing import List

class GarageCreate(BaseModel):
    name: str
    phone: str | None = None
    class Config:
        orm_mode = True

class GarageModel(GarageCreate):
    id: int

class OperationModel(BaseModel):
    id: int
    title: str
    class Config:
        orm_mode = True

class InterventionModel(BaseModel):
    id: int
    date: date
    km: int
    cost: float
    description: str | None = None
    garage: GarageModel
    operations: List[OperationModel]

    class Config:
        orm_mode = True