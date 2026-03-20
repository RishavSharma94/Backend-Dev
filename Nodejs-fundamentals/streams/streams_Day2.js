// const fs = require("fs");
// const path = require("path");

// const inputFilePath= path.join(__dirname,"input.txt");
// const outputFilePath= path.join(__dirname,"output.txt");

// const readStream = fs.createReadStream(inputFilePath, {encoding:"utf-8"});
// const writeStream = fs.createWriteStream(outputFilePath);
// readStream.pipe(writeStream);

// writeStream.on("finish",()=>{
//     console.log("write stream is end");
// });



//   Transform output
const fs = require("fs");
const path = require("path");
const { Transform } = require("stream"); // ✅ missing import

const inputFilePath = path.join(__dirname, "input.txt");
const transformOutputFilePath = path.join(__dirname, "transformOutput.txt");

const readStream = fs.createReadStream(inputFilePath, { encoding: "utf-8" });
const writeStream = fs.createWriteStream(transformOutputFilePath);

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        const transformedData = chunk.toString().toUpperCase();
        this.push(transformedData);
        callback();
    }
});
