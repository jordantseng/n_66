const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const moment = require("moment-timezone");
const socketio = require('socket.io');
const http = require('http');

const db = mysql.createConnection({
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  host: "localhost",
  user: "root",
  password: "root",
  database: "n_66"
}); 
const app = express();
const server = http.createServer(app);
const io = socketio(server);

router.get('/join',(req,res)=>{
	res.send('server is up and running')
})
io.on('connection',(socket)=>{
	console.log("we have a new connection!")
	socket.on('disconnect',()=>{
		console.log('uer had left!!')
	})
})




module.exports = router;