import { useState } from 'react';

const videoData = [
    { title: {en:"The Letter A", fr:"La Lettre A", ar:"حرف الألف"}, id: "BELlZKpi1Zs", desc: {en:"Learn the letter A with Sesame Street.", fr:"Apprendre la lettre A.", ar:"تعلم حرف الألف."} },
    { title: {en:"Phonics Song", fr:"Chanson Alphabet", ar:"أغنية الحروف"}, id: "T4fugtNYRnA", desc: {en:"Sing along with the phonics song.", fr:"Chantez avec l'alphabet.", ar:"غنِ معنا."} },
    { title: {en:"Silent E Rule", fr:"La Règle du E Muet", ar:"قاعدة الحرف الصامت"}, id: "MNhZ0jM7eew", desc: {en:"How Silent E changes the word.", fr:"Le E muet change tout.", ar:"كيف يغير الحرف الصامت الكلمة."} },
    { title: {en:"Blending Sounds", fr:"Combiner les Sons", ar:"دمج الأصوات"}, id: "3yXlK9N6qDw", desc: {en:"Learn to blend sounds to read.", fr:"Apprendre à lire en combinant.", ar:"تعلم دمج الأصوات للقراءة."} },
    { title: {en:"Double Letters", fr:"Doubles Lettres", ar:"الحروف المزدوجة"}, id: "sYfJ4p3jKjg", desc: {en:"When to use double letters?", fr:"Quand doubler les lettres?", ar:"متى نستخدم الحروف المزدوجة؟"} }
];

export default function VideoTutorials() {
  const [lang, setLang] = useState<'en'|'fr'|'ar'>('en');

  const toggleLang = () => {
    if (lang === 'en') setLang('fr');
    else if (lang === 'fr') setLang('ar');
    else setLang('en');
  };

  return (
    <div style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Video Lessons</h2>
          <button className="btn" onClick={toggleLang}>Language: {lang.toUpperCase()}</button>
       </div>

       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
         {videoData.map((vid) => (
           <div key={vid.id} style={{ 
               background: 'white', borderRadius: '25px', padding: '20px', 
               boxShadow: '0 8px 0 rgba(0,0,0,0.1)', border: '2px solid #eee'
           }}>
             <iframe 
                width="100%" height="200" 
                src={`https://www.youtube.com/embed/${vid.id}`} 
                title={vid.title[lang]}
                frameBorder="0" 
                allowFullScreen 
                style={{ borderRadius: '15px', marginBottom: '15px' }}
             />
             <h3 style={{ margin: '0 0 10px 0', color: '#FF9E2A' }}>{vid.title[lang]}</h3>
             <p style={{ margin: 0, color: '#555' }}>{vid.desc[lang]}</p>
           </div>
         ))}
       </div>
    </div>
  );
}
