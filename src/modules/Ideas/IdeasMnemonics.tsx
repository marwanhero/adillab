import { useState, useEffect } from 'react';

// Using global lucide from CDN
declare global {
    interface Window {
      lucide: any;
    }
}

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

export default function IdeasMnemonics() {
  const [lang, setLang] = useState<'en'|'fr'|'ar'>('en');

  useEffect(() => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
  });

  const toggleLang = () => {
    if (lang === 'en') setLang('fr');
    else if (lang === 'fr') setLang('ar');
    else setLang('en');
  };

  return (
    <div style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Spelling Ideas</h2>
          <button className="btn" onClick={toggleLang}>Language: {lang.toUpperCase()}</button>
       </div>

       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
         {ideasData.map((item, idx) => (
           <div key={idx} style={{ 
               background: 'white', borderRadius: '25px', padding: '30px', 
               boxShadow: '0 8px 0 rgba(0,0,0,0.1)', border: '2px solid #eee',
               textAlign: 'center', transition: 'transform 0.2s'
           }}
           onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
           >
             <i data-lucide={item.icon} style={{ width: '48px', height: '48px', color: '#FF9E2A', marginBottom: '15px' }}></i>
             <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#2D3748' }}>{item.title[lang]}</h3>
             <p style={{ margin: 0, color: '#555', lineHeight: '1.5' }}>{item.desc[lang]}</p>
           </div>
         ))}
       </div>
    </div>
  );
}
