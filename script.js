document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    // Mengubah background navbar saat user scroll ke bawah
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation (Intersection Observer)
    // Memunculkan elemen saat masuk ke layar (viewport)
    const observerOptions = {
        threshold: 0.1, // Elemen muncul saat 10% terlihat
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to save performance
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));


    // 3. 3D Tilt Effect (Efek Kartu Miring)
    // Kartu akan mengikuti gerakan mouse
    const tiltElements = document.querySelectorAll('.tilt-element');

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Menghitung posisi mouse relatif terhadap kartu
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            // Mencari titik tengah kartu
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Kalkulasi rotasi (pembagi '20' menentukan sensitivitas)
            const rotateX = ((y - centerY) / 20) * -1; // Invert axis
            const rotateY = (x - centerX) / 20;

            // Terapkan transformasi CSS
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        // Reset posisi saat mouse keluar
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease'; // Smooth reset
        });

        // Hapus transisi saat mouse masuk agar gerakan responsif (tidak lag)
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
});
