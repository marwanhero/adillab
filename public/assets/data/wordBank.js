/**
 * Speech Safari Word Bank
 * Organized by difficulty and phonics patterns
 * Based on Science of Reading principles
 */

export const wordBank = {
  // LEVEL 1: Beginner (CVC Words - Consonant Vowel Consonant)
  beginner: {
    description: "Simple 3-letter words",
    xpPerWord: 10,
    words: [
      { word: "cat", emoji: "🐱", audio: "cat" },
      { word: "dog", emoji: "🐶", audio: "dog" },
      { word: "bat", emoji: "🦇", audio: "bat" },
      { word: "pig", emoji: "🐷", audio: "pig" },
      { word: "fox", emoji: "🦊", audio: "fox" },
      { word: "hen", emoji: "🐔", audio: "hen" },
      { word: "sun", emoji: "☀️", audio: "sun" },
      { word: "cup", emoji: "☕", audio: "cup" },
      { word: "pen", emoji: "🖊️", audio: "pen" },
      { word: "hat", emoji: "🎩", audio: "hat" },
      { word: "bus", emoji: "🚌", audio: "bus" },
      { word: "net", emoji: "🥅", audio: "net" },
      { word: "map", emoji: "🗺️", audio: "map" },
      { word: "box", emoji: "📦", audio: "box" },
      { word: "bed", emoji: "🛏️", audio: "bed" },
      { word: "fan", emoji: "🪭", audio: "fan" },
      { word: "pot", emoji: "🍲", audio: "pot" },
      { word: "bug", emoji: "🐛", audio: "bug" },
      { word: "rug", emoji: "🧺", audio: "rug" },
      { word: "web", emoji: "🕸️", audio: "web" }
    ]
  },

  // LEVEL 2: Intermediate (Consonant Blends & Digraphs)
  intermediate: {
    description: "4-5 letter words with blends",
    xpPerWord: 20,
    words: [
      { word: "frog", emoji: "🐸", audio: "frog" },
      { word: "star", emoji: "⭐", audio: "star" },
      { word: "flag", emoji: "🚩", audio: "flag" },
      { word: "tree", emoji: "🌲", audio: "tree" },
      { word: "ship", emoji: "🚢", audio: "ship" },
      { word: "fish", emoji: "🐟", audio: "fish" },
      { word: "drum", emoji: "🥁", audio: "drum" },
      { word: "crab", emoji: "🦀", audio: "crab" },
      { word: "snail", emoji: "🐌", audio: "snail" },
      { word: "clock", emoji: "⏰", audio: "clock" },
      { word: "plant", emoji: "🌱", audio: "plant" },
      { word: "truck", emoji: "🚚", audio: "truck" },
      { word: "block", emoji: "🧱", audio: "block" },
      { word: "swing", emoji: "🎪", audio: "swing" },
      { word: "brush", emoji: "🖌️", audio: "brush" },
      { word: "grass", emoji: "🌿", audio: "grass" },
      { word: "shark", emoji: "🦈", audio: "shark" },
      { word: "shell", emoji: "🐚", audio: "shell" },
      { word: "bread", emoji: "🍞", audio: "bread" },
      { word: "train", emoji: "🚂", audio: "train" }
    ]
  },

  // LEVEL 3: Advanced (Silent E, Vowel Teams, R-Controlled)
  advanced: {
    description: "Complex spelling patterns",
    xpPerWord: 30,
    words: [
      { word: "snake", emoji: "🐍", audio: "snake" },
      { word: "globe", emoji: "🌍", audio: "globe" },
      { word: "whale", emoji: "🐋", audio: "whale" },
      { word: "plane", emoji: "✈️", audio: "plane" },
      { word: "horse", emoji: "🐴", audio: "horse" },
      { word: "heart", emoji: "❤️", audio: "heart" },
      { word: "beach", emoji: "🏖️", audio: "beach" },
      { word: "cloud", emoji: "☁️", audio: "cloud" },
      { word: "crown", emoji: "👑", audio: "crown" },
      { word: "flower", emoji: "🌸", audio: "flower" },
      { word: "castle", emoji: "🏰", audio: "castle" },
      { word: "dragon", emoji: "🐉", audio: "dragon" },
      { word: "rocket", emoji: "🚀", audio: "rocket" },
      { word: "turtle", emoji: "🐢", audio: "turtle" },
      { word: "rabbit", emoji: "🐰", audio: "rabbit" },
      { word: "purple", emoji: "🟣", audio: "purple" },
      { word: "trophy", emoji: "🏆", audio: "trophy" },
      { word: "puzzle", emoji: "🧩", audio: "puzzle" },
      { word: "circle", emoji: "⭕", audio: "circle" },
      { word: "monkey", emoji: "🐵", audio: "monkey" }
    ]
  }
};

// Helper function to get random word from a difficulty level
export function getRandomWord(difficulty = 'beginner') {
  const level = wordBank[difficulty];
  const randomIndex = Math.floor(Math.random() * level.words.length);
  return {
    ...level.words[randomIndex],
    xpValue: level.xpPerWord
  };
}

// Get all words from a specific difficulty
export function getWordsByDifficulty(difficulty) {
  return wordBank[difficulty].words;
}

// Get mixed words from all difficulties
export function getMixedWords(count = 10) {
  const allWords = [
    ...wordBank.beginner.words,
    ...wordBank.intermediate.words,
    ...wordBank.advanced.words
  ];
  return shuffleArray(allWords).slice(0, count);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}