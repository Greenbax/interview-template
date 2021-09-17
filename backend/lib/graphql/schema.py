import graphene
from graphene import ObjectType, String, Schema
from graphene_sqlalchemy import SQLAlchemyObjectType
from models.user_model import UserModel

class User(SQLAlchemyObjectType):
  class Meta:
    model = UserModel

class Query(ObjectType):
  users = graphene.List(User)
  user = graphene.Field(User, id=graphene.Int())

  def resolve_users(root, info):
    query = User.get_query(info)  # SQLAlchemy query
    return query.all()

  def resolve_user(root, info, id):
    query = User.get_query(info)
    return query.filter(UserModel.id == id).first()

class EditUser(graphene.Mutation):
  class Arguments:
    id = graphene.Int()
    name = graphene.String()

  success = graphene.Boolean()

  def mutate(root, info, id, name):
    query = User.get_query(info)
    query.filter(UserModel.id == id).update({"first_name": name})
    return EditUser(success=True)

class Mutation(ObjectType):
  edit_user = EditUser.Field()

schema = Schema(query=Query, mutation=Mutation)
