import graphene
from graphene import ObjectType, String, Schema
from graphene_sqlalchemy import SQLAlchemyObjectType
from models.user_model import UserModel

class User(SQLAlchemyObjectType):
  class Meta:
    model = UserModel

class Query(ObjectType):
  users = graphene.List(User, searchText=graphene.String())
  user = graphene.Field(User, id=graphene.Int())

  def resolve_users(root, info, searchText=None):
    print(searchText)
    query = User.get_query(info)  # SQLAlchemy query
    if searchText and False:
      return query.filter(UserModel.email.like(f"%{searchText}%")).all()
    return query.all()

  def resolve_user(root, info, id):
    query = User.get_query(info)
    return query.filter(UserModel.id == id).first()

schema = Schema(query=Query)
