let authors = [
    { id: 1, name: "George Orwell", country: "UK" },
    { id: 2, name: "F. Scott Fitzgerald", country: "USA" }
];
app.get('/authors', (req, res) => {
    res.json(authors);
});

app.get('/authors/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found.');
    res.json(author);
});

app.post('/authors', (req, res) => {
    if (!req.body.name) return res.status(400).send('Name is required.');

    const newAuthor = {
        id: authors.length + 1,
        name: req.body.name,
        country: req.body.country || 'Unknown'
    };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

app.put('/authors/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found.');

    author.name = req.body.name || author.name;
    author.country = req.body.country || author.country;

    res.json(author);
});

app.delete('/authors/:id', (req, res) => {
    const index = authors.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Author not found.');

    const deletedAuthor = authors.splice(index, 1);
    res.json(deletedAuthor[0]);
});