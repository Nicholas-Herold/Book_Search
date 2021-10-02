import {gql} from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      User {
        _id
        name
      }
    }
  }
`;

export const Save_book = gql`
  mutation saveBook($userId: ID!, $book: String!) {
    saveBook(userId: $userId, book: $book) {
      _id
      name
      books
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($book: String!) {
    removeBook(book: $book) {
      _id
      name
      books
    }
  }
`;