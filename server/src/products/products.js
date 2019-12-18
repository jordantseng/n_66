const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const moment = require("moment");
const bluebird = require("bluebird");

const db = mysql.createConnection({
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  host: "localhost",
  user: "root",
  password: "root",
  database: "n_66"
});

bluebird.promisifyAll(db);

router.get("/products", (req, res) => {
  const sql = "SELECT * FROM `product_list`";

  db.query(sql, (error, results, fields) => {
    if (error) throw error;
    // console.log(results);
    res.json(results);
  });
  // res.send('aaaa')
});

router.get("/products/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM product_list WHERE product_id=${id}`;
  let output = {}
  db.queryAsync(sql)
  .then(results =>{
    // if (error) throw error;
    // console.log(results);
    output.results = results;
    let relatedProduct = results[0];
    // console.log( relatedProduct.product_category)
    sql = `SELECT * FROM product_list WHERE product_category = '${relatedProduct.product_category}' AND product_id != ${relatedProduct.product_id}`;
    // console.log(sql)
    return db.queryAsync(sql);
  })
  .then(results => {
    console.log(results)
    output.relatedProducts = results
    res.json(output);  
  })
});

router.post("/products/add_wishlist", (req, res) => {
  let data = { success: false, msg: { text: "" } };
  const sql =
    "INSERT INTO wish_list ( u_id, product_label, product_name, product_info, product_img, trip_start_date,trip_end_date, trip_angency, product_price, product_router, product_id, liked) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [
      req.body.u_id,
      req.body.product_label,
      req.body.product_name,
      req.body.product_info,
      req.body.product_img,
      req.body.trip_start_date,
      req.body.trip_end_date,
      req.body.trip_angency,
      req.body.product_price,
      req.body.product_router,
      req.body.product_id,
      req.body.liked
    ],
    (error, results, fields) => {
      if (error) throw error;
      if (results.affectedRows === 1) {
        data.success = true;
        data.msg.text = "已加入我的收藏";
      } else {
        data.msg.text = "沒有加入我的收藏";
      }
      res.json(data);
    }
  );
});

//我的購物車
router.get("/cart", (req, res) => {
  // console.log(req.body)
  res.json(req.body);
});

// 購物車頁面搜尋使用者資訊
router.post("/cart", (req, res) => {
  let userId = req.body.userId;
  let output = {userInformation : true}
  let sql = `SELECT * FROM members_list WHERE u_id = ${userId}`
  // console.log(userId)
  db.queryAsync(sql)
    .then(results =>{
      // console.log(results)
      let userInfoArray = [results[0].address, results[0].first_name_zh, results[0].last_name_zh]

      userInfoArray.forEach(userInfo=>{
        if(!userInfo){
          output.userInformation = false
        }
      })
      console.log(output);
      res.json(output);
    })
});

//結帳頁面 搜尋使用者是否有折價卷
router.post("/checkout/findCoupon", (req, res) => {
  let user = req.body;
  console.log(user.userId);

    // 預計到貨日期
    let arrivalDate = moment(new Date(), "YYYY/MM/DD").add(3, "day");
    let arrivalDateStr = JSON.stringify(arrivalDate)
      .split("T")[0]
      .split('"')[1]
      .split("-")
      .join("/");

  let sql = `SELECT * FROM coupon_list WHERE u_id = ${user.userId}`;
  let couponList = {};

  db.queryAsync(sql)
    .then(results => {
      // console.log(results.length)
      if (results.length == 0) {
        couponList.answer = ["沒有折價卷"]
      }
      else {
        couponList.answer = results;
      }
      // 搜尋使用者的資訊
      sql = `SELECT * FROM members_list WHERE u_id = ${user.userId}`;
      return db.queryAsync(sql);
    })
    .then(results => {
      couponList.userInfo = results;
      couponList.arrivalDateStr = arrivalDateStr;
      console.log(couponList);
      res.json(couponList);


    })

})


