const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const { PubSub, withFilter } = require('graphql-subscriptions');
const Profile = require('mongoose').model('Profile');

const ProfileType = new GraphQLObjectType({
    name: 'profile',
    fields: {
        uid: {
            type: GraphQLID
        },
        living_factors: {
            type: GraphQLList(GraphQLInt)
        }
    }
});

const ProfileRootQuery = new GraphQLObjectType({
    name: 'ProfileRootQuery',
    fields: {
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve: async (parent, args) => {
                
                // get data 
                const profiles = await Profile.find({});
                return profiles;
            }
        }
    }
});

const pubsub = new PubSub();

const ProfilesSubscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
      newProfile: {
        type: ProfileType,
        resolve() {
          console.log("Subscription IS RUNNING");
        },
        subscribe: () => {
            return pubsub.asyncIterator('NEW_PROFILE');
        }
      }
    }
});

module.exports = new GraphQLSchema({
    query: ProfileRootQuery,
    subscription: ProfilesSubscription
});
