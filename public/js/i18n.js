const translations = {
    fr: {
        nav_features: "Fonctionnalités",
        nav_benefits: "Avantages",
        nav_start: "Commencer",
        hero_title: "Maîtrisez l'orthographe avec <span class='highlight'>confiance</span>",
        hero_subtitle: "Une aventure interactive pour aider les enfants à apprendre la lecture par le jeu.",
        game_living_letters: "Lettres Vivantes",
        game_missing_letters: "Lettres Manquantes",
        game_word_hunt: "Chasse aux Mots",
        game_idea_camp: "Camp d'Idées",
        footer_owner_title: "Adil BK",
        footer_adil_bio: "Fondateur et développeur principal d'AdilLab. J'ai 22 ans et j'étudie à l'OFPPT CFJ AL KARIA SALE, éducateur spécialisé dans la petite enfance. Passionné par la création d'outils éducatifs multisensoriels.",
        footer_mission_title: "NOTRE MISSION",
        footer_mission_text: "Notre mission est de transformer l'apprentissage de l'orthographe en une aventure immersive, combinant expertise pédagogique et technologie moderne pour chaque enfant.",
        footer_contact_title: "CONTACTEZ-NOUS",
        back_map: "Accueil",
        streak_label: "Série",
        xp_label: "XP"
    },
    en: {
        nav_features: "Features",
        nav_benefits: "Benefits",
        nav_start: "Start Playing",
        hero_title: "Master Spelling with <span class='highlight'>Confidence</span>",
        hero_subtitle: "An interactive adventure for kids to learn reading through play.",
        game_living_letters: "Living Letters",
        game_missing_letters: "Missing Letters",
        game_word_hunt: "Word Hunt",
        game_idea_camp: "Idea Camp",
        footer_owner_title: "Adil BK",
        footer_adil_bio: "Founder & Lead Developer of AdilLab. I'm 22 years old and study at OFPPT CFJ AL KARIA SALE, specializing as an early childhood educator. Passionate about creating multisensory educational tools.",
        footer_mission_title: "OUR MISSION",
        footer_mission_text: "Our mission is to turn spelling into an immersive adventure, combining pedagogical expertise with modern technology for every child.",
        footer_contact_title: "CONTACT US",
        back_map: "Home",
        streak_label: "Streak",
        xp_label: "XP"
    },
    ar: {
        nav_features: "المميزات",
        nav_benefits: "الفوائد",
        nav_start: "ابدأ اللعب",
        hero_title: "أتقن الإملاء بكل <span class='highlight'>ثقة</span>",
        hero_subtitle: "مغامرة تفاعلية للأطفال لتعلم القراءة من خلال اللعب.",
        game_living_letters: "الحروف الحية",
        game_missing_letters: "الحروف المفقودة",
        game_word_hunt: "البحث عن الكلمات",
        game_idea_camp: "مخيم الأفكار",
        footer_owner_title: "عادل BK",
        footer_adil_bio: "مؤسس ومطور AdilLab. عمري 22 عامًا، أدرس في OFPPT CFJ AL KARIA SALE، متخصص كمدرب في الطفولة المبكرة. شغوف بإنشاء أدوات تعليمية متعددة الحواس.",
        footer_mission_title: "مهمتنا",
        footer_mission_text: "مهمتنا هي تحويل تعلم الإملاء إلى مغامرة غامرة، تجمع بين الخبرة التربوية والتكنولوجيا الحديثة لكل طفل.",
        footer_contact_title: "اتصل بنا",
        back_map: "الرئيسية",
        streak_label: "متتالية",
        xp_label: "نقطة"
    }
};

function applyTranslations() {
    const lang = localStorage.getItem('safariLang') || 'fr';
    
    // 1. Appliquer les textes (Global DOM targeting)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // 2. Synchroniser le menu déroulant (Picker)
    const selector = document.getElementById('lang-selector');
    if (selector) {
        selector.value = lang;
    }

    // 3. Gérer la direction et l'attribut lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
}

// Nouvelle fonction d'initialisation propre
function initLanguageSystem() {
    if (!localStorage.getItem('safariLang')) {
        localStorage.setItem('safariLang', 'fr');
    }
    applyTranslations();
}

// Force apply on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSystem);
} else {
    initLanguageSystem();
}

window.setLanguage = (lang) => {
    localStorage.setItem('safariLang', lang);
    applyTranslations(); // Immediate apply
    location.reload(); // Full refresh
};