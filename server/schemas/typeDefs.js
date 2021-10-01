const { gql } = require ('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
  bookId: ID!
  authors: [String]
  description: String
  title: String
  image: String
  link: String
}

type Auth {
    token: ID!
    user: User
  }

input savedBook {
  description: String
  title: String
  bookId:String
  image: String
  link: String
  authors: [String]

}


type Query{
  me: User
}

type Mutation {
  addUser(name:String!,email:String!,password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(savedBook: savedBook!):User
  removeBook(savedBooks: String):User
}
`;

module.exports = typeDefs