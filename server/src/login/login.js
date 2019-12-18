const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bluebird = require("bluebird");

const db = mysql.createConnection({
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  host: "localhost",
  user: "root",
  password: "root",
  database: "n_66"
});

bluebird.promisifyAll(db);

// 登入
router.post("/login", (req, res) => {
  const user = { loggedIn: false };
  console.log(req.body);
  let sql = "SELECT * FROM members_list WHERE email=? AND password=?";
  if (req.body.email && req.body.password) {
    db.query(
      sql,
      [req.body.email, req.body.password],
      (error, results, fields) => {
        if (results.length > 0) {
          // 有撈到資料
          user.loggedIn = true;
          user.msg = "登入成功";
          user.u_id = results[0].u_id;
          user.email = results[0].email;
          jwt.sign({ user }, "secretKey", (err, token) => {
            res.json({
              token: token,
              loggedIn: true
            });
          });
        } else {
          user.msg = "不正確的帳號或密碼";
          res.json(user);
          console.log(user);
        }
      }
    );
  } else {
    user.msg = "請輸入電子信箱及密碼";
    res.json(user);
  }
});

// 忘記密碼
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "north.pole.66.official@gmail.com",
    pass: "northpole66"
  }
});

const getPasswordResetURL = (user, token) =>
  `http://localhost:3000/password/reset/${user.u_id}/${token}`;

const resetPasswordTemplate = (user, url) => {
  const from = "north.pole.66.official@gmail.com";
  const to = user.email;
  const subject = "🌻 N°66 密碼重置提醒 🌻";
  const userInfo = user.last_name_zh + user.first_name_zh + user.gender;
  const html = `
  <p>親愛的${userInfo || user.email}，您好</p>
  <p>這裡是66°N, 我們收到您重設密碼的請求</p>
  <p>若您沒有重設密碼，請無須理會此封信件，此封郵件將在1小時內失效</p>
  <p>如您要重設密碼, 請點選下方連結：</p>
  <a href=${url}>${url}</a>
  <p>如果無法點選上方連結, 請複製網址並貼至瀏覽器的網址列。 </p>
  <p>若有任何問題，請盡快與我們客服聯絡，謝謝。</p>
  `;
  return { from, to, subject, html };
};

const usePasswordHashToMakeToken = ({
  password: passwordHash,
  u_id: userId
}) => {
  const secret = passwordHash; // secretKey為使用者密碼

  const token = jwt.sign({ userId }, secret, {
    // token為加密後的userId和secretKey(password)組成
    expiresIn: 3600 // 1 hour
  });
  return token;
};

router.post("/password/recover/:email?", async (req, res) => {
  let data = { success: false, msg: { type: "danger", text: "" } };
  const { email } = req.params;
  let sql = "SELECT * FROM members_list WHERE email=?";
  let user;
  // 如果有輸入email
  if (email) {
    await db.query(sql, [email], (error, results, fields) => {
      if (results.length > 0) {
        user = results[0];
        console.log("success");
        const token = usePasswordHashToMakeToken(user);
        console.log("token", token);
        const url = getPasswordResetURL(user, token);
        const emailTemplate = resetPasswordTemplate(user, url);

        const sendEmail = () => {
          transporter.sendMail(emailTemplate, (err, info) => {
            if (err) {
              res.status(500).json("Error sending email");
            }
            console.log(`** Email sent **`, info);
          });
        };
        sendEmail();
        data.success = true;
        res.json(data);
      }
    });
  } else {
    data.msg.text = "請輸入電子信箱";
    res.json(data);
  }
});

// 重設密碼
router.post(
  "/reset_password/receive_new_password/:userId?/:token?",
  (req, res) => {
    let data = { success: false, msg: { type: "danger", text: "" } };
    const { userId, token } = req.params;
    const { password } = req.body;
    if (password) {
      db.queryAsync("SELECT * FROM members_list WHERE u_id=?", userId)
        .then(results => {
          console.log(results);
          u_id = results[0].u_id;
          secret = results[0].password;
          const payload = jwt.decode(token, secret);
          console.log("payload", payload);
          // 如果jwt符合的話
          if (payload.userId === u_id) {
            return db.queryAsync(
              "UPDATE `members_list` SET `password`= ? WHERE u_id = ?",
              [password, u_id]
            );
          }
          data.msg.text = "修改失敗";
          res.json(data);
        })
        .then(results => {
          data.success = true;
          data.msg.text = "修改成功";
          res.json(data);
          // console.log(results);
        });
    } else {
      data.msg.text = "請輸入新密碼";
      res.json(data);
    }
  }
);

// 註冊

router.post("/register", (req, res) => {
  let user = { loggedIn: false, msg: "" };
  // 沒輸入email或password時
  if (!req.body.email || !req.body.password) {
    user.msg = "資料不足";
    res.json(user);
  }

  const sql_r = "SELECT COUNT(*) AS cnt FROM `members_list` WHERE email = ?";
  db.queryAsync(sql_r, [req.body.email])
    .then(results => {
      if (results[0].cnt > 0) {
        // 檢查email是否有重複
        console.log("results", results);
        user.msg = "此電子信箱已被使用";
        res.json(user);
      }
      const sql_i =
        "INSERT INTO `members_list` (`email`, `password`) VALUES (?,?)";
      return db.queryAsync(sql_i, [req.body.email, req.body.password]);
    })
    .then(results => {
      // 註冊成功
      if (results.affectedRows === 1) {
        user.loggedIn = true;
        user.msg = "註冊成功";
        // res.json(user);
        const sql_r_1 = "SELECT * FROM`members_list` WHERE email = ?";
        return db.queryAsync(sql_r_1, [req.body.email]);
      } else {
        user.msg = "註冊失敗";
        res.json(user);
      }
    })
    .then(results => {
      // 註冊成功, 轉成jwt
      if (results.length > 0) {
        user.loggedIn = true;
        user.msg = "登入成功";
        user.u_id = results[0].u_id;
        user.email = results[0].email;
        jwt.sign({ user }, "secretKey", (err, token) => {
          res.json({
            token: token,
            loggedIn: true
          });
        });
      }
    })
    .catch(error => {
      console.log("sql error", error);
    });
});

module.exports = router;
