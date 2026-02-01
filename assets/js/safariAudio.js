/**
 * AdilLab Audio Manager
 * Features: High-clarity TTS, Celebratory SFX, and Trilingual Support
 */
const SafariAudio = {
    synth: window.speechSynthesis,
    
    // 1. Text-to-Speech Logic
    speak: function(text) {
        if (!('speechSynthesis' in window)) {
            console.error("Speech Synthesis not supported in this browser.");
            return;
        }

        // Interrupt current speech if already playing
        this.synth.cancel();

        const utter = new SpeechSynthesisUtterance(text);
        const lang = localStorage.getItem('safariLang') || 'fr'; // Fixed key from speechSafariLang
        
        // Configuration per requirements
        utter.lang = lang === 'ar' ? 'ar-SA' : (lang === 'fr' ? 'fr-FR' : 'en-US');
        utter.rate = 0.8;   // Slower for clarity
        utter.volume = 1.0; // Full volume
        utter.pitch = 1.1;  // Slightly higher for a friendlier "kid-app" tone

        const voices = this.synth.getVoices();
        let preferredVoice = null;

        if (lang === 'fr' || utter.lang === 'fr-FR') {
            // Specific Logic for French Voice Correction
            utter.lang = 'fr-FR';
            preferredVoice = voices.find(v => 
                v.lang === 'fr-FR' && 
                (v.name.includes('Julie') || v.name.includes('Denise') || v.name.includes('Google'))
            );
        } else {
            // General Fallback for other languages
            preferredVoice = voices.find(v => 
                v.lang.includes(utter.lang) && 
                (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'))
            );
        }

        if (preferredVoice) utter.voice = preferredVoice;

        this.synth.speak(utter);
    },

    // 2. Success Celebration Logic
    playSuccess: function() {
        // High-energy applause and joy
        const applause = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'); 
        const cheer = new Audio('https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3');
        
        applause.volume = 0.6;
        cheer.volume = 0.7;
        
        applause.play();
        setTimeout(() => cheer.play(), 200); // Layered sounds for "Joy"
    }
};

// Initialize voices
window.speechSynthesis.onvoiceschanged = () => SafariAudio.synth.getVoices();
window.SafariAudio = SafariAudio;
window.speakWord = () => { /* Placeholder if needed for specific page logic, usually handled by Game logic */ };