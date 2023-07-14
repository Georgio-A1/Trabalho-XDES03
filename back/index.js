const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

const ratingFunction = require('./src/functions/ratingCalculator');
const apiConsumers = require('./src/functions/apisConsumer');
const Review = require('./src/models/Review');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Route responsible for searching for games with the name indicated in the URL.
app.get('/search/:gamename', async (req, res) => {
    const gameName = req.params.gamename;
    infoGames = await apiConsumers.igdbConsumerSearch(gameName);
    infoGames = JSON.stringify(ratingFunction.ratingCalculator(infoGames));
    res.send(infoGames);
});

//Route responsible for adding reviews to a given game.
app.post('/review/:gamename', (req, res) => {
    const { email, name, rating, description } = req.body;
    const gameName = req.params.gamename;

    console.log('Received Data:', req.body)

    try {
        const reviews = JSON.parse(fs.readFileSync('./src/database/review.json', { encoding: 'utf8', flag: 'r' })); //Access to the file composed of reviews.

        console.log('Existing Reviews:', reviews);

        for (let savedReviews of reviews) {
            if ((savedReviews.email === email) && (savedReviews.gameName === gameName)) {
                return res.status(409).send(`Uma avaliação já foi escrita com o email ${email}.`); //Checking if the email has already been used in other game review.
            }
        }
        const review = new Review(reviews.length + 1, gameName, email, name, rating, description); //Building a new review-type object.
        reviews.push(review); //Adding new review to the list of reviews.
        fs.writeFileSync('./src/database/review.json', JSON.stringify(reviews, null, 2)); //Saving changes to file composed of reviews.

        console.log('Updated Reviews:', reviews);

        res.send('Avaliação registrada com sucesso!');
    } catch (err) {
        res.send(err.message);
    }
});

// Endpoint to get reviews for a specific game name
app.get('/game/:gameName', (req, res) => {
    const gameRName = req.params.gameName;
    try {
      const data = fs.readFileSync('./src/database/review.json', 'utf8');
      const greviews = JSON.parse(data);
      const gameReviews = greviews.filter((greview) => greview.gameName === gameRName);
      console.log(gameReviews);
      console.log(greviews);
      console.log(greviews.gameName);
      res.json(gameReviews);
    } catch (error) {
      console.error('Failed to read or parse review data', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });
  

//Route used when the called URL is not listed.
app.get('*', (req, res) => {
    res.send('Página não encontrada!');
});

 //Port used to make requests on local server.
app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});