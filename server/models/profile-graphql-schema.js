const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLList } = require('graphql');

const ProfileType = new GraphQLObjectType({
    name: 'profile',
    fields: {
        living_factors: {type: [GraphQLInt]}
    }
});

const ProfileRootQuery = new GraphQLObjectType({
    name: 'ProfileRootQuery',
    fields: {
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve(parent, args) {
                // get data 
                return [];
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: ProfileRootQuery
});
