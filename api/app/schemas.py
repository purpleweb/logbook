from pydantic import BaseModel, validator
from datetime import date
from typing import List

class GarageCreate(BaseModel):
    name: str
    phone: str | None = None
    class Config:
        orm_mode = True

class GarageModel(GarageCreate):
    id: int

class OperationCreate(BaseModel):
    title: str

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


class InterventionCreate(BaseModel):
    date: date
    km: int
    cost: float
    operations: str
    garage: str
    description: str | None = None

    @validator('km')
    def km_must_be_positive(cls, v):
        if v < 0:
            raise ValueError('km must be positive')
        return v

    @validator('cost')
    def cost_must_be_positive(cls, v):
        if v < 0:
            raise ValueError('cost must be positive')
        return v

    class Config:
        orm_mode = True