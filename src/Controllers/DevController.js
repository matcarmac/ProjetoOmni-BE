const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utilis/parseStringAsArray');

module.exports = {
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },


    async store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const apiresp = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiresp.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                name,
                github_username,
                bio,
                techs: techsArray,
                avatar_url,
                location
            });

        }
        return response.json(dev);
    }
};