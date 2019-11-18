const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const moment = require("moment-timezone");

const db = mysql.createConnection({
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  host: "localhost",
  user: "root",
  password: "",
  database: "n_66"
}); 

router.get("/trips/page", (req, res) => {
  const sql = "SELECT * FROM `trip_list`";
  db.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
}); 

//細節
router.get("/trips/:id", (req, res, next) => {
  let id = req.params.id;

  const sql = `SELECT * FROM trip_list WHERE sid=${id}`;
  db.query(sql, (err, results, fields) => {
    if (err) throw err;
    //  console.log(results)
    res.send(JSON.stringify(results));
  });
});
//搜尋
router.post("/trips/search", (req, res, next) => {
  // console.log(req.body.data2)
  let data2 = req.body.data2;

  const sql = `SELECT * FROM trip_list WHERE trip_name LIKE '%${data2}%'`;
  db.query(sql, (err, results, fields) => {
    if (err) throw err;
    console.log(results);
    res.send(JSON.stringify(results));
  });
});
  
// 依照國家搜尋所要資料 
router.post('/trips/place',(req,res,next)=>{
		let place = req.body.carouselPlace
		console.log(place)

	const sql="SELECT * FROM `trip_list` WHERE `trip_place` = " + `'${place}'`
	console.log(sql);
	db.query(sql,(err,results,fields)=>{
		 if(err) throw err;
		//  console.log(results)
		 res.send(JSON.stringify(results))
	})
});

//leftMenu select
router.post("/trips/select", (req, res, next) => {
  // console.log(req.body.buttonTitleName1)
  let place = req.body.buttonTitleName1;
  let type = req.body.buttonTitleName2;
  let month = req.body.buttonTitleName3;
  let eazy = req.body.buttonTitleName4;
  let days = req.body.buttonTitleName5;
  let price = req.body.buttonTitleName6;
  let priceSort = req.body.priceSort;
  let sortName = req.body.sortName;

  console.log(sortName)
  let where1 = "";
  let where2 = "";
  let where3 = "";
  let where4 = "";
  let where5 = "";
  let where6 = "";
  let order = ""; 
  
  if (place) {
    where1 += " AND `trip_place` = " + `'${place}'`;
    	if(place == "所有目的地"){
    		where1 = ''
    } 
  }
  if (type) {
	 where2 += " AND `trip_type` =  " + `'${type}'`;
	 if(type == "所有類型"){
		where2 = ''
	} 
  }
  if (month) {
	 where3 += " AND `trip_month` = " + `'${month}'`;
	 if(month == "所有月份"){
		where3 = ''
	} 
  }
  if (eazy) {
	 where4 += " AND `trip_difficulty` = " + `'${eazy}'`;
	 if(eazy == "所有難度"){
		where4 = ''
	} 
  }
  if (days) {
    where5 += " AND `trip_days` BETWEEN " + `${days[0]} AND ${days[1]}`;
  }
  if (price) {
    where6 += " AND `trip_price` BETWEEN " + `${price[0]} AND ${price[1]}`;
  }
  if(priceSort){
	  order += " ORDER BY " + `${sortName} ASC` 
  }else{
	  order += " ORDER BY " + `${sortName} DESC`  
  } 
  

  const sql = `SELECT * FROM trip_list WHERE sid>0 ${where1}${where2}${where3}${where4}${where5}${where6}${order}`;
  console.log(sql);
  db.query(sql, (err, results, fields) => {
    if (err) throw err;
    //  console.log(results)
    res.send(JSON.stringify(results));
  });
});

module.exports = router;
