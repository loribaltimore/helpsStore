const User = require('../models/userSchema');
const database = require('../models/database');

const addPersonality = async function (userId, openness, conscientiousness, extraversion, agreeableness, neuroticism) {
    await database();
    const currentUser = await User.findById(userId);
    currentUser.personality = {
        openness,
        conscientiousness,
        extraversion,
        agreeableness,
        neuroticism
    };
    await currentUser.save();
};

module.exports = {addPersonality};

