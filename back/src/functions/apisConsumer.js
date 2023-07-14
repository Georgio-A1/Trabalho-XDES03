const igdb = require('igdb-api-node').default; //A Node.js wrapper for the IGDB API.

//Access credentials used to consume the IGDB APIs.
const client = 'aybfike88n8yqkudlkht30y2tjn8ks';
const token = 'rbrsebp3tp41al266j0abkezp6194y';

//Function used to fetch the actual values of the data received by the IGBD API.
async function igdbHelper(data) {

    if (Array.isArray(data)) { //Check if there is more than one game in data to be able to walk through it.
        for (let result = 0; result < data.length; result++) {
            if (data[result].cover) { //Check if there is a cover on game data.

                data[result].cover = await igdbCover(data[result].cover);
            }
            if (data[result].platforms) { //Check if there is a platform on game data.
                if (Array.isArray(data[result].platforms)) { //Check if there is more than one plataform in game to be able to walk through it.
                    for (let item = 0; item < data[result].platforms.length; item++) {

                        data[result].platforms[item] = await igdbPlataforms(data[result].platforms[item]);
                    }
                } else {

                    data[result].platforms = await igdbPlataforms(data[result].platforms);
                }
            }
            if (data[result].genres) { //Check if there is a genre on game data.
                if (Array.isArray(data[result].genres)) { //Check if there is more than one genre in game to be able to walk through it.
                    for (let item = 0; item < data[result].genres.length; item++) {

                        data[result].genres[item] = await igdbGenres(data[result].genres[item]);
                    }
                } else {

                    data[result].genres = await igdbGenres(data[result].genres);
                }
            }
        }

    } else {
        if (data.cover) { //Check if there is a cover on game data.

            data.cover = await igdbCover(data.cover);
        }

        if (data.platforms) { //Check if there is a plataforms on game data.
            if (Array.isArray(data.platforms)) { //Check if there is more than one plataform in game to be able to walk through it.
                for (let item = 0; item < data.platforms.length; item++) {

                    data.platforms[item] = await igdbPlataforms(data.platforms[item]);
                }

            } else {

                data.platforms = await igdbPlataforms(data.platforms);
            }
        }

        if (data.genres) { //Check if there is a genre on game data.
            if (Array.isArray(data.genres)) { //Check if there is more than one genre in game to be able to walk through it.
                for (let item = 0; item < data.genres.length; item++) {

                    data.genres[item] = await igdbGenres(data.genres[item]);
                }
            } else {

                data.genres = await igdbGenres(data.genres);
            }
        }
    }
    return data;
}

//Function used to search through the id, the url of the game image.
async function igdbCover(coverId) {
    try {
        const response = await igdb(client, token)
            .fields(['url'])
            .limit(1)
            .where(`id = ${coverId}`)
            .request('/covers');

        return response.data[0].url;
    } catch (err) {
        return err.message;
    }
}

//Function used to search through the array of id's, the name of platforms which the game is available on.
async function igdbPlataforms(platformsId) {
    try {
        const response = await igdb(client, token)
            .fields(['name'])
            .limit(1)
            .where(`id = ${platformsId}`)
            .request('/platforms');

        return response.data[0].name;
    } catch (err) {
        return err.message;
    }
}

//Function used to search through the array of id's, the name of genres which the game belongs.
async function igdbGenres(genreId) {
    try {
        const response = await igdb(client, token)
            .fields(['name'])
            .limit(1)
            .where(`id = ${genreId}`)
            .request('/genres');

        return response.data[0].name;
    } catch (err) {
        return err.message;
    }
}

//Function used to search a list of games by name.
async function igdbConsumerSearch(gameName) {
    try {
        const response = await igdb(client, token)
            .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary']) //Expected fields of the game data.
            .limit(12) //Maximum number of games data.
            .search(gameName)
            .request('/games'); //IGDB API Route.

        response.data = await igdbHelper(response.data);

        return response.data;
    } catch (err) {
        return err.message;
    }
}

//Function used to search for a list of games that have a high total_rating.
async function igdbConsumerHighlights() {
    try {
        const response = await igdb(client, token)
            .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary'])
            .limit(7)
            .offset(5) //Minimum number of games data.
            .sort('name') //Sorted by game name.
            .where(`total_rating > ${95}`) //Returns only those games that have a score higher than the given value.
            .request('/games');

        response.data = await igdbHelper(response.data);

        return response.data;
    } catch (err) {
        return err.message;
    }
}

//Function used to search for a list of games that have a certain genre.
async function igdbConsumerGenre(genre) {
    try {
        const response = await igdb(client, token)
            .fields(['cover', 'name', 'total_rating', 'genres', 'platforms', 'first_release_date', 'summary'])
            .limit(20)
            .sort('name')
            .where(`genres = ${genre}`)
            .request('/games');

        response.data = await igdbHelper(response.data);

        return response.data;
    } catch (err) {
        return err.message;
    }
}

module.exports = { igdbConsumerGenre, igdbConsumerHighlights, igdbConsumerSearch };