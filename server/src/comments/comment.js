const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bluebird = require("bluebird"); 
const db = mysql.createConnection({
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  host: "localhost",
  user: "root",  
  password: "root",
  database: "n_66" 
});

bluebird.promisifyAll(db);

router.get("/comments", (req, res) => {
  // console.log("req.params", req.params);
  const sql = "SELECT * FROM `comments_list` ORDER BY `c_id` DESC";
  db.query(sql, (error, results, fields) => {
    if (error) throw error;
    // console.log(results);
    res.send(JSON.stringify(results));
  });
});

// 篩選

router.post("/comments/select", (req, res, next) => {
  let place = req.body.place;
  console.log(place);
  let where1 = "";
  if (place) {
    where1 += " AND `trip_country` = " + `'${place}'`;
    if (place == "所有目的地") {
      where1 = "";
    }
  }
  const sql = `SELECT * FROM comments_list WHERE c_id>0 ${where1} ORDER BY c_id DESC`;

  db.query(sql, (err, results, fields) => {
    if (err) throw err;
    //  console.log(results)
    res.send(JSON.stringify(results));
  });
});

// liked btn

router.put("/comments/liked/:c_id?", (req, res, next) => {
  let likedAmount;
  db.queryAsync(
    `SELECT likedAmount FROM comments_list WHERE c_id = ${req.params.c_id}`
  )
    .then(results => {
      likedAmount = JSON.parse(results[0].likedAmount);
      console.log(likedAmount);
      const userExist = likedAmount.includes(req.body.u_id);
      // 如果已經點過讚
      if (userExist) {
        const removedLiked = likedAmount.filter(
          userId => userId !== req.body.u_id
        );

        console.log(removedLiked);
        return db.queryAsync(
          `UPDATE comments_list SET likedAmount = ? WHERE c_id = ${req.params.c_id}`,
          [JSON.stringify(removedLiked)]
        );
      } else {
        // 不同用戶點讚
        likedAmount.push(req.body.u_id);
        let likedAmountJson = JSON.stringify(likedAmount);
        return db.queryAsync(
          `UPDATE comments_list SET likedAmount = ? WHERE c_id = ${req.params.c_id}`,
          [likedAmountJson]
        );
      }
    })
    .then(results => {
      res.json(likedAmount);
    });
});

//

router.get("/comments/likedAmount/:c_id?", (req, res) => {
  const sql = `SELECT likedAmount FROM comments_list WHERE c_id = ${req.params.c_id}`;
  db.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.json(results[0].likedAmount);
  });
});

module.exports = router;
