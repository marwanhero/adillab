function loadGlobalComponents() {
    const footerHTML = `
    <div style="background: #2D3748; color: white; padding: 60px 20px; border-top: 5px solid #FF8C42; margin-top: 50px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <div style="margin-bottom: 20px;">
                <img src="/images/adil.jpeg" alt="Adil BK" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid #FF8C42; object-fit: cover;">
            </div>
            <h3 style="color: #FF8C42; font-size: 1.8rem; margin-bottom: 10px;">Adil BK</h3>
            <p>Éducateur spécialisé | OFPPT CFJ AL KARIA SALE</p>
            <div style="margin-top: 30px; display: flex; justify-content: center; gap: 20px;">
               <a href="https://www.instagram.com/adil___bour" style="color: white; text-decoration: none;">Instagram</a>
               <a href="mailto:adilbourkabi72@gmail.com" style="color: white; text-decoration: none;">Email</a>
            </div>
            <div style="margin-top: 40px; font-size: 0.8rem; color: #A0AEC0;">
                &copy; 2026 AdilLab. Tous droits réservés.
            </div>
        </div>
    </div>
    `;
    const footerElement = document.getElementById('global-footer');
    if (footerElement) footerElement.innerHTML = footerHTML;
}
document.addEventListener('DOMContentLoaded', loadGlobalComponents);