from sqlalchemy import Column, Integer, String

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.sqltypes import Boolean
from backend.db import Base

class UserModel(Base):
  __tablename__ = 'user'
  id = Column(Integer, primary_key=True)
  first_name = Column(String)
  last_name = Column(String)
  email = Column(String)
  is_admin = Column(Boolean)
