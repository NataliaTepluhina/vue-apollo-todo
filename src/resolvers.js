import gql from 'graphql-tag';
import shortid from 'shortid';
import { todoItemsQuery } from './graphql/queries';

export const typeDefs = gql`
  extend type Item {
    id: ID!
    text: String!
    done: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    checkItem: (_, { id }, { cache }) => {
      const data = cache.readQuery({ query: todoItemsQuery });
      const currentItem = data.todoItems.find(item => item.id === id);
      currentItem.done = !currentItem.done;
      cache.writeQuery({ query: todoItemsQuery, data });
    },

    addItem: (_, { text }, { cache }) => {
      const data = cache.readQuery({ query: todoItemsQuery });
      data.todoItems.push({
        __typename: 'Item',
        id: shortid.generate(),
        text,
        done: false,
      });
      cache.writeQuery({ query: todoItemsQuery, data });
    },

    deleteItem: (_, { id }, { cache }) => {
      const data = cache.readQuery({ query: todoItemsQuery });
      const currentItem = data.todoItems.find(item => item.id === id);
      data.todoItems.splice(data.todoItems.indexOf(currentItem), 1);
      cache.writeQuery({ query: todoItemsQuery, data });
    },
  },
};
