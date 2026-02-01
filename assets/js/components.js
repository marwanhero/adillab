function loadGlobalComponents() {
    const footerHTML = `
        <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 50px; align-items: start;">
            <div class="footer-profile" style="text-align: center;">
                <div style="position: relative; display: inline-block; margin-bottom: 25px;">
                    <img src="/assets/images/adil.jpeg" alt="Adil BK" class="high-res-profile" onerror="this.src='https://via.placeholder.com/140?text=Adil+BK'">
                    <div style="position: absolute; bottom: 8px; right: 8px; background: var(--accent); width: 22px; height: 22px; border-radius: 50%; border: 3px solid #2D3748;"></div>
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
                <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                    <a href="https://www.instagram.com/adil___bour?igsh=MXFrNXN5bTB5bWY1eg==" target="_blank" class="social-link instagram"><i data-lucide="instagram"></i> <span>Instagram</span></a>
                    <a href="https://www.facebook.com/profile.php?id=61554610582358" target="_blank" class="social-link facebook">
                        <i data-lucide="facebook"></i> <span>Facebook</span>
                    </a>
                    <a href="https://wa.me/212600000000" target="_blank" class="social-link whatsapp">
                        <i data-lucide="message-circle"></i> <span>WhatsApp</span>
                    </a>
                    <a href="mailto:adilbourkabi72@gmail.com" class="social-link gmail"><i data-lucide="mail"></i> <span>Gmail</span></a>
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
        // IMPORTANT: Trigger icons and translation AFTER injection
        if (window.lucide) lucide.createIcons();
        if (window.applyTranslations) window.applyTranslations();
    }
}
document.addEventListener('DOMContentLoaded', loadGlobalComponents);