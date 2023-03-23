from sqlalchemy import Column, ForeignKey, Integer, String, Date, Table
from sqlalchemy.orm import relationship, Mapped
from typing import List

from database import Base


class Garage(Base):
    __tablename__ = "garage"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    phone = Column(String, nullable=True)
    interventions = relationship("Intervention", back_populates="garage")
    def __repr__(self) -> str:
        return f"Garage(id={self.id!r}, name={self.name!r}, phone={self.phone!r})"

association_intervention_operation = Table(
    "intervention_operation",
    Base.metadata,
    Column("intervention_id", ForeignKey("intervention.id")),
    Column("operation_id", ForeignKey("operation.id")),
)

class Operation(Base):
    __tablename__ = "operation"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)


class Intervention(Base):
    __tablename__ = "intervention"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    description = Column(String, index=True)
    garage_id = Column(Integer, ForeignKey("garage.id"), nullable=True)
    garage = relationship("Garage", back_populates="interventions", lazy="joined")
    operations: Mapped[List[Operation]] = relationship(secondary=association_intervention_operation, lazy="joined")

