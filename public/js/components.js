function loadGlobalComponents() {
    const footerHTML = `
        <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 50px; align-items: start; max-width: 1200px; margin: 0 auto;">
            <div class="footer-profile" style="text-align: center;">
                <div style="position: relative; display: inline-block; margin-bottom: 25px;">
                    <img src="/images/adil.jpeg" alt="Adil BK" 
                         style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; border: 4px solid var(--primary); box-shadow: 0 10px 20px rgba(0,0,0,0.2);"
                         onerror="this.src='https://via.placeholder.com/120?text=Adil+BK'">
                </div>
                <h3 style="color: var(--primary); margin: 0 0 10px 0; font-size: 1.8rem;">Adil BK</h3>
                <p data-i18n="footer_adil_bio" style="font-size: 0.95rem; line-height: 1.6; color: #A0AEC0; max-width: 350px; margin: 0 auto;"></p>
            </div>

            <div class="footer-mission">
                <h4 style="color: white; border-bottom: 2px solid var(--secondary); display: inline-block; padding-bottom: 5px; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;" data-i18n="footer_mission_title">Notre Mission</h4>
                <p data-i18n="footer_mission_text" style="font-size: 1rem; line-height: 1.8; color: #cbd5e0;"></p>
            </div>

            <div class="footer-contact">
                <h4 style="color: white; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;" data-i18n="footer_contact_title">Contactez-nous</h4>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <a href="https://www.instagram.com/adil___bour" target="_blank" style="color: #cbd5e0; text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.3s;">
                        <i data-lucide="instagram"></i> <span>Instagram</span>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61554610582358" target="_blank" style="color: #cbd5e0; text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.3s;">
                        <i data-lucide="facebook"></i> <span>Facebook</span>
                    </a>
                    <a href="https://wa.me/212600000000" target="_blank" style="color: #cbd5e0; text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.3s;">
                        <i data-lucide="message-circle"></i> <span>WhatsApp</span>
                    </a>
                    <a href="mailto:adilbourkabi72@gmail.com" style="color: #cbd5e0; text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.3s;">
                        <i data-lucide="mail"></i> <span>Gmail</span>
                    </a>
                </div>
            </div>
        </div>

        <div style="text-align: center; margin-top: 60px; padding-top: 30px; border-top: 1px solid #4A5568; font-size: 0.85rem; color: #718096;">
            <p>&copy; 2026 AdilLab. Créé par <strong>Adil BK</strong> | Étudiant à l'OFPPT CFJ AL KARIA SALE.</p>
        </div>
    `;

    const footerElement = document.getElementById('global-footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
        // Re-trigger icons and translations for the new content
        if (window.lucide) lucide.createIcons();
        if (window.applyTranslations) window.applyTranslations();
    }
}

document.addEventListener('DOMContentLoaded', loadGlobalComponents);