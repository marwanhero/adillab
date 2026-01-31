import { wordBank, getRandomWord } from '../data/wordBank.js';

// Game State
let currentDifficulty = 'beginner';
let currentWordObj = null;
let currentMissingIndex = -1;
let streak = 0;
let hintsUsed = false;
let wordsSolved = 0;
const TOTAL_WORDS_GOAL = 20;

// DOM Elements
let wordContainer;
let feedbackEl;
let nextBtn;
let diffSelector;
let streakDisplay;
let progressDisplay;
let hintBtn;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    wordContainer = document.getElementById('word-container');
    feedbackEl = document.getElementById('feedback');
    nextBtn = document.getElementById('next-btn');
    diffSelector = document.getElementById('difficulty-selector');
    streakDisplay = document.getElementById('streak-display');
    progressDisplay = document.getElementById('progress-display');
    hintBtn = document.getElementById('hint-btn');

    // Load saved progress
    loadProgress();

    // Event Listeners
    if (nextBtn) nextBtn.onclick = loadNewWord;
    if (hintBtn) hintBtn.onclick = useHint;
    
    // Difficulty Buttons
    const diffBtns = document.querySelectorAll('.difficulty-btn');
    diffBtns.forEach(btn => {
        btn.onclick = (e) => {
            diffBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentDifficulty = e.currentTarget.dataset.difficulty;
            loadNewWord();
        };
    });

    // Initial Load
    loadNewWord();
});

function loadNewWord() {
    // Reset state
    hintsUsed = false;
    feedbackEl.textContent = '';
    feedbackEl.className = '';
    nextBtn.classList.add('hidden');
    if (hintBtn) hintBtn.disabled = false;
    
    // Get Word
    currentWordObj = getRandomWord(currentDifficulty);
    const word = currentWordObj.word.toUpperCase();
    
    // Determine missing letter (avoiding spaces if any)
    let validIndices = [];
    for(let i=0; i<word.length; i++) {
        if (word[i] !== ' ' && word[i] !== '-') validIndices.push(i);
    }
    currentMissingIndex = validIndices[Math.floor(Math.random() * validIndices.length)];

    // Render Word
    wordContainer.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        const charContainer = document.createElement('div');
        charContainer.className = 'letter-box';
        
        if (i === currentMissingIndex) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'missing-input';
            input.dataset.index = i;
            input.dataset.correct = word[i];
            input.addEventListener('input', handleInput);
            input.addEventListener('keyup', (e) => {
                if(e.key === 'Enter') checkAnswer();
            });
            charContainer.appendChild(input);
            
            // Auto-focus on render
            setTimeout(() => input.focus(), 100);
        } else {
            charContainer.textContent = word[i];
        }
        wordContainer.appendChild(charContainer);
    }

    // Update Progress UI
    updateStats();
    
    // Speak word (optional, maybe wait for user request or auto-speak)
    // speak(currentWordObj.word); 
}

function handleInput(e) {
    e.target.value = e.target.value.toUpperCase();
    if (e.target.value.length === 1) {
        checkAnswer();
    }
}

function checkAnswer() {
    const input = document.querySelector('.missing-input');
    const userChar = input.value.toUpperCase();
    const correctChar = input.dataset.correct;

    if (userChar === correctChar) {
        handleWin();
    } else {
        handleFail();
    }
}

function handleWin() {
    const input = document.querySelector('.missing-input');
    input.disabled = true;
    input.classList.add('correct');
    
    feedbackEl.textContent = "Correct! 🎉";
    feedbackEl.className = "success";
    
    // Calc XP
    let xp = 10;
    if (!hintsUsed) xp += 5;
    
    awardXP(xp);
    streak++;
    wordsSolved++;
    saveProgress();
    updateStats();
    
    // Audio Feedback
    if (window.SafariAudio) {
        SafariAudio.playSuccess();
        const successMsg = {
            fr: "Excellent ! ",
            en: "Correct! ",
            ar: "رائع! "
        }[localStorage.getItem('speechSafariLang') || 'fr'];
        SafariAudio.speak(successMsg + currentWordObj.word);
    }
    
    nextBtn.classList.remove('hidden');
    nextBtn.focus();

    if (window.confetti) confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
}

function handleFail() {
    const input = document.querySelector('.missing-input');
    input.classList.add('shake');
    input.value = '';
    setTimeout(() => input.classList.remove('shake'), 500);
    
    feedbackEl.textContent = "Try again!";
    feedbackEl.className = "error";
    
    if(window.SafariAudio) SafariAudio.speak("Try again.");
    streak = 0;
    saveProgress();
    updateStats();
}

function useHint() {
    hintsUsed = true;
    const input = document.querySelector('.missing-input');
    // Speak just the missing letter? Or maybe show it for a second?
    // Let's speak the letter sound or name.
    if(window.SafariAudio) SafariAudio.speak("The missing letter is " + input.dataset.correct);
    hintBtn.disabled = true;
}

// --- Text to Speech Helper ---
// Expose for "Hear Word" button
window.speakWord = () => {
    if(window.SafariAudio && currentWordObj) SafariAudio.speak(currentWordObj.word); 
};

// --- Progress/XP Helpers ---
function loadProgress() {
    const data = JSON.parse(localStorage.getItem('adilLabMissingLetters')) || { streak: 0, wordsSolved: 0 };
    streak = data.streak;
    wordsSolved = data.wordsSolved;
    updateStats();
}

function saveProgress() {
    localStorage.setItem('adilLabMissingLetters', JSON.stringify({ streak, wordsSolved }));
}

function awardXP(amount) {
    // Global Dashboard XP
    const globalData = JSON.parse(localStorage.getItem('speechSafariSave')) || { xp: 0, streak: 0 };
    globalData.xp += amount;
    localStorage.setItem('speechSafariSave', JSON.stringify(globalData));
}

function updateStats() {
    if(streakDisplay) streakDisplay.textContent = `Streak: ${streak} 🔥`;
    if(progressDisplay) progressDisplay.textContent = `Word: ${wordsSolved % TOTAL_WORDS_GOAL}/${TOTAL_WORDS_GOAL}`;
}
