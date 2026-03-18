// GET /books - Get all books OR filter by author/year
app.get('/books', (req, res) => {
    const { author, year } = req.query;
    
    let filteredBooks = books;

    // Filter by author if provided (case-insensitive)
    if (author) {
        filteredBooks = filteredBooks.filter(book => 
            book.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    // Filter by year if provided
    if (year) {
        // Convert query string to number for comparison
        filteredBooks = filteredBooks.filter(book => book.year === parseInt(year));
    }

    res.json(filteredBooks);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));