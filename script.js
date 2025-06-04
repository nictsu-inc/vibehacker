// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Animate loading bar
    setTimeout(() => {
        loadingProgress.style.width = '100%';
    }, 100);
    
    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
    }, 2500);
});

// Particle System
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = Math.random() > 0.5 ? '#ff00ff' : '#00ffff';
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Initialize particles
resizeCanvas();
initParticles();
animateParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Random glitch effect for title
const glitchTitle = document.querySelector('.glitch-title');
let glitchInterval;

function startGlitch() {
    glitchInterval = setInterval(() => {
        glitchTitle.style.textShadow = `
            0 0 ${Math.random() * 20 + 10}px #ff00ff,
            0 0 ${Math.random() * 30 + 20}px #ff00ff,
            0 0 ${Math.random() * 40 + 30}px #ff00ff,
            0 0 ${Math.random() * 50 + 40}px #00ffff,
            0 0 ${Math.random() * 80 + 70}px #00ffff,
            0 0 ${Math.random() * 90 + 80}px #00ffff
        `;
    }, 100);
}

function stopGlitch() {
    clearInterval(glitchInterval);
    glitchTitle.style.textShadow = `
        0 0 10px #ff00ff,
        0 0 20px #ff00ff,
        0 0 30px #ff00ff,
        0 0 40px #00ffff,
        0 0 70px #00ffff,
        0 0 80px #00ffff
    `;
}

// Add glitch on hover
glitchTitle.addEventListener('mouseenter', startGlitch);
glitchTitle.addEventListener('mouseleave', stopGlitch);

// Merch button functionality
const merchButton = document.querySelector('.merch-button');
merchButton.addEventListener('click', () => {
    // Add glitch effect
    merchButton.classList.add('glitching');
    
    // Show alert or redirect to merch store
    setTimeout(() => {
        alert('AI HACKING GEAR COMING SOON\n\nNeural networks are being trained...');
        merchButton.classList.remove('glitching');
    }, 500);
});

// Add random screen glitches
function randomGlitch() {
    const elements = ['.glitch-title', '.subtitle', '.description'];
    const randomElement = document.querySelector(elements[Math.floor(Math.random() * elements.length)]);
    
    randomElement.style.animation = 'none';
    setTimeout(() => {
        randomElement.style.animation = '';
    }, 100);
}

// Trigger random glitches occasionally
setInterval(() => {
    if (Math.random() < 0.1) {
        randomGlitch();
    }
}, 3000);

// Keyboard easter eggs
let konamiCode = [];
const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === secretCode.join(',')) {
        document.body.style.animation = 'matrix 2s';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('AI ENHANCEMENT: ACTIVATED\n\nYour hacking skills have been augmented!');
        }, 2000);
    }
    
    // Additional easter eggs
    if (e.key === 'v') {
        document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        setTimeout(() => {
            document.body.style.filter = '';
        }, 500);
    }
});

// Add matrix rain effect style
const style = document.createElement('style');
style.textContent = `
    @keyframes matrix {
        0% { filter: hue-rotate(0deg) saturate(2); }
        100% { filter: hue-rotate(360deg) saturate(2); }
    }
    
    .glitching {
        animation: hardcore-glitch 0.5s ease;
    }
    
    @keyframes hardcore-glitch {
        0%, 100% { transform: translate(0); filter: hue-rotate(0deg); }
        10% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
        20% { transform: translate(5px, -5px); filter: hue-rotate(180deg); }
        30% { transform: translate(-5px, -5px); filter: hue-rotate(270deg); }
        40% { transform: translate(5px, 5px); filter: hue-rotate(360deg); }
        50% { transform: scale(1.1) translate(-2px, 2px); }
        60% { transform: scale(0.9) translate(2px, -2px); }
        70% { transform: translate(-8px, 0); }
        80% { transform: translate(8px, 0); }
        90% { transform: translate(0, 0) scale(1.05); }
    }
`;
document.head.appendChild(style);

// Mouse trail effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create trail particle
    if (Math.random() < 0.1) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = mouseX + 'px';
        trail.style.top = mouseY + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = Math.random() > 0.5 ? '#ff00ff' : '#00ffff';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.boxShadow = `0 0 10px ${trail.style.background}`;
        document.body.appendChild(trail);
        
        // Animate and remove
        trail.animate([
            { opacity: 1, transform: 'scale(1) translate(0, 0)' },
            { opacity: 0, transform: `scale(0) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)` }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => trail.remove();
    }
});

// Stay Tuned Section Interactivity
const stayTuned = document.querySelector('.stay-tuned');
const stayTunedContent = document.querySelector('.stay-tuned-content');

stayTuned.addEventListener('mouseenter', () => {
    stayTunedContent.style.boxShadow = `
        0 0 50px rgba(0, 255, 255, 0.8),
        inset 0 0 30px rgba(255, 0, 255, 0.4),
        0 0 100px rgba(255, 0, 255, 0.3)
    `;
    stayTunedContent.style.transform = 'scale(1.05)';
});

stayTuned.addEventListener('mouseleave', () => {
    stayTunedContent.style.boxShadow = `
        0 0 30px rgba(0, 255, 255, 0.5),
        inset 0 0 20px rgba(255, 0, 255, 0.2)
    `;
    stayTunedContent.style.transform = 'scale(1)';
});

// Add transition to stay tuned content
stayTunedContent.style.transition = 'all 0.3s ease'; 