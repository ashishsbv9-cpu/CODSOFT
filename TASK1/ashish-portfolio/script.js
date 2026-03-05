document.addEventListener("DOMContentLoaded", function () {

    /* ================= TYPING ANIMATION ================= */

    const roles = [
        "Aspiring Software Developer",
        "DSA Enthusiast",
        "Embedded Systems Explorer",
        "Frontend Developer",
        "Aurduino Hobbyist",
        "ESP32 Tinkerer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
   const typingElement = document.getElementById("typing");
    console.log(typingElement);
if (typingElement) {

    function typeEffect() {
        let currentRole = roles[roleIndex];

        if (!isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                setTimeout(() => isDeleting = true, 1200);
            }
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();
}


/* ================= CANVAS BACKGROUND ================= */
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");

    // Set canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize fix
    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Logo paths
    const logoSources = [
        "assets/python.png",
        "assets/java.png",
        "assets/html.png",
        "assets/css.png",
        "assets/js.png",
        "assets/node.png",
        "assets/react.png",
        "assets/arduino.png"
    ];

    // Load images
    let logos = logoSources.map(src => {
        let img = new Image();
        img.src = src;
        return img;
    });

    // Mouse object
    let mouse = {
        x: null,
        y: null,
        radius: 120
    };

    window.addEventListener("mousemove", function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener("mouseout", function () {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Class
    class Particle {
        constructor() {
            this.size = 45;

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            // Smooth slow movement
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 1;

            this.logo = logos[Math.floor(Math.random() * logos.length)];
        }

        update() {

            // Normal floating movement
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around instead of bounce
            if (this.x > canvas.width) {
                this.x = -this.size;
            }

            if (this.x < -this.size) {
                this.x = canvas.width;
            }

            if (this.y > canvas.height) {
                this.y = -this.size;
            }

            if (this.y < -this.size) {
                this.y = canvas.height;
            }

            // Mouse repel interaction
            if (mouse.x !== null && mouse.y !== null) {

                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;

                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius && distance > 0) {

                    let force = (mouse.radius - distance) / mouse.radius;

                    let directionX = dx / distance;
                    let directionY = dy / distance;

                    this.x += directionX * force * 8;
                    this.y += directionY * force * 8;
                }
            }
        }

        draw() {
            ctx.drawImage(this.logo, this.x, this.y, this.size, this.size);
        }
    }

    // Create particles
    let particles = [];

    function init() {
        particles = [];
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    init();
    animate();
});