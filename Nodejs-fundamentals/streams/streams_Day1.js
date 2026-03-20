const fs = require("fs");
const path = require("path");

const inputFilePath= path.join(__dirname,"input.txt");
const outputFilePath= path.join(__dirname,"output.txt");

const inputStream = fs.createReadStream(inputFilePath);

inputStream.on("data",(chunk)=>{
    console.log("Data is reading in chunks:",chunk)
});

// inputStream.pip(outputStream);