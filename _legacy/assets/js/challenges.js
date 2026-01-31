const challenges = [
    { title: {en:"Spelling Streak", fr:"Série de Victoires", ar:"سلسلة الانتصارات"}, icon: "flame", goal: "3 Days", progress: "1/3" },
    { title: {en:"Master 5 Words", fr:"Maîtriser 5 Mots", ar:"إتقان 5 كلمات"}, icon: "star", goal: "5 Words", progress: "2/5" },
    { title: {en:"Watch a Video", fr:"Regarder une Vidéo", ar:"شاهد فيديو"}, icon: "video", goal: "1 Video", progress: "0/1" },
    { title: {en:"Perfect Score", fr:"Score Parfait", ar:"درجة كاملة"}, icon: "trophy", goal: "1 Game", progress: "0/1" }
];

let currentLang = 'en';

function toggleLanguage() {
    currentLang = (currentLang === 'en') ? 'fr' : (currentLang === 'fr' ? 'ar' : 'en');
    document.querySelector('.page-header button').textContent = currentLang.toUpperCase();
    document.body.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
    renderChallenges();
}

function renderChallenges() {
    const container = document.getElementById('challenges-container');
    if (!container) return;
    container.innerHTML = '';

    challenges.forEach(ch => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.textAlign = 'center';
        card.innerHTML = `
            <div class="card-content">
                <i data-lucide="${ch.icon}" style="width:48px; height:48px; color:#FF7518; margin-bottom:15px;"></i>
                <h3>${ch.title[currentLang]}</h3>
                <div style="background:#eee; height:10px; border-radius:5px; margin:15px 0; overflow:hidden;">
                    <div style="background:#1034A6; width:40%; height:100%;"></div>
                </div>
                <p><strong>${ch.progress}</strong> - Goal: ${ch.goal}</p>
            </div>
        `;
        container.appendChild(card);
    });
    if(typeof lucide !== 'undefined') lucide.createIcons();
}
document.addEventListener('DOMContentLoaded', renderChallenges);