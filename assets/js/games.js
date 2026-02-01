import { wordBank } from '../data/wordBank.js';

// Flatten word bank for sequential play
const dictionary = [
    ...wordBank.beginner.words,
    ...wordBank.intermediate.words,
    ...wordBank.advanced.words
].sort(() => Math.random() - 0.5); // Shuffle for variety

const state = {
    levelIndex: 0,
    currentWord: "",
    lang: localStorage.getItem('speechSafariLang') || 'fr' // Consistent key
};

function initGame() {
    const data = dictionary[state.levelIndex];
    // Assuming wordBank structure: { word: "cat", emoji: "🐱", audio: "cat" }
    // If we want translation support for words, we might need a richer dictionary.
    // For now, we use the English word as the target since wordBank is English-based.
    // Ideally, wordBank should have 'fr' and 'ar' keys if we want multilingual target words.
    // Given the current wordBank, we'll stick to the 'word' property (English).
    state.currentWord = data.word;
    
    // Display Emoji
    const emojiEl = document.getElementById('target-emoji');
    if(emojiEl) emojiEl.textContent = data.emoji;
    
    // Setup Slots (Horizontal)
    const slotsArea = document.getElementById('slots-area');
    if(slotsArea) {
        slotsArea.innerHTML = '';
        [...state.currentWord].forEach(() => {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slotsArea.appendChild(slot);
        });
    }

    // Setup Letters
    const lettersArea = document.getElementById('letters-area');
    if(lettersArea) {
        lettersArea.innerHTML = '';
        const shuffled = [...state.currentWord].sort(() => Math.random() - 0.5);
        shuffled.forEach(char => {
            const tile = document.createElement('div');
            tile.className = 'letter-tile'; // Will need CSS for this or map to .draggable
            tile.textContent = char.toUpperCase();
            tile.onclick = () => handleLetterClick(char, tile);
            lettersArea.appendChild(tile);
        });
    }
}

function handleLetterClick(char, tile) {
    if (tile.classList.contains('used')) return;

    const slots = document.querySelectorAll('.slot');
    const emptySlot = [...slots].find(s => s.textContent === "");
    
    if (emptySlot) {
        emptySlot.textContent = char.toUpperCase();
        emptySlot.classList.add('filled');
        tile.classList.add('used');
        if (window.SafariAudio) SafariAudio.speak(char);
        checkWin();
    }
}

function checkWin() {
    const userWord = [...document.querySelectorAll('.slot')].map(s => s.textContent).join('').toLowerCase();
    if (userWord === state.currentWord.toLowerCase()) {
        const saveData = JSON.parse(localStorage.getItem('speechSafariSave')) || { xp: 0, streak: 0 };
        saveData.streak++;
        saveData.xp += 10;
        localStorage.setItem('speechSafariSave', JSON.stringify(saveData));
        
        if (window.SafariAudio) SafariAudio.playSuccess();
        if (window.confetti) confetti();
        
        const feedback = document.getElementById('feedback');
        if(feedback) feedback.textContent = "Parfait ! Bon travail !";
        
        const nextBtn = document.getElementById('next-btn');
        if(nextBtn) nextBtn.classList.remove('hidden');
        
        updateStreakDisplay(saveData.streak);
    }
}

function updateStreakDisplay(streak) {
    const display = document.getElementById('streak-display');
    if(display) {
        // Use i18n if available for label, else simplified fallback based on prompt logic
        // But since this is a module, we can access i18n global
        const label = (window.i18n && window.i18n.t) ? window.i18n.t('streak_label') : "Série";
        display.textContent = `${label}: ${streak} 🔥`;
    }
}

const nextBtn = document.getElementById('next-btn');
if(nextBtn) {
    nextBtn.onclick = () => {
        state.levelIndex = (state.levelIndex + 1) % dictionary.length;
        nextBtn.classList.add('hidden');
        const feedback = document.getElementById('feedback');
        if(feedback) feedback.textContent = "";
        initGame();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const saveData = JSON.parse(localStorage.getItem('speechSafariSave')) || { xp: 0, streak: 0 };
    updateStreakDisplay(saveData.streak);
    initGame();
    if(window.lucide) lucide.createIcons();
});
