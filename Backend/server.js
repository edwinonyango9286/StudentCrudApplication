const express = require("express");
const app = express();
app.use(express.json());
const mysql=require("mysql");
const cors = require("cors");
app.use(cors());



   const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

app.get("/",(req,res)=>{
const sql = "SELECT * FROM student ";
db.query(sql,(err,data) =>{
    if(err) return res.json("Error");
    return res.json(data);
});
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (name, email) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];
  
    db.query(sql, values, (err, result) => {
      if (err) return res.json("Error");
      return res.json(result);
    });
  });
  


  app.put('/update/:id', (req, res) => {
    const sql = "update student set `name` =?, `email`=? where `Id`=?";
    const values = [req.body.name, req.body.email];

    const id =req.params.id;
  
    db.query(sql, [...values,id], (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
    });
  });


  app.delete('/student/:id', (req, res) => {
    const sql = " DELETE FROM student where Id =? ";

    const id =req.params.id;
  
    db.query(sql, [id], (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
    });
  });
  
  
app.listen(8081, ()=>{
   console.log("listening");
})