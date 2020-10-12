from dataclasses import dataclass
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

@dataclass
class Registration(Base):
    __tablename__= 'registration'

    listing_id: int = Column(Integer, ForeignKey('listing.id'), nullable=False)
    user_id: int = Column(Integer, ForeignKey('user.id'), nullable=False)
    bid: int = Column(Integer, nullable=False)
    card_number: str = Column(String(), nullable=False)
    expiry: datetime = Column(DateTime, nullable=False)
    ccv: str = Column(String(), nullable=False)

    user = relationship('User')
    listing = relationship('Listing')