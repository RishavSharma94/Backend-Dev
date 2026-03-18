app.get('/books', (req, res) => {
    let { 
        page = 1, 
        limit = 10, 
        author, 
        year, 
        title 
    } = req.query;

    let results = books;

    if (title) {
        results = results.filter(b => 
            b.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (author) {
        results = results.filter(b => 
            b.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    if (year) {
        results = results.filter(b => b.year === parseInt(year));
    }


    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    const paginatedResults = results.slice(startIndex, endIndex);

    res.json({
        total_matches: results.length, 
        page: pageNum,
        limit: limitNum,
        data: paginatedResults
    });
});