const fs = require('fs');
// making folder
// fs.mkdir('asyncdirectory', (err) => {
//     if(err){
//         return console.error('Enter creating directory:',err);

//     }
//     console.log('Directory created successfully');
// });
// fs.mkdirSync('syncdirectory');
// console.log('Another directory created successfully');


// // removing folder
// fs.rmdir('asyncdirectory', (err) => {
//     if(err){
//         return console.error('Enter creating directory:',err);

//     }
//     console.log('Directory removed successfully');
// });
// fs.rmdirSync('syncdirectory');
// console.log('Another directory removed successfully');


// Reading content of folder
// reading folder
// fs.readdir('.', (err, files) => {
//     if (err) {
//         return console.error('Error reading directory:', err);
//     }
//     console.log('Files in directory:', files);
// });

// fs.readdirSync('.');
// console.log('Files in directory (sync):', fs.readdirSync('.'));


fs.rm("newDirectory",{recursive:true,force:true},(err)=>{
    if(err){
        return console.error('Error removing directory:', err);
    }
    console.log('Directory removed successfully');
});
fs.rmSync("anotherDirectory",{recursive:true,force:true});
console.log('Another directory removed successfully');