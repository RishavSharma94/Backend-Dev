const fs = require("fs");

fs.copyFileSync("source.txt", "destination.txt");
// source.txt ke content ko destination.txt me copy kar dega
// agar destination.txt pehle se exist karta hai to overwrite kar dega
// agar destination.txt nahi hai to nayi file bana dega

fs.copyFile("source.txt", "destination_async.txt", (err) => {
    if (err) {
        console.log("File copy failed:", err);
    } else {                
        console.log("File copied successfully to async file");
    }   
});
*/
// source.txt ke content ko destination_async.txt me copy kar dega
// agar destination_async.txt pehle se exist karta hai to overwrite kar dega
// agar destination_async.txt nahi hai to nayi file bana dega
// ye asynchronous tareeke se kaam karega, yani program aage badh sakta hai jab tak file copy ho rahi hai



// How to delete a file
fs.unlink("destination_async.txt", (err) => {
    if (err) {
        console.log("File deletion failed:", err);
    } else {
        console.log("File deleted successfully");
    }                           
});
// destination_async.txt file ko delete kar dega
// agar file exist nahi karti to error dega
// ye asynchronous tareeke se kaam karega, yani program aage badh sakta hai jab tak file delete ho rahi hai
fs.unlinkSync("dest.txt");
// destination.txt file ko delete kar dega
// agar file exist nahi karti to error dega
// ye synchronous tareeke se kaam karega, yani program tab tak aage nahi badhega jab tak file delete nahi ho jati
