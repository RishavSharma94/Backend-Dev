app.get('/books', (req, res) => {
    let { page = 1, limit = 10, author, year } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let results = books;
    if (author) {
        results = results.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
    }
    if (year) {
        results = results.filter(b => b.year === parseInt(year));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedResults = results.slice(startIndex, endIndex);

    res.json({
        total: results.length,       
        page: page,                
        limit: limit,                
        data: paginatedResults       
    });
});