const express = require('express');
let students=[];

app = express();
app.use(express.urlencoded({'extended':false}));
app.use(express.json());

app.use(express.static("public"))

app.get("/",(req,res)=>{
	res.render("index.html")
});

app.get("/send",(req,res)=>{
	let name = req.query.name;
	console.log(name);
	if (name){
		students.push(name);
		console.log(students)
	}
	res.send("New Student Added")
});

app.get("/studentlist",(req,res)=>{
	res.send(students);	
});

app.get("/messages",function(res,res){
	res.render("index.html")
});



app.listen("3000",()=>{
	console.log("running at port 3000");
});