//結帳
router.post("/checkout", (req, res) => {
  let data = req.body;
  // console.log(data);
  let couponList = data.couponList;
  let useCouponName = data.useCouponName;
  // console.log(useCouponName)
  let productsToBuy = JSON.parse(data.productsToBuy);
  // console.log(productsToBuy.length);
  let tripsToBuy = JSON.parse(data.tripsToBuy)

  // 下單日期
  let createAt = moment(new Date(), "YYYY/MM/DD");
  let createAtStr = JSON.stringify(createAt)
    .split("T")[0]
    .split('"')[1] 
    .split("-")
    .join("/");
  // 預計到貨日期
  let arrivalDate = moment(new Date(), "YYYY/MM/DD").add(3, "day");
  let arrivalDateStr = JSON.stringify(arrivalDate)
    .split("T")[0]
    .split('"')[1]
    .split("-")
    .join("/");

  let newId = 0;
  let output = { 
      success: false
    };


  let sql = `INSERT INTO order_list( u_id, order_trip, order_product, order_status, order_total_price, create_at, arrival_date) 
  VALUES ( '${data.userId}', '${data.tripsToBuy}', '${data.productsToBuy}', '${data.orderStatus}', '${data.totalCost}', '${createAtStr}', '${arrivalDateStr}')`;

  if (data.tripsToBuy === "[]" && data.productsToBuy === "[]") {
    output.text = "購物車尚無任何商品";
    return res.json(output);
  }
  else if (tripsToBuy.length === 0 && useCouponName === '原價購買') {
    console.log('只買商品不使用折價卷')
    db.queryAsync(sql)
      .then(results => {

        sql = `SELECT * FROM order_list ORDER BY order_id DESC LIMIT 0 , 1`;
        return db.queryAsync(sql);
      })
      .then(results => {
        
        // 新id
        newId = results[0].order_id;
        let productsArray = JSON.parse(data.productsToBuy);
        
        if (productsArray !== []) {
          productsArray.forEach(item => {
            item.id = newId;
          });
        }

        let tripsArray = JSON.parse(data.tripsToBuy);
        if (tripsArray !== []) {
          tripsArray.forEach(trip => {
            trip.id = newId;
          });
        }

        data.productsToBuy = JSON.stringify(productsArray);
        data.tripsToBuy = JSON.stringify(tripsArray);

        sql = ` UPDATE order_list SET order_trip = '${data.tripsToBuy}', order_product = '${data.productsToBuy}' WHERE order_id = '${newId}'`
        return db.queryAsync(sql);
      })
      .then(results => {
        output.success = true
        output.text = "只買商品不使用折價卷";
        output.rows = data;
        res.json(output);
      })
  }
  else if (tripsToBuy.length === 0 && useCouponName !== '原價購買') {
    console.log('只買商品並使用折價卷')
    db.queryAsync(sql)
      .then(results => {

        sql = `SELECT * FROM order_list ORDER BY order_id DESC LIMIT 0 , 1`;
        return db.queryAsync(sql);
      })
      .then(results => {
        // console.log(results);
        // 新id
        newId = results[0].order_id;

        let productsArray = JSON.parse(data.productsToBuy);

        if (productsArray !== []) {
          productsArray.forEach(item => {
            item.id = newId;
          });
        }

        let tripsArray = JSON.parse(data.tripsToBuy);
        if (tripsArray !== []) {
          tripsArray.forEach(trip => {
            trip.id = newId;
          });
        }

        data.productsToBuy = JSON.stringify(productsArray);
        data.tripsToBuy = JSON.stringify(tripsArray);

        sql = ` UPDATE order_list SET order_trip = '${data.tripsToBuy}', order_product = '${data.productsToBuy}' WHERE order_id = '${newId}'`
        return db.queryAsync(sql);
      })
      .then(results => {
        let sql = `SELECT * FROM coupon_list WHERE u_id = ${data.userId} AND type = '${useCouponName}' LIMIT 0 , 1 `
        return db.queryAsync(sql)
      })
      .then(results => {
        let couponUsed = results[0];
        let sql = `DELETE FROM coupon_list WHERE c_id = ${couponUsed.c_id}`
        return db.queryAsync(sql)
      })
      .then(results => {
        output.success = true
        output.text = "只買商品並使用折價卷";
        output.rows = data;
        res.json(output);
      })
  }
  else if (productsToBuy.length === 0) {
    console.log('只買行程')
    db.queryAsync(sql)
      .then(results => {

        sql = `SELECT * FROM order_list ORDER BY order_id DESC LIMIT 0 , 1`;
        return db.queryAsync(sql);
      })
      .then(results => {
        // console.log(results);
        // 新id
        newId = results[0].order_id;

        let productsArray = JSON.parse(data.productsToBuy);

        if (productsArray !== []) {
          productsArray.forEach(item => {
            item.id = newId;
          });
        }

        let tripsArray = JSON.parse(data.tripsToBuy);
        if (tripsArray !== []) {
          tripsArray.forEach(trip => {
            trip.id = newId;
          });
        }

        data.productsToBuy = JSON.stringify(productsArray);
        data.tripsToBuy = JSON.stringify(tripsArray);

        sql = ` UPDATE order_list SET order_trip = '${data.tripsToBuy}', order_product = '${data.productsToBuy}' WHERE order_id = '${newId}'`
        return db.queryAsync(sql);
      })
      .then(results => {
        // output.text = "購買成功沒有折價卷"; 

        let couponList = data.couponList;
        console.log(couponList);
        let validDate = moment(new Date(), 'YYYY/MM/DD').add(3, 'month');
        let validDateStr = JSON.stringify(validDate).split('T')[0].split('"')[1].split("-").join("/");

        couponList.forEach(coupon => {
          let sql = `INSERT INTO coupon_list(u_id, type, discount, valid_date) VALUES ('${coupon.u_id}','${coupon.type}','${coupon.discount}','${validDateStr}')`;
          db.queryAsync(sql)
        })
      })
      .then(results => {
        output.success = true
        output.text = "只買行程";
        output.rows = data;
        res.json(output);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  else if (productsToBuy && tripsToBuy) {
    db.queryAsync(sql)
      .then(results => {

        sql = `SELECT * FROM order_list ORDER BY order_id DESC LIMIT 0 , 1`;
        return db.queryAsync(sql);
      })
      .then(results => {
        // console.log(results);
        // 新id
        newId = results[0].order_id;

        let productsArray = JSON.parse(data.productsToBuy);

        if (productsArray !== []) {
          productsArray.forEach(item => {
            item.id = newId;
          });
        }

        let tripsArray = JSON.parse(data.tripsToBuy);
        if (tripsArray !== []) {
          tripsArray.forEach(trip => {
            trip.id = newId;
          });
        }

        data.productsToBuy = JSON.stringify(productsArray);
        data.tripsToBuy = JSON.stringify(tripsArray);

        sql = ` UPDATE order_list SET order_trip = '${data.tripsToBuy}', order_product = '${data.productsToBuy}' WHERE order_id = '${newId}'`
        return db.queryAsync(sql);
      })
      .then(results => {
        let couponList = data.couponList;
        let validDate = moment(new Date(), 'YYYY/MM/DD').add(3, 'month');
        let validDateStr = JSON.stringify(validDate).split('T')[0].split('"')[1].split("-").join("/");

        couponList.forEach(coupon => {
          let sql = `INSERT INTO coupon_list(u_id, type, discount, valid_date) VALUES ('${coupon.u_id}','${coupon.type}','${coupon.discount}','${validDateStr}')`;
          db.queryAsync(sql)
        })
      })
      .then(results => {
        if (useCouponName !== '原價購買') {
          let sql = `SELECT * FROM coupon_list WHERE u_id = ${data.userId} AND type = '${useCouponName}' LIMIT 0 , 1 `
          return db.queryAsync(sql)
        }
      })
      .then(results => {
        if (useCouponName !== '原價購買') {
          let couponUsed = results[0];
          let sql = `DELETE FROM coupon_list WHERE c_id = ${couponUsed.c_id}`
          return db.queryAsync(sql)
        }
      })
      .then(results => {
        output.success = true;
        output.text = "購買成功";
        output.rows = data;
        console.log(output);
        res.json(output);
      })
      .catch((error) => {
        console.log(error)
      })
  }
});

module.exports = router;

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

router.post("/products/select", (req, res, next) => {
	// console.log(req.body.buttonTitleName1)
	let type = req.body.buttonTitleName1;
	let brand = req.body.buttonTitleName2;
	let price = req.body.buttonTitleName6;
	let search = req.body.buttonTitleName3;
	// console.log(search)

	let where1 = "";
	let where2 = "";
	let where3 = "";
	let where6 = "";
	
	
	if (type) {
	  where1 += " AND `product_category` =  " + `'${type}'`;
	  if (type == "所有活動") {
		 where1 = "";
	  }
	}
	if (brand) {
	  where2 += " AND `product_brand` =  " + `'${brand}'`;
	  if (brand == "所有品牌") {
		 where2 = "";
	  } 
	}
	if (price) {
	  where6 += " AND `product_price` BETWEEN " + `${price[0]} AND ${price[1]}`;
	} 
	search? where3 += " AND `product_name` LIKE " + `'%${search}%'` :''
 
	const sql = `SELECT * FROM product_list WHERE product_id>0 ${where1}${where2}${where3}${where6}`;
	console.log(sql);
	db.query(sql, (err, results, fields) => {
	  if (err) throw err;
	  //  console.log(results)
	  res.send(JSON.stringify(results));
	});
 });
 
