const express = require('express');
const app = express();
app.use(express.json());

let books = [
    { id: 1, title: "1984", author: "George Orwell", year: 1949 },
    { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 3, title: "Animal Farm", author: "George Orwell", year: 1945 },
    { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 }
];