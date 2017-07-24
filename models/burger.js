const orm = require("../config/orm.js");

const burger = {
  all: (callback)=>{
    orm.all("burgers", (result)=>{
      callback(result);
    })
  },
  create: (values, callback)=>{
    orm.create("burgers", ["burger_name"], [values], (result)=>{
      callback(result)
    })
  },
  update: (colObj, condition, callback)=>{
    orm.update("burgers", colObj, condition, (result)=>{
      callback(result);
    })
  },
  remove: (condition, callback)=>{
    orm.remove("burgers", condition, (result)=>{
      callback(result);
    })
  },
  devour: function (condition, callback) {
    orm.update("burgers", {
      devoured: 1
    }, condition, function (data) {
      callback(data);
    })
  }
}

module.exports = burger;

//burger.create(["createTwoModel burger"], console.log);
//burger.update({burger_name:"modelTest Burger"}, {id:7},console.log)
// burger.remove({id:7}, console.log)