const express = require('express');
const nameRoutes = express.Router();
const mongoose = require('mongoose');
const notes = require('../models/notes');

nameRoutes.get('/:name', (req, res, next) => {
    const name = req.params.name.toUpperCase();
    // const response = {};
    notes.find()
        .select('-__v')
        .exec()
        .then(docs => {
            /*const response = {
                 notes: docs.map(doc => {
                     var title= doc.Title.toUpperCase();
                    if(title.search(name)>-1){
                     return {
                         thisNote:true,
                         _id: doc._id,
                         Title: doc.Title,
                         Body: doc.Body,
                         Preference: doc.Preference,
                         Created: doc.Created,
                         Updated: doc.Updated
                     }}
                    // else
                    // return {}
                 }
                 )
             }*/
            const result = [];
            docs.map(doc => {
                var title = doc.Title.toUpperCase();
                if (title.search(name) > -1) {
                    result.push(
                        {
                            _id: doc._id,
                            Title: doc.Title,
                            Body: doc.Body,
                            Preference: doc.Preference,
                            Created: doc.Created,
                            Updated: doc.Updated
                        }
                    )
                }
            })
            res.status(200).json(result);
        })
        .catch(err => {
            error: err
        })
});

nameRoutes.delete('/:name', (req, res, next) => {
    var name = req.params.name.toUpperCase();
    //var title= doc.Title.toUpperCase();
    notes.find()
        .exec()
        .then(docs => {
            /*const response = {
                message: "The following notes have been deleted",
                notes: docs.map(doc => {
                    var title = doc.Title.toUpperCase();
                    if (title.search(name) > -1) {
                        return {
                            _id: doc._id,
                            Title: doc.Title,
                            Body: doc.Body,
                            Preference: doc.Preference,
                            Created: doc.Created,
                            Updated: doc.Updated
                        }
                    }
                })
            }*/
            docs.map(doc => {
                var name = req.params.name;
                var title = doc.Title.toUpperCase();
                if (title.search(name) > -1) {
                    notes.remove({ _id: doc._id })
                        .exec()
                        .then(result => {
                            var output={};
                            if (result.n == 0) output = "No entries have been deleted because the entered element does not match any note in the database";
                            if (result.n > 0) output = result.n + " entry(entries) have been deleted";
                            res.status(200).json({
                                message: output
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json(err)
                        })
                } else {
                    res.status(400).json({ message: "The entered Title does not correspond to any note in the database" });
                }
                //res.json(response);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: "The name entered does not correspond to any note in the database."
            })
        })
});

module.exports = nameRoutes;
