import { useState, useEffect } from 'react';

// Declare globals for the CDN scripts
declare global {
  interface Window {
    confetti: any;
    lucide: any;
  }
}

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

export default function WordScramble() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [lang, setLang] = useState<'en'|'fr'|'ar'>('en');
  const [stars, setStars] = useState(0);
  const [scrambledLetters, setScrambledLetters] = useState<{id: number, char: string, used: boolean}[]>([]);
  const [filledZones, setFilledZones] = useState<(string|null)[]>([]); // null = empty
  const [feedback, setFeedback] = useState("");
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(null);

  // Load level when index or lang changes
  useEffect(() => {
    loadLevel();
  }, [levelIndex, lang]);

  // Refresh icons when UI updates
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  const getTargetWord = () => {
    const data = gameData[levelIndex];
    if (lang === 'fr') return data.fr;
    if (lang === 'ar') return data.ar;
    return data.word;
  };

  const loadLevel = () => {
    const target = getTargetWord();
    // Reset State
    setFilledZones(new Array(target.length).fill(null));
    setFeedback("");
    setSelectedLetterId(null);

    // Scramble letters
    const letters = target.split('').map((char, i) => ({ id: i, char, used: false }));
    // Simple shuffle
    letters.sort(() => Math.random() - 0.5);
    setScrambledLetters(letters);
  };

  const handleDragStart = (e: React.DragEvent, id: number, char: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ id, char }));
  };

  const handleDrop = (e: React.DragEvent, zoneIndex: number) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (!data) return;
    const { id, char } = JSON.parse(data);
    attemptFill(zoneIndex, id, char);
  };

  const handleZoneClick = (zoneIndex: number) => {
    if (selectedLetterId !== null) {
      const letter = scrambledLetters.find(l => l.id === selectedLetterId);
      if (letter) {
        attemptFill(zoneIndex, letter.id, letter.char);
      }
    }
  };

  const attemptFill = (zoneIndex: number, letterId: number, char: string) => {
    const target = getTargetWord();
    const expected = target[zoneIndex];

    if (filledZones[zoneIndex] !== null) return; // Already filled

    if (char === expected) {
      // Correct
      const newFilled = [...filledZones];
      newFilled[zoneIndex] = char;
      setFilledZones(newFilled);

      // Mark letter as used
      setScrambledLetters(prev => prev.map(l => l.id === letterId ? { ...l, used: true } : l));
      
      setSelectedLetterId(null);
      playSound('pop');
      checkWin(newFilled);
    } else {
      // Incorrect
      playSound('error');
      setFeedback("Try again! ❌");
      setTimeout(() => setFeedback(""), 1000);
    }
  };

  const checkWin = (currentFilled: (string|null)[]) => {
    if (currentFilled.every(z => z !== null)) {
      setFeedback("🎉 AWESOME! 🎉");
      playSound('win');
      if (window.confetti) {
        window.confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF7518', '#1034A6', '#FFD700', '#ffffff']
        });
      }
      if (stars < 3) setStars(s => s + 1);
    }
  };

  const nextLevel = () => {
    if (levelIndex < gameData.length - 1) {
      setLevelIndex(l => l + 1);
    } else {
      alert("You completed all levels! Restarting...");
      setLevelIndex(0);
      setStars(0);
    }
  };

  const playSound = (type: 'win' | 'pop' | 'error') => {
    if (type === 'win') {
      const u = new SpeechSynthesisUtterance("Great Job!");
      u.pitch = 1.2; u.rate = 1.1;
      window.speechSynthesis.speak(u);
    } else if (type === 'error') {
       if (navigator.vibrate) navigator.vibrate(200);
    }
  };

  const toggleLang = () => {
    if (lang === 'en') setLang('fr');
    else if (lang === 'fr') setLang('ar');
    else setLang('en');
  };

  const giveHint = () => {
     // Find first empty zone
     const emptyIndex = filledZones.findIndex(z => z === null);
     if (emptyIndex === -1) return;
     
     const target = getTargetWord();
     const needed = target[emptyIndex];

     // Find unused letter that matches
     const match = scrambledLetters.find(l => !l.used && l.char === needed);
     if (match) {
        attemptFill(emptyIndex, match.id, match.char);
     }
  };

  const isLevelComplete = filledZones.every(z => z !== null);

  return (
    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
         <button className="btn" onClick={toggleLang}>Language: {lang.toUpperCase()}</button>
         <div style={{ fontSize: '1.2rem', color: '#666' }}>Level {levelIndex + 1}</div>
      </div>

      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
        {gameData[levelIndex].emoji}
      </div>

      {/* Drop Zones */}
      <div style={{ 
          display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', 
          minHeight: '80px', direction: lang === 'ar' ? 'rtl' : 'ltr' 
        }}>
        {getTargetWord().split('').map((_, i) => (
          <div 
            key={i}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, i)}
            onClick={() => handleZoneClick(i)}
            style={{
              width: '60px', height: '60px', border: '3px dashed #ccc', borderRadius: '15px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: 'bold', background: filledZones[i] ? '#E6FFFA' : 'white',
              borderColor: filledZones[i] ? '#4AC8C8' : '#ccc',
              cursor: 'pointer'
            }}
          >
            {filledZones[i]}
          </div>
        ))}
      </div>

      {/* Stars */}
      <div style={{ color: '#FFD700', fontSize: '2rem', marginBottom: '20px', letterSpacing: '5px' }}>
        {"⭐".repeat(stars) + "☆".repeat(3 - stars)}
      </div>

      {/* Letter Bank */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '30px' }}>
        {scrambledLetters.map((item) => (
          <div 
            key={item.id}
            draggable={!item.used}
            onDragStart={(e) => handleDragStart(e, item.id, item.char)}
            onClick={() => !item.used && setSelectedLetterId(item.id)}
            style={{
              width: '50px', height: '50px', background: 'white', 
              border: item.id === selectedLetterId ? '3px solid #FF9E2A' : '2px solid #ddd',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', cursor: item.used ? 'default' : 'grab',
              opacity: item.used ? 0 : 1, pointerEvents: item.used ? 'none' : 'auto',
              boxShadow: '0 4px 0 rgba(0,0,0,0.1)'
            }}
          >
            {item.char}
          </div>
        ))}
      </div>

      <h2 style={{ height: '40px', color: '#FF9E2A' }}>{feedback}</h2>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button className="btn" onClick={giveHint} disabled={isLevelComplete}>💡 Hint</button>
        {isLevelComplete && (
          <button className="btn" style={{ background: '#FF9E2A', color: 'white' }} onClick={nextLevel}>
             Next ➡
          </button>
        )}
      </div>
    </div>
  );
}
