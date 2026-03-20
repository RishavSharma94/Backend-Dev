// const file = require("fs");
// const path = require("path");

// const http = require("http");

// http.createServer(function (req, res) {
    
// })


const math = require('./math');

console.log(math.add(1, 4), math.remove(4, 1));


const { log } = require("console")
const fs = require("fs")
fs.writeFileSync('./test.txt',"This is Sync file content")
const file = fs.readFileSync("test.txt","utf-8")
console.log(file);

const asyncFile = fs.readFile("test.txt","utf-8",(err,data)=>{
    if(err){
        console.log("Error in file reading",err);
    }
    else{
        console.log("File reading successfull",data);
    }
})