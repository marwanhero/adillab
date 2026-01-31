const videoData = [
    { title: {en:"The Letter A", fr:"La Lettre A", ar:"حرف الألف"}, id: "BELlZKpi1Zs", desc: {en:"Learn the letter A with Sesame Street.", fr:"Apprendre la lettre A.", ar:"تعلم حرف الألف."} },
    { title: {en:"Phonics Song", fr:"Chanson Alphabet", ar:"أغنية الحروف"}, id: "T4fugtNYRnA", desc: {en:"Sing along with the phonics song.", fr:"Chantez avec l'alphabet.", ar:"غنِ معنا."} },
    { title: {en:"Silent E Rule", fr:"La Règle du E Muet", ar:"قاعدة الحرف الصامت"}, id: "MNhZ0jM7eew", desc: {en:"How Silent E changes the word.", fr:"Le E muet change tout.", ar:"كيف يغير الحرف الصامت الكلمة."} },
    { title: {en:"Blending Sounds", fr:"Combiner les Sons", ar:"دمج الأصوات"}, id: "3yXlK9N6qDw", desc: {en:"Learn to blend sounds to read.", fr:"Apprendre à lire en combinant.", ar:"تعلم دمج الأصوات للقراءة."} },
    { title: {en:"Double Letters", fr:"Doubles Lettres", ar:"الحروف المزدوجة"}, id: "sYfJ4p3jKjg", desc: {en:"When to use double letters?", fr:"Quand doubler les lettres?", ar:"متى نستخدم الحروف المزدوجة؟"} }
];

let currentLang = 'en';

function toggleLanguage() {
    currentLang = (currentLang === 'en') ? 'fr' : (currentLang === 'fr' ? 'ar' : 'en');
    document.querySelector('.page-header button').textContent = currentLang.toUpperCase();
    document.body.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
    renderVideos();
}

function renderVideos() {
    const container = document.getElementById('video-container');
    if (!container) return;
    container.innerHTML = '';

    videoData.forEach(vid => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/${vid.id}" frameborder="0" allowfullscreen></iframe>
            <div class="card-content">
                <h3>${vid.title[currentLang]}</h3>
                <p>${vid.desc[currentLang]}</p>
            </div>
        `;
        container.appendChild(card);
    });
}
document.addEventListener('DOMContentLoaded', renderVideos);