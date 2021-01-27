import graphene
from graphene import ObjectType, String, Schema
from graphene_sqlalchemy import SQLAlchemyObjectType
from models.user_model import UserModel

class TestMutation(graphene.Mutation):
  class Arguments:
    test_arg = String()

  result = String()

  def mutate(root, info, **kwargs):
    # Do some mutation
    return TestMutation(
      result="Test response"
    )

class Mutations(graphene.ObjectType):
  test_mutation = TestMutation.Field()

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

schema = Schema(query=Query, mutation=Mutations)
