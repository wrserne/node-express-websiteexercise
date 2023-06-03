const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/', async (req, res, next) => {
  try {
    const developers = req.body.developers;
    const results = await Promise.all(
      developers.map(async (d) => {
        const response = await axios.get(`https://api.github.com/users/${d}`);
        return response.data;
      })
    );
    const out = results.map((r) => ({ name: r.name, bio: r.bio }));

    res.json(out);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});