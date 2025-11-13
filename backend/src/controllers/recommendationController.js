const { getFoodRecommendations } = require('../services/recommendationService');

const getRecommendations = (req, res) => {
  const { disease, diseases, activityLevel, dosha } = req.query;

  const diseaseList = [];
  if (disease) diseaseList.push(disease);
  if (diseases) {
    try {
      const parsed = JSON.parse(diseases);
      if (Array.isArray(parsed)) {
        diseaseList.push(...parsed);
      }
    } catch {
      diseaseList.push(diseases);
    }
  }

  const recommendations = getFoodRecommendations({
    diseases: diseaseList,
    activityLevel,
    doshaFocus: dosha,
  });

  res.json({ foods: recommendations });
};

module.exports = {
  getRecommendations,
};

