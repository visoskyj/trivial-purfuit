const express = require('express');
const categoryToColorRoutes = express.Router();
let CategoryToColor = require('../models/categorymapping.model');


categoryToColorRoutes.route('/').get(function(req, res) {
    CategoryToColor.find(function(err, categoryToColorMappings) {
        if (err) {
            console.log(err);
        } else {
            res.json(categoryToColorMappings);
        }
    });
});

categoryToColorRoutes.route('/update/:id').post(function(req, res) {
    CategoryToColor.findById(req.params.id, function(err, categoryToColorMapping) {
        if (!categoryToColorMapping)
            res.status(404).send("data is not found");
        else
            categoryToColorMapping.color = req.body.color;
            categoryToColorMapping.category = req.body.category;
            categoryToColorMapping.save().then(categoryToColorMapping => {
                res.json('Category To Color Mapping updated!');
            }).catch(err => {
                res.status(400).send('Update not possible with error ' + err.toString());
            });
    });
});

categoryToColorRoutes.route('/add').post(function(req, res) {
    let categoryToColor = new CategoryToColor(req.body);
    categoryToColor.save()
        .then(categoryToColorMapping => {
            res.status(200).json({'categoryToColorMapping': 'Category To Color Mapping added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new categoryToColorMapping failed with error ' + err.toString());
        });
});

module.exports = categoryToColorRoutes;