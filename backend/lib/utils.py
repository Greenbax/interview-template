from graphql_relay.node.node import from_global_id


def input_to_dictionary(kwargs):
    dictionary = {}
    for key in kwargs:
        dictionary[key] = kwargs.get(key)
    return dictionary