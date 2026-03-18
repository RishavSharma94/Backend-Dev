const validateBook = (req, res, next) => {
    const { year } = req.body;
    const currentYear = new Date().getFullYear();

    if (!year) {
        return res.status(400).json({ error: "Year is required." });
    }

    if (typeof year !== 'number') {
        return res.status(400).json({ error: "Year must be a number." });
    }

    if (year < 1450 || year > currentYear + 1) {
        return res.status(400).json({ 
            error: `Year must be between 1450 and ${currentYear + 1}.` 
        });
    }

    next();
};

app.post('/books', validateBook, (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});