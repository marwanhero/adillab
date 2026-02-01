/**
 * Idea Camp & Mnemonics Module
 * Handles multi-language rendering and interactive modals
 */

const ideasLibrary = [
    {
        id: 1,
        title: { en: "Sand Tracing", fr: "Traçage dans le sable", ar: "الكتابة على الرمل" },
        img: "/images/sand.png",
        summary: { en: "Tactile learning for memory.", fr: "Apprentissage tactile.", ar: "التعلم عن طريق اللمس." },
        steps: {
            en: ["Pour sand or salt into a tray.", "Say a word out loud.", "Have the child write it with their finger.", "Shake the tray to erase!"],
            fr: ["Versez du sable dans un plateau.", "Dites un mot.", "L'enfant l'écrit avec son doigt.", "Secouez !"],
            ar: ["ضع الرمل في صينية.", "انطق الكلمة.", "اكتب الكلمة بإصبعك.", "هز الصينية!"]
        },
        benefit: { en: "Multisensory learning helps the brain remember letter shapes.", fr: "L'apprentissage tactile aide la mémoire.", ar: "التعلم باللمس يقوي الذاكرة." }
    },
    {
        id: 2,
        title: { en: "Lego Spelling", fr: "Orthographe Lego", ar: "تهجئة الليجو" },
        img: "/images/lego.png",
        summary: { en: "Build words brick by brick.", fr: "Construisez brique par brique.", ar: "ابنِ الكلمات مكعباً بمكعب." },
        steps: {
            en: ["Write letters on Lego bricks.", "Mix them up.", "Call out a word.", "The child snaps them together."],
            fr: ["Écrivez des lettres sur les briques.", "Mélangez.", "Dites un mot.", "L'enfant les assemble."],
            ar: ["اكتب حرفاً على كل مكعب.", "اخلطها.", "انطق كلمة.", "يجمع الطفل المكعبات."]
        },
        benefit: { en: "Physical action makes abstract words feel concrete.", fr: "La construction rend les mots concrets.", ar: "البناء يجعل الكلمات ملموسة." }
    },
    {
        id: 3,
        title: { en: "Sky Writing", fr: "Écriture céleste", ar: "الكتابة في الهواء" },
        img: "/images/sky.png",
        summary: { en: "Big movements for big memory.", fr: "Grands mouvements.", ar: "حركات كبيرة للذاكرة." },
        steps: {
            en: ["Stand up and lock your elbow.", "Write the word in the air with big arm movements.", "Say each letter out loud.", "Imagine the letters are glowing!"],
            fr: ["Levez-vous.", "Écrivez en l'air avec tout le bras.", "Dites les lettres.", "Imaginez des couleurs !"],
            ar: ["قف ومد ذراعك.", "اكتب الكلمة في الهواء.", "انطق الحروف.", "تخيلها ملونة!"]
        },
        benefit: { en: "Gross motor skills wake up different parts of the brain.", fr: "Éveille le cerveau différemment.", ar: "ينشط أجزاء مختلفة من الدماغ." }
    },
    {
        id: 4,
        title: { en: "Jump Phonics", fr: "Sauter les Sons", ar: "قفز الحروف" },
        img: "/images/jump.png",
        summary: { en: "Active energy for active minds.", fr: "Énergie active.", ar: "طاقة نشطة." },
        steps: {
            en: ["Place letter cards on the floor.", "Shout a sound.", "The child jumps onto the correct letter.", "Chain jumps together!"],
            fr: ["Placez les lettres au sol.", "Criez un son.", "L'enfant saute dessus.", "Formez un mot !"],
            ar: ["ضع الحروف على الأرض.", "انطق صوتاً.", "يقفز الطفل على الحرف.", "كون كلمة بالقفز!"]
        },
        benefit: { en: "Perfect for high-energy kids to associate sound with movement.", fr: "Associe le son au mouvement.", ar: "يربط الصوت بالحركة البدنية." }
    }
];

// Helper to get current language from global i18n system
function getLang() {
    return window.i18n ? window.i18n.getCurrentLanguage() : 'fr';
}

/**
 * Render all idea cards to the grid
 */
function render() {
    const grid = document.getElementById('idea-grid');
    if (!grid) return;
    
    const lang = getLang();
    
    grid.innerHTML = ideasLibrary.map((idea, index) => `
        <article 
            class="idea-card" 
            onclick="openModal(${index})"
            role="button"
            tabindex="0"
            onkeypress="if(event.key==='Enter') openModal(${index})"
            aria-label="Open ${idea.title[lang]} activity details"
        >
            <img 
                src="${idea.img}" 
                alt="${idea.title[lang]}"
                class="idea-card-header"
                loading="lazy"
            >
            <div class="idea-card-body">
                <h3>${idea.title[lang]}</h3>
                <p>${idea.summary[lang]}</p>
            </div>
        </article>
    `).join('');
}

/**
 * Open Modal with details of selected activity
 */
window.openModal = function(index) {
    const idea = ideasLibrary[index];
    const lang = getLang();
    const modal = document.getElementById('modal');
    
    // Populate
    document.getElementById('m-img').src = idea.img;
    document.getElementById('m-img').alt = idea.title[lang];
    document.getElementById('modal-title').textContent = idea.title[lang];
    
    // Steps list
    const stepsHtml = idea.steps[lang].map(step => `<li>${step}</li>`).join('');
    // Add benefit as the last item if it exists
    const benefitHtml = idea.benefit[lang] ? `<li style="margin-top:20px; color:var(--accent); font-weight:700; list-style:none; padding-left:0;">💡 ${idea.benefit[lang]}</li>` : '';
    
    document.getElementById('m-steps').innerHTML = stepsHtml + benefitHtml;
    
    // Show
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Accessibility: Focus close button
    setTimeout(() => {
        document.querySelector('.modal-close-btn')?.focus();
    }, 100);
};

/**
 * Close Modal
 */
window.closeModal = function(event) {
    if (!event || event.target.id === 'modal' || event.target.classList.contains('modal-close-btn')) {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
};

// Listen for language changes to re-render
window.addEventListener('languageChanged', render);

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Initialize on load
document.addEventListener('DOMContentLoaded', render);
