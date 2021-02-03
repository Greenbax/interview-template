from backend.db import engine, db_session, Base
from backend.models.user_model import UserModel
from backend.models.vendor_model import VendorModel
import csv

FIRST_NAMES = ['John', 'Kevin', "Laura", 'Kelly', "Joe", 'Jill', 'Jack', 'James', 'Michael', 'Mary', 'Linda', 'Elizabeth']
LAST_NAMES = ['Smith', 'Doe', 'Johnson', 'Brown', 'Williams', 'Jones', 'Miller']

def init_db():
  # import all modules here that might define models so that
  # they will be registered properly on the metadata.  Otherwise
  # you will have to import them first before calling init_db()
  Base.metadata.drop_all(bind=engine)
  Base.metadata.create_all(bind=engine)

  user = UserModel(first_name="Test", last_name="User")
  db_session.add(user)

  with open('vendors.csv', 'r') as f:
    for i, line in enumerate(csv.reader(f)):
      if i == 0: continue
      name, category, website, description, status, risk, tier = line
      db_session.add(VendorModel(
        name=name,
        description=description,
        external_link=website,
        category=category,
        status=int(status),
        risk=risk,
        tier=tier
      ))

  for fn in FIRST_NAMES:
    for ln in LAST_NAMES:
      user = UserModel(first_name=fn, last_name=ln, email=f'{fn}.{ln}@tryevergreen.com', is_admin=False)
      db_session.add(user)
  db_session.commit()
