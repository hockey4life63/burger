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
    let queryString = "INSERT INTO "+ table;
    queryString+= " ("+cols.toString()+") "
    queryString+= "VALUES ("+ makeQuestionMarks(values.length)+ ")";

    console.log(queryString);
    connection.query(queryString, values, (err, data)=>{
      if(err)throw err;

      callback(data);
    })
  },
  update: (table, colValsObj, condition, callback)=>{
    let queryString= "UPDATE "+ table + " SET ";
    queryString+= objToSql(colValsObj);
    queryString+= " WHERE "+ condition;
    console.log(queryString);
    connection.query(queryString, (err, data)=>{
      if(err)throw err;
      callback(data);
    })
  },
  remove: (table, condition, callback)=>{
    let queryString ="DELETE FROM "+ table;
    queryString += " WHERE "+condition;
    connection.query(queryString, (err, data)=>{
      if(err)throw err;
      callback(data);
    })
  }

}

module.exports = orm;

