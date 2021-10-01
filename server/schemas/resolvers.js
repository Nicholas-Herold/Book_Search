const {AuthenticationError} = require ('apollo-server-express');
const {bookSchema , User} = require('../models');
const {signToken} = require ('../utils/auth')

const resolvers = {

    Query: {
        me : async (parent,args,context)=> {
            if(context.user) {
            return User.findOne({_id: context.user._id })
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    },

    Mutation:{
        login: async (parent, {email,password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('no user')
            }

        },
    }


}

module.exports = resolvers;