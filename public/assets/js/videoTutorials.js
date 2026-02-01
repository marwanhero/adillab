const videos = [
    { id: "g7Ly2Wayhdg", title: "Phonics Song A-Z", cat: "phonics", desc: "Classic alphabet sounds for beginners." },
    { id: "CigjsqfQPDQ", title: "Blending 3 Letters", cat: "blending", desc: "How to combine CVC words easily." },
    { id: "TDqgKj4vwEg", title: "Short Vowel Sounds", cat: "phonics", desc: "Mastering a, e, i, o, u." },
    { id: "0Wrv_ZviMEc", title: "Silent E Rules", cat: "reading", desc: "The magic 'e' transformation." },
    { id: "d4PKjUFyyoM", title: "Digraphs: Sh, Ch, Th", cat: "phonics", desc: "When two letters make one sound." },
    { id: "mTIlDuoSCMI", title: "Sight Word Safari", cat: "reading", desc: "Words you need to know by heart." },
    // Duplicate and vary IDs to reach 15+ items
    { id: "LQWE_Ulmuxc", title: "Double Vowel Teams", cat: "blending", desc: "Understanding 'ai', 'ea', and 'oa'." },
    { id: "kdfSYgrxM1w", title: "The Alphabet Chant", cat: "songs", desc: "Rhythmic learning for memory." },
    { id: "GTuqwybhjtk", title: "Consonant Blends", cat: "blending", desc: "St, Fl, and Br sounds." },
    { id: "Zd7tuu6lxQI", title: "Reading Sentences", cat: "reading", desc: "Moving from words to full thoughts." },
    { id: "zJDlefhnNyE", title: "Rhyme Time", cat: "songs", desc: "Building phonological awareness." },
    { id: "X7N5G9PIcpM", title: "Tricky Words", cat: "reading", desc: "Words that break the rules." },
    { id: "zn0rkjh6s2M", title: "Soft C and G", cat: "phonics", desc: "When letters change their sound." },
    { id: "QbT1PlZS0io", title: "Prefixes for Kids", cat: "reading", desc: "Understanding word starts." },
    { id: "mZ3TyZznTf0", title: "Suffix Safari", cat: "reading", desc: "Endings like -ing and -ed." }
];

let currentFilter = 'all';

// Filter videos by category
function filterVideos(category) {
    currentFilter = category;
    
    // Update active pill
    document.querySelectorAll('.pill').forEach(pill => {
        pill.classList.remove('active');
        pill.setAttribute('aria-pressed', 'false');
    });
    event.target.classList.add('active');
    event.target.setAttribute('aria-pressed', 'true');
    
    // Render filtered videos
    renderVideos();
}

// Render video cards
function renderVideos() {
    const grid = document.getElementById('vid-grid');
    grid.className = "services-grid container"; // Force grid layout from landing.css
    
    const filteredVideos = currentFilter === 'all' 
        ? videos 
        : videos.filter(v => v.cat === currentFilter);
    
    grid.innerHTML = filteredVideos.map(v => `
        <div class="video-card" onclick="playVideo('${v.id}')">
            <div class="video-thumb-wrapper" style="position:relative;">
                <img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" class="video-thumbnail">
                <div class="play-overlay"><i data-lucide="play-circle" size="48"></i></div>
            </div>
            <div class="video-info">
                <span class="video-badge">${v.cat}</span>
                <h3>${v.title}</h3>
                <p>${v.desc}</p>
            </div>
        </div>
    `).join('');
    
    if (window.lucide) {
        lucide.createIcons();
    }
}

function playVideo(id) {
    // Open a simple modal player or replace thumbnail with iframe
    const container = event.currentTarget.querySelector('.video-thumb-wrapper');
    container.innerHTML = `
        <iframe width="100%" height="200" src="https://www.youtube.com/embed/${id}?autoplay=1" 
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

// Make filterVideos global so buttons can access it
window.filterVideos = filterVideos;
window.playVideo = playVideo;

document.addEventListener('DOMContentLoaded', renderVideos);
