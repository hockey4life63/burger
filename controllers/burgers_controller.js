const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const burger = require("../models/burger");

let router =express.Router();

router.get("/", (req, res)=>{
  burger.all(function (data) {
    let burgerObj ={
      burgers:data
    }
    res.render("index", burgerObj)
  })
})

router.post("/", (req, res)=>{
  let name = req.body.name;
  burger.create(name, function (data) {
    res.redirect("/")
  })
})

router.put("/:id", (req, res)=>{
  let id = {id: +req.params.id};
  burger.devour(id, function () {
    res.redirect("/");
  })
 })

router.delete("/:id", (req, res)=>{
  let id = {id: +req.params.id};
  burger.remove(id, function () {
    res.redirect("/")
  })
})

router.put("/name/:id", (req, res)=>{
  let id =  {id: +req.params.id};
  let colObj = {
    burger_name: req.body.name
  }
  burger.update(colObj, id, function () {
    res.redirect("/")
  })
})

module.exports = router;