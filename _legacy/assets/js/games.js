// assets/js/games.js

const gameData = [
  { word: "CAT",    emoji: "🐱", fr: "CHAT", ar: "قطة" },
  { word: "SUN",    emoji: "☀️", fr: "SOLEIL", ar: "شمس" },
  { word: "BOOK",   emoji: "📚", fr: "LIVRE", ar: "كتاب" },
  { word: "FISH",   emoji: "🐟", fr: "POISSON", ar: "سمكة" },
  { word: "TREE",   emoji: "🌳", fr: "ARBRE", ar: "شجرة" },
  { word: "HOUSE",  emoji: "🏠", fr: "MAISON", ar: "منزل" },
  { word: "APPLE",  emoji: "🍎", fr: "POMME", ar: "تفاحة" },
  { word: "STAR",   emoji: "⭐",  fr: "ETOILE", ar: "نجمة" },
  { word: "BIRD",   emoji: "🐦",  fr: "OISEAU", ar: "عصفور" },
  { word: "CAR",    emoji: "🚗",  fr: "VOITURE", ar: "سيارة" }
];

let currentLevelIndex = 0;
let currentLang = 'en';
let scoreStars = 0;
let draggedLetter = null; // For drag events
let selectedLetterElement = null; // For click-to-select (mobile)

document.addEventListener('DOMContentLoaded', () => {
    // Restore Language
    currentLang = localStorage.getItem('spellingAppLang') || 'en';
    updateLangUI();
    
    loadLevel();
    if (typeof lucide !== 'undefined') lucide.createIcons();
});

function updateLangUI() {
    const btn = document.getElementById('lang-toggle-btn');
    if (btn) btn.textContent = `Language: ${currentLang.toUpperCase()}`;
    
    if (currentLang === 'ar') {
        document.body.dir = 'rtl';
        document.body.classList.add('rtl-layout');
    } else {
        document.body.dir = 'ltr';
        document.body.classList.remove('rtl-layout');
    }
}

function toggleLanguage() {
    if (currentLang === 'en') currentLang = 'fr';
    else if (currentLang === 'fr') currentLang = 'ar';
    else currentLang = 'en';
    
    localStorage.setItem('spellingAppLang', currentLang);
    updateLangUI();
    loadLevel();
}

function loadLevel() {
    const data = gameData[currentLevelIndex];
    let targetWord = data.word;
    
    if (currentLang === 'fr') targetWord = data.fr;
    if (currentLang === 'ar') targetWord = data.ar;
    
    // Reset UI
    document.getElementById('level-indicator').textContent = `Level ${currentLevelIndex + 1}`;
    document.getElementById('word-image').textContent = data.emoji;
    document.getElementById('feedback-msg').textContent = "";
    document.getElementById('next-btn').classList.add('hidden');
    
    // Clear containers
    const wordContainer = document.getElementById('word-container');
    const lettersBank = document.getElementById('letters-bank');
    wordContainer.innerHTML = '';
    lettersBank.innerHTML = '';
    
    // 1. Create Drop Zones
    for (let char of targetWord) {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.dataset.expected = char;
        
        // Drag Events
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('hovered');
        });
        
        zone.addEventListener('dragleave', () => zone.classList.remove('hovered'));
        
        zone.addEventListener('drop', handleDrop);
        
        // Click Event (Mobile/Accessible)
        zone.addEventListener('click', () => {
            if (selectedLetterElement && zone.textContent === '') {
                // Check match
                if (selectedLetterElement.textContent === zone.dataset.expected) {
                    fillZone(zone, selectedLetterElement);
                } else {
                    playSound('error');
                    shake(zone);
                }
            }
        });
        
        wordContainer.appendChild(zone);
    }
    
    // 2. Create Scrambled Letters
    const letters = targetWord.split('').sort(() => Math.random() - 0.5);
    
    letters.forEach(char => {
        const tile = document.createElement('div');
        tile.className = 'draggable-letter';
        tile.draggable = true;
        tile.textContent = char;
        
        // Drag Start
        tile.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', char);
            draggedLetter = tile;
        });
        
        // Click Start (Mobile/Accessible)
        tile.addEventListener('click', () => {
            if (tile.style.opacity === '0') return; // Already used
            
            // Deselect others
            document.querySelectorAll('.draggable-letter').forEach(l => l.classList.remove('selected'));
            
            // Select this one
            tile.classList.add('selected');
            selectedLetterElement = tile;
        });
        
        lettersBank.appendChild(tile);
    });
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('hovered');
    const char = e.dataTransfer.getData('text');
    
    if (char === this.dataset.expected) {
        // Find the specific tile element that was dragged (approximation or visual hide)
        if (draggedLetter) {
            fillZone(this, draggedLetter);
        }
    } else {
        playSound('error');
        shake(this);
    }
}

function fillZone(zone, tileElement) {
    zone.textContent = tileElement.textContent;
    zone.classList.add('filled');
    
    // Visual cleanup of the tile
    tileElement.style.opacity = '0';
    tileElement.style.pointerEvents = 'none';
    tileElement.classList.remove('selected');
    selectedLetterElement = null;
    draggedLetter = null;
    
    playSound('pop');
    checkWin();
}

function checkWin() {
    const zones = document.querySelectorAll('.drop-zone');
    const allFilled = Array.from(zones).every(z => z.classList.contains('filled'));
    
    if (allFilled) {
        document.getElementById('feedback-msg').textContent = "🎉 AWESOME! 🎉";
        document.getElementById('next-btn').classList.remove('hidden');
        
        playSound('win');
        triggerConfetti();
        
        // Update Stars
        if (scoreStars < 3) scoreStars++;
        document.getElementById('stars-display').textContent = "⭐".repeat(scoreStars);
    }
}

function nextLevel() {
    currentLevelIndex++;
    if (currentLevelIndex >= gameData.length) {
        currentLevelIndex = 0;
        scoreStars = 0;
        document.getElementById('stars-display').textContent = "☆☆☆";
        alert("You completed all levels! Restarting...");
    }
    loadLevel();
}

function giveHint() {
    const zones = document.querySelectorAll('.drop-zone:not(.filled)');
    if (zones.length === 0) return;
    
    const zone = zones[0];
    const neededChar = zone.dataset.expected;
    
    // Find a matching tile in the bank that is still visible
    const tiles = document.querySelectorAll('.draggable-letter');
    for (let tile of tiles) {
        if (tile.style.opacity !== '0' && tile.textContent === neededChar) {
            fillZone(zone, tile);
            return;
        }
    }
}

// --- Effects ---
function playSound(type) {
    if (type === 'win') {
        const u = new SpeechSynthesisUtterance("Great Job!");
        u.pitch = 1.2; 
        u.rate = 1.1;
        window.speechSynthesis.speak(u);
    } else if (type === 'pop') {
        // Optional subtle click sound
    } else if (type === 'error') {
        if (navigator.vibrate) navigator.vibrate(200);
    }
}

function shake(el) {
    el.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' }
    ], { duration: 200 });
}

function triggerConfetti() {
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF7518', '#1034A6', '#FFD700', '#ffffff']
        });
    }
}