const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/community';
const Profile = require('mongoose').model('Profile');

const router = new express.Router();

router.post('/save-profile', (req, res, next) => {

    Profile.findOneAndUpdate({uid:req.user._id}, {
        
            uid: req.user._id,
            living_factors: req.body.data.living_factors
        
    }, {upsert:true}, function(err, doc){
        console.log(err, doc);
        if (err) console.log(err);
        console.log('Profile saved');
        return res.send("succesfully saved");
    });

});

module.exports = router;
