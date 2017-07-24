let connection = require("./connections");

/*
"SELECT * FROM table"
"INSERT INTO table (col) VALUES (val)"
"UPDATE table SET col=val WHERE col=condition"
"DELETE FROM table WHERE col=condition"
*/
let makeQuestionMarks = (val)=>{
  let arr =[];
  for(let i =0; i<val;i++){
    arr.push("?");
  }
  return arr.toString();
}

let objToSql = (obj)=>{
  let arr =[];
  for(let key in obj){
    arr.push(key + " = '"+ obj[key]+"'");
  }
  return arr.toString();
}

let orm ={
  all: (table, callback)=>{
    let queryString = "SELECT * FROM ??";
    connection.query(queryString, [table], (err,data)=>{
      if(err)throw err;
      callback(data);
    })
  },
  create: (table, cols, values, callback)=>{
    let queryString = "INSERT INTO ??(??) VALUES ";
    queryString += "("+makeQuestionMarks(values.length)+")";
    console.log(queryString)
    connection.query(queryString,[table,cols,...values],(err, data)=>{
      if(err)throw err;
      callback(data);
    })
  },
  
  update: (table, colValsObj, condition, callback)=>{
    let queryString= "UPDATE ?? SET ? WHERE ?";
    console.log(queryString);
    connection.query(queryString,[table,colValsObj,condition], (err, data)=>{
      if(err)throw err;
      callback(data);
    })
  },
  remove: (table, condition, callback)=>{
    let queryString ="DELETE FROM ?? WHERE ?"
    connection.query(queryString,[table,condition], (err, data)=>{
      if(err)throw err;
      callback(data);
    })
  }

}

module.exports = orm;
//orm.createTwo("burgers", ["burger_name"],["createTwo burger"], console.log);
//orm.updateTwo("burgers",{burger_name: "updateTest Burger"},{id:7},console.log);

