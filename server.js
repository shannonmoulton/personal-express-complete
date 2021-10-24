const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");

var db, collection;

const url =
  "mongodb+srv://appdata:appdata@cluster0.ubxqi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3000, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("bills")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index.ejs", { bills: result });
    });
});

app.post("/bills", (req, res) => {
  console.log("bills endpoint");
  db.collection("bills").insertOne(
    {
      companyBill: req.body.companyBill,
      dateOfBill: req.body.dateOfBill,
      amount: req.body.amount,
      paymentStatus: req.body.paymentStatus,
    },
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});
app.put("/update", (req, res) => {
  console.log(req.body.pay);
  console.log(req.body.id);
  db.collection("bills").findOneAndUpdate(
    { _id: new mongoose.mongo.ObjectID(req.body.id) },
    {
      $set: {
        paymentStatus: "paid",
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});
app.delete("/delete", (req, res) => {
  db.collection("bills").deleteOne(
    { _id: new mongoose.mongo.ObjectID(req.body.id) },
    (err, result) => {
      console.log(req);
      if (err) return res.send(500, err);
      res.send("Bill deleted!");
      console.log(err);
    }
  );
});
