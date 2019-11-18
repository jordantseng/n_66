const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const moment = require("moment-timezone");
const bluebird = require('bluebird');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "n_66"
});

router.get("/products", (req, res) => {
  const sql = "SELECT * FROM `product_list`";

  db.query(sql, (error, results, fields) => {
    if (error) throw error; 
    console.log(results); 
    res.json(results);
  });  
  // res.send('aaaa')
})

router.get("/products/:id", (req, res) => {
  let id = req.params.id;
  const sql = `SELECT * FROM product_list WHERE product_id=${id}`;

  db.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    res.json( results);
  });
  
});
   


//搜尋
// router.post('/products/search',(req,res,next)=>{
// 	let data2 = JSON.parse(req.body.data2)  
	
// 	const sql=`SELECT * FROM trip_list WHERE trip_name LIKE %${data2}%`
// 	db.query(sql,(err,results,fields)=>{
// 		 if(err) throw err; 
// 		//  console.log(results) 
// 		 res.send(JSON.stringify(results))
// 	}) 
// });
  
//依照價格排列
// router.post('/products/productsSort',(req,res,next)=>{
	
// 	const sql=`SELECT * FROM trip_list ORDER BY trip_price DESC`
// 	db.query(sql,(err,results,fields)=>{
// 		 if(err) throw err; 
// 		//  console.log(results) 
// 		 res.send(JSON.stringify(results))
// 	}) 
// });
      
module.exports = router;
