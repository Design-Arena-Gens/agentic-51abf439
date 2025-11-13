const remedies = require('../data/remedies');

const getRemedies = (req, res) => {
  res.json({ remedies });
};

const getRemedyOfTheDay = (req, res) => {
  const index = new Date().getDate() % remedies.length;
  res.json({ remedy: remedies[index] });
};

module.exports = {
  getRemedies,
  getRemedyOfTheDay,
};

