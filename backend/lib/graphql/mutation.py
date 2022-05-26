import graphene
from backend.db import db_session
from graphene_sqlalchemy import SQLAlchemyObjectType
from backend.lib.utils import input_to_dictionary
from models.vendor_model import VendorModel
from .query import Vendor

class UpdateVendor(graphene.Mutation):
  class Arguments:
    # args = UpdateVendorInput(required=True)
    id = graphene.ID(required=True)
    status = graphene.Int()
    category = graphene.String()
  
  #output fields
  vendor = graphene.Field(lambda: Vendor)
  
  def mutate(self, info, **kwargs):
    data = input_to_dictionary(kwargs)
    vendor_to_update = db_session.query(VendorModel).filter_by(id=data['id'])
    vendor_to_update.update(data)
    db_session.commit()
    vendor_after_update = db_session.query(VendorModel).filter_by(id=data['id']).first()
    return UpdateVendor(vendor=vendor_after_update)
  
  
class Mutation(graphene.ObjectType):
  updateVendor = UpdateVendor.Field()