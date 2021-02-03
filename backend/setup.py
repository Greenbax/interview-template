from backend.db import engine, db_session, Base
from backend.models.user_model import UserModel
import csv

FIRST_NAMES = ['John', 'Kevin', "Laura", 'Kelly', "Joe", 'Jill', 'Jack', 'James', 'Michael', 'Mary', 'Linda', 'Elizabeth']
LAST_NAMES = ['Smith', 'Doe', 'Johnson', 'Brown', 'Williams', 'Jones', 'Miller']

def setup():
  # import all modules here that might define models so that
  # they will be registered properly on the metadata.  Otherwise
  # you will have to import them first before calling init_db()
  for fn in FIRST_NAMES:
    for ln in LAST_NAMES:
      user = UserModel(first_name=fn, last_name=ln)
      db_session.add(user)
  db_session.commit()
