const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utilis/parseStringAsArray');



module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringAsArray(techs);
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude,latitude],
                    },
                },$maxDistance: 10000,
            },
        });

        console.log(techsArray);
        return response.json({ devs })
    }

}