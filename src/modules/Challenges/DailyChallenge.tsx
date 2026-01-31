import { useState, useEffect } from 'react';

// Global Lucide definition
declare global {
    interface Window {
      lucide: any;
    }
}

const challengeData = [
    { title: {en:"Spelling Streak", fr:"Série de Victoires", ar:"سلسلة الانتصارات"}, icon: "flame", goal: "3 Days", progress: "1/3", percent: 33 },
    { title: {en:"Master 5 Words", fr:"Maîtriser 5 Mots", ar:"إتقان 5 كلمات"}, icon: "star", goal: "5 Words", progress: "2/5", percent: 40 },
    { title: {en:"Watch a Video", fr:"Regarder une Vidéo", ar:"شاهد فيديو"}, icon: "video", goal: "1 Video", progress: "0/1", percent: 0 },
    { title: {en:"Perfect Score", fr:"Score Parfait", ar:"درجة كاملة"}, icon: "trophy", goal: "1 Game", progress: "0/1", percent: 0 }
];

export default function DailyChallenge() {
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
          <h2>Daily Challenges</h2>
          <button className="btn" onClick={toggleLang}>Language: {lang.toUpperCase()}</button>
       </div>

       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
         {challengeData.map((ch, idx) => (
           <div key={idx} style={{ 
               background: 'white', borderRadius: '25px', padding: '30px', 
               boxShadow: '0 8px 0 rgba(0,0,0,0.1)', border: '2px solid #eee',
               textAlign: 'center'
           }}>
             <i data-lucide={ch.icon} style={{ width: '48px', height: '48px', color: '#FF9E2A', marginBottom: '15px' }}></i>
             <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#2D3748' }}>{ch.title[lang]}</h3>
             
             {/* Progress Bar */}
             <div style={{ background: '#eee', height: '10px', borderRadius: '5px', margin: '15px 0', overflow: 'hidden' }}>
                 <div style={{ background: '#4AC8C8', width: `${ch.percent}%`, height: '100%', transition: 'width 0.5s' }}></div>
             </div>

             <p style={{ margin: 0, color: '#555' }}>
                <strong>{ch.progress}</strong> - Goal: {ch.goal}
             </p>
           </div>
         ))}
       </div>
    </div>
  );
}
