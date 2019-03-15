const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const graphqlHTTP = require('express-graphql');
const profileGraphQLSchema = require('../models/profile-graphql-schema');
const mongoUrl = 'mongodb://localhost:27017/community';
const Profile = require('mongoose').model('Profile');

const router = new express.Router();

router.post('/save-profile', (req, res, next) => {

    Profile.find({uid:req.user._id}, (err, docs) => {
        if (docs.length){

            Profile.update({uid:req.user._id}, {
                $set: {
                    uid: req.user._id,
                    living_factors: req.body.data.living_factors
                }
           }, {upsert: true, strict: false}, (err) => {
                if (err) console.log(err);
                console.log('Profile saved');
           });

        } else {
            
            var profile = new Profile({
                uid: req.user._id,
                living_factors: req.body.data.living_factors
            });
            profile.save((err, book) => {
                if (err) return console.error(err);
                console.log(book.name + " saved to bookstore collection.");
            });

        }
    });

});

router.get('/get-profile', async (req, res, next) => {
    const profile = await Profile.findOne({uid:req.user._id});
    res.status(200).json(profile);
});

router.use('/profiles', graphqlHTTP({
    profileGraphQLSchema,
    graphiql: true
}));

module.exports = router;
