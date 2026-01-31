const ideasData = [
    // Level 1: Basics
    { title: {en:"Trace & Say", fr:"Tracer & Dire", ar:"تتبع وقل"}, icon: "pencil", desc: {en:"Trace letters in sand while saying the sound.", fr:"Tracez des lettres dans le sable.", ar:"ارسم الحروف على الرمل وانطقها."} },
    { title: {en:"Letter Jump", fr:"Saut de Lettre", ar:"قفز الحروف"}, icon: "footprints", desc: {en:"Write letters on the floor and jump on them.", fr:"Sautez sur les lettres au sol.", ar:"اكتب الحروف على الأرض واقفز عليها."} },
    { title: {en:"Sound Match", fr:"Sons", ar:"الأصوات"}, icon: "music", desc: {en:"Match objects to their starting sounds.", fr:"Associez les sons aux objets.", ar:"طابق الأشياء بأصواتها الأولى."} },
    { title: {en:"Playdough Letters", fr:"Pâte à modeler", ar:"عجين الحروف"}, icon: "shapes", desc: {en:"Shape letters using playdough.", fr:"Formez des lettres avec de la pâte.", ar:"شكل الحروف باستخدام العجين."} },
    
    // Level 2: Visual
    { title: {en:"Visual Memory", fr:"Mémoire Visuelle", ar:"الذاكرة البصرية"}, icon: "eye", desc: {en:"Look at a word, cover it, write it.", fr:"Regardez, cachez, écrivez.", ar:"انظر للكلمة، غطها، ثم اكتبها."} },
    { title: {en:"Rainbow Words", fr:"Mots Arc-en-ciel", ar:"كلمات قوس قزح"}, icon: "palette", desc: {en:"Write each letter in a different color.", fr:"Écrivez chaque lettre d'une couleur.", ar:"اكتب كل حرف بلون مختلف."} },
    { title: {en:"Word Shapes", fr:"Formes des Mots", ar:"أشكال الكلمات"}, icon: "box", desc: {en:"Draw boxes around the shape of the word.", fr:"Dessinez les contours du mot.", ar:"ارسم مربعات حول شكل الكلمة."} },
    { title: {en:"Picture Spelling", fr:"Dessin et Mots", ar:"رسم وكلمات"}, icon: "image", desc: {en:"Draw a picture inside the letters.", fr:"Dessinez dans les lettres.", ar:"ارسم صورة داخل الحروف."} },

    // Level 3: Advanced
    { title: {en:"Story Chains", fr:"Histoires", ar:"سلسلة القصص"}, icon: "book-open", desc: {en:"Link spelling words into a funny story.", fr:"Créez une histoire avec les mots.", ar:"اربط الكلمات في قصة مضحكة."} },
    { title: {en:"Rhyme Time", fr:"Rimes", ar:"وقت القافية"}, icon: "mic", desc: {en:"Find words that rhyme with your spelling word.", fr:"Trouvez des rimes.", ar:"جد كلمات لها نفس القافية."} },
    { title: {en:"Backwards Spelling", fr:"À l'envers", ar:"تهجئة عكسية"}, icon: "rotate-ccw", desc: {en:"Spell the word backwards then forwards.", fr:"Épelez à l'envers puis à l'endroit.", ar:"تهجى الكلمة من الخلف للأمام."} },
    { title: {en:"Type it out", fr:"Taper au clavier", ar:"كتابة لوحة المفاتيح"}, icon: "keyboard", desc: {en:"Type the words on a keyboard.", fr:"Tapez les mots sur un clavier.", ar:"اكتب الكلمات على لوحة المفاتيح."} }
];

let currentLang = 'en';

function toggleLanguage() {
    currentLang = (currentLang === 'en') ? 'fr' : (currentLang === 'fr' ? 'ar' : 'en');
    document.querySelector('.page-header button').textContent = currentLang.toUpperCase();
    document.body.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
    renderIdeas();
}

function renderIdeas() {
    const container = document.getElementById('ideas-container');
    if (!container) return;
    container.innerHTML = '';

    ideasData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-content" style="text-align:center;">
                <i data-lucide="${item.icon}" style="margin-bottom:15px; width:48px; height:48px; color:#FF7518;"></i>
                <h3 style="font-size:1.2rem;">${item.title[currentLang]}</h3>
                <p>${item.desc[currentLang]}</p>
            </div>
        `;
        container.appendChild(card);
    });
    if(typeof lucide !== 'undefined') lucide.createIcons();
}
document.addEventListener('DOMContentLoaded', renderIdeas);