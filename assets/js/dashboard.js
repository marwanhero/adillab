function updateLiveDashboard() {
    const saveData = JSON.parse(localStorage.getItem('speechSafariSave')) || { xp: 0, streak: 0 };
    const lang = localStorage.getItem('safariLang') || 'fr';
    
    // Update XP Display
    const xpText = document.getElementById('xp-display');
    if (xpText) xpText.textContent = `${saveData.xp} XP`;

    // Update Streak Badge
    const streakBadge = document.getElementById('streak-badge');
    if (streakBadge) {
        // Access existing translation object from i18n.js if available
        const label = (typeof translations !== 'undefined' && translations[lang] && translations[lang].streak_label) 
                      ? translations[lang].streak_label 
                      : "Série";
        streakBadge.textContent = `${label}: ${saveData.streak} 🔥`;
    }

    // Update Progress Ring (Real Math)
    const circle = document.getElementById('progress-ring-circle');
    if (circle) {
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        // Logic: XP % 100 determines the progress within the current level
        const percent = (saveData.xp % 100); 
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
}
document.addEventListener('DOMContentLoaded', updateLiveDashboard);