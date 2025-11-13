const foods = require('../data/foods');

const normalize = (value) => value?.toLowerCase().trim();

const scoreFood = ({ food, diseases = [], activityLevel, preferredDosha }) => {
  let score = 0;

  diseases.forEach((condition) => {
    if (food.diseases.includes(normalize(condition))) {
      score += 3;
    }
  });

  if (preferredDosha && food.dosha.includes(preferredDosha)) {
    score += 2;
  }

  if (activityLevel === 'active' && food.mealType === 'Lunch') {
    score += 1;
  }

  return score;
};

const getFoodRecommendations = ({ diseases = [], activityLevel, doshaFocus }) => {
  const normalizedDiseases = diseases.map(normalize).filter(Boolean);
  const preferredDosha = normalize(doshaFocus);

  const ranked = foods
    .map((food) => ({
      food,
      score: scoreFood({ food, diseases: normalizedDiseases, activityLevel, preferredDosha }),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ food }) => food);

  if (ranked.length >= 3) {
    return ranked;
  }

  const fillers = foods
    .filter((food) => !ranked.includes(food))
    .slice(0, Math.max(0, 6 - ranked.length));

  return [...ranked, ...fillers];
};

module.exports = {
  getFoodRecommendations,
};

