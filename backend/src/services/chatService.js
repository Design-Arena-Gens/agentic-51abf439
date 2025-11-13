const suggestions = [
  {
    keywords: ['hydrate', 'water', 'thirst'],
    response:
      'Sip warm water infused with a slice of lime and a few fennel seeds every hour to maintain digestive fire while staying hydrated.',
  },
  {
    keywords: ['sleep', 'insomnia', 'rest'],
    response:
      'Try rubbing a little warm ghee on the soles of your feet before bed and practice 4-7-8 breathing for a calmer nervous system.',
  },
  {
    keywords: ['stress', 'anxiety'],
    response:
      'Practice Nadi Shodhana (alternate nostril breathing) for 7 rounds and enjoy tulsi tea to harmonise Vata energy.',
  },
  {
    keywords: ['digestion', 'bloating'],
    response:
      'Chew on a small piece of ginger with rock salt before meals and favour cooked foods like kitchari for a few days.',
  },
  {
    keywords: ['immunity', 'cold'],
    response:
      'Prepare a kadha with tulsi, black pepper, and gud (jaggery). Sip it warm twice a day to kindle your Agni and support immunity.',
  },
];

const defaultResponse =
  'I am here as your Ayurvedic guide. Share how you are feeling or any ailment, and I will suggest a traditional remedy.';

const getChatResponse = (message = '') => {
  const sanitized = message.toLowerCase();
  const match = suggestions.find(({ keywords }) =>
    keywords.some((keyword) => sanitized.includes(keyword))
  );

  return match?.response || defaultResponse;
};

module.exports = {
  getChatResponse,
};

