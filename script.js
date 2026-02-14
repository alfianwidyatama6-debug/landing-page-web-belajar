/**
 * NexGen Academy - Core Script v2.0
 * Fitur: Navbar Scroll, Scroll Reveal, 3D Tilt, & Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVIGASI SCROLL (Berlaku di Beranda) ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 2. INTERSECTION OBSERVER (Animasi Muncul saat Scroll) ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Berhenti mengamati setelah elemen muncul (opsional)
                // revealObserver.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.fade-in-up, .fade-in-right');
    elementsToReveal.forEach(el => revealObserver.observe(el));


    // --- 3. EFEK 3D TILT (Interaksi Kartu di Hero & Program) ---
    const tiltElements = document.querySelectorAll('.tilt-element');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posisi X mouse di dalam elemen
            const y = e.clientY - rect.top;  // Posisi Y mouse di dalam elemen
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Hitung rotasi (maksimal 10 derajat)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            el.style.transition = 'none'; // Matikan transisi agar smooth saat bergerak
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });


    // --- 4. LOGIKA DASHBOARD (Hanya berjalan di dashboard.html) ---
    const moduleItems = document.querySelectorAll('.module-item');
    const videoTitle = document.getElementById('video-title');
    const videoPlaceholderText = document.querySelector('#main-video span');

    if (moduleItems.length > 0) {
        moduleItems.forEach(item => {
            item.addEventListener('click', () => {
                // Cek apakah materi terkunci
                if (item.innerText.includes('🔒')) {
                    alert("⚠️ Akses Ditolak: Selesaikan materi sebelumnya untuk membuka modul ini.");
                    return;
                }

                // Update UI: Hapus status aktif dari item lain
                moduleItems.forEach(i => i.classList.remove('active'));
                
                // Tambahkan status aktif ke yang diklik
                item.classList.add('active');

                // Update Konten Video (Simulasi)
                const newTitle = item.querySelector('h4') ? item.querySelector('h4').innerText : "Materi Baru";
                
                if (videoTitle) {
                    videoTitle.innerText = newTitle;
                }
                
                if (videoPlaceholderText) {
                    videoPlaceholderText.innerText = `▶️ Sekarang Memutar: ${newTitle}`;
                    // Efek kedip tipis saat ganti video
                    videoPlaceholderText.parentElement.style.opacity = '0.5';
                    setTimeout(() => {
                        videoPlaceholderText.parentElement.style.opacity = '1';
                    }, 200);
                }
            });
        });
    }

    // --- 5. LOGOUT HANDLER ---
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            const confirmLogout = confirm("Apakah Anda yakin ingin keluar dari sesi belajar?");
            if (!confirmLogout) {
                e.preventDefault(); // Batalkan pindah halaman jika klik 'Cancel'
            }
        });
    }

});
