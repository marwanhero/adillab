function loadGlobalComponents() {
    // 1. Define the Footer HTML with INLINE STYLES for the image
    const footerHTML = `
        <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 50px; align-items: start; max-width: 1200px; margin: 0 auto;">
            <div class="footer-profile" style="text-align: center;">
                <div style="position: relative; display: inline-block; margin-bottom: 25px;">
                    <img src="/assets/images/adil.jpeg" alt="Adil BK" 
                         style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; border: 4px solid var(--primary);"
                         onerror="this.src='https://via.placeholder.com/120?text=Adil+BK'">
                </div>
                <h3 style="color: var(--primary); margin: 0 0 10px 0; font-size: 1.6rem;">Adil BK</h3>
                <p data-i18n="footer_adil_bio" style="font-size: 0.9rem; color: #A0AEC0; max-width: 300px; margin: 0 auto;"></p>
            </div>

            <div class="footer-mission">
                <h4 style="color: white; border-bottom: 2px solid var(--secondary); display: inline-block; padding-bottom: 5px; margin-bottom: 20px;" data-i18n="footer_mission_title">Notre Mission</h4>
                <p data-i18n="footer_mission_text" style="font-size: 0.95rem; line-height: 1.6; color: #cbd5e0;"></p>
            </div>

            <div class="footer-contact">
                <h4 style="color: white; margin-bottom: 20px;" data-i18n="footer_contact_title">Contactez-nous</h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <a href="https://www.instagram.com/adil___bour" target="_blank" style="color: #cbd5e0; text-decoration: none; display: flex; align-items: center; gap: 10px;">
                        <i data-lucide="instagram"></i> <span>Instagram</span>
                    </a>
                    <a href="mailto:adilbourkabi72@gmail.com" style="color: #cbd5e0; text-decoration: none; display: flex; align-items: center; gap: 10px;">
                        <i data-lucide="mail"></i> <span>Gmail</span>
                    </a>
                </div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #4A5568; font-size: 0.8rem; color: #718096;">
            <p>&copy; 2026 AdilLab. Créé par <strong>Adil BK</strong> | Étudiant à l'OFPPT CFJ AL KARIA SALE.</p>
        </div>
    `;

    // 2. Inject
    const footerElement = document.getElementById('global-footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
        
        // 3. Re-trigger systems
        if (window.lucide) lucide.createIcons();
        if (window.applyTranslations) window.applyTranslations();
    }
}

document.addEventListener('DOMContentLoaded', () => { loadGlobalComponents(); });