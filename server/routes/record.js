const express = require("express");
const { ObjectId } = require("mongodb");
const dbo = require('../db/conn');
const recordRoutes = express.Router();

// Read Route
// This section will help you get a list of all the documents.
recordRoutes.route("/listings").get(async function (req, res) {
    const dbConnect = dbo.getDb();
    console.log(dbConnect)
    dbConnect
      .collection("products")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
       } else {
          console.log(result)
          res.json(result);
        }
      });
  });

//   Create Route
// This section will help you create a new document.
recordRoutes.route("/listings/create").post(function (req, res) {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        tensanpham: req.body.tensanpham,
        mota: req.body.mota,
        hinhanh: req.body.hinhanh,
        giagoc: req.body.giagoc,
        gia: req.body.gia,
        last_created: new Date(),
    };
  
    dbConnect
      .collection("products")
      .insertOne(matchDocument, function (err, result) {
        if (err) {
          res.status(400).send("Error inserting matches!");
        } else {
          console.log(`Added a new match with id ${result.insertedId}`);
          res.status(204).send();
        }
      });
  });

//   Update Route
// This section will help you update a document by id.
recordRoutes.route("/listings/updateLike").put(function (req, res) {
    const dbConnect = dbo.getDb();
    const listingQuery = { _id: ObjectId(req.body.id)};
    
    const updates = {
      $set : {"update": 1}
    };
  
    dbConnect
      .collection("products")
      .updateOne(listingQuery, updates, function (err, _result) {
        if (err) {
          res.status(400).send(`Error updating likes on listing with id ${listingQuery._id}!`);
        } else {
          console.log("1 document updated");
          res.json({});
        }
      });
  });

//   Delete Route
// This section will help you delete a record.
recordRoutes.route("/listings/delete/:id").delete((req, res) => {
    const dbConnect = dbo.getDb();
    const listingQuery = { _id: ObjectId(req.body.id)};
    console.log(req.body.id )
    dbConnect
      .collection("products")
      .deleteOne(listingQuery, function (err, _result) {
        if (err) {
          res.status(400).send(`Error deleting listing with id ${listingQuery.listing_id}!`);
        } else {
          console.log("1 document deleted");
          res.json({});
        }
      });
  });


module.exports = recordRoutes;