import graphene
from graphene import ObjectType, String, Schema
from graphene_sqlalchemy import SQLAlchemyObjectType
from models.vendor_model import VendorModel

class Vendor(SQLAlchemyObjectType):
  class Meta:
    model = VendorModel

class Query(ObjectType):
  vendors = graphene.List(Vendor)
  vendor = graphene.Field(Vendor, id=graphene.Int())
  
  def resolve_vendors(root, info):
    query = Vendor.get_query(info)
    return query.all()

  def resolve_vendor(root, info, id):
    query = Vendor.get_query(info)
    return query.filter(VendorModel.id == id).first()
    

schema = Schema(query=Query)
