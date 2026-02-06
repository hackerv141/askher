// Get elements
const screen404 = document.getElementById('screen404');
const valentineScreen = document.getElementById('valentineScreen');
const refreshBtn = document.getElementById('refreshBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const emoji = document.getElementById('emoji');
const messageDiv = document.getElementById('message');
const buttonContainer = document.querySelector('.button-container');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

// State variables
let noClickCount = 0;
let gradientIndex = 1;
const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5', 'gradient-6', 'gradient-7'];

// Set canvas size
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Refresh button - transition to Valentine screen
refreshBtn.addEventListener('click', function() {
    screen404.classList.remove('active');
    setTimeout(() => {
        valentineScreen.classList.add('active');
    }, 500);
});

// YES button handler
yesBtn.addEventListener('click', function() {
    // Show message
    messageDiv.textContent = `By clicking YES you agree to:

💕 Unlimited cuddles & warm hugs
💖 Lifetime supply of sweet kisses
🧸 Endless teddy bear snuggles
🍕 Mutual pizza & ice cream dates
💝 Being adorably cheesy together

Effective immediately & forever! 😍✨`;
    
    messageDiv.classList.add('show');
    
    // Hide buttons after 1 second
    setTimeout(() => {
        buttonContainer.classList.add('hide');
    }, 1000);
    
    // Start confetti and hearts
    startConfetti();
    createHeartExplosion();
    
    // Stop confetti after 5 seconds
    setTimeout(() => {
        stopConfetti();
    }, 5000);
});

// NO button handler
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    noClickCount++;
    
    // Make button jump to random position
    makeButtonJump();
    
    // Change gradient background
    changeGradient();
    
    // Change emoji after 2 clicks
    if (noClickCount === 2) {
        emoji.textContent = '😭';
    }
});

// Make NO button jump to random position (mobile-friendly)
function makeButtonJump() {
    noBtn.classList.add('jumping');
    
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Change gradient background
function changeGradient() {
    document.body.classList.remove(...gradients);
    gradientIndex = (gradientIndex % gradients.length) + 1;
    document.body.classList.add(gradients[gradientIndex - 1]);
}

// Confetti effect
let confettiParticles = [];
let confettiAnimationId = null;

class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }
    
    randomColor() {
        const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff6b9d', '#ff85a2', '#ffa6c9', '#ff80bf'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > confettiCanvas.height) {
            this.y = -10;
            this.x = Math.random() * confettiCanvas.width;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function startConfetti() {
    // Create confetti particles (reduced for mobile performance)
    const particleCount = window.innerWidth < 768 ? 75 : 150;
    for (let i = 0; i < particleCount; i++) {
        confettiParticles.push(new Confetti());
    }
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    confettiAnimationId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }
    
    // Fade out confetti
    let fadeOut = setInterval(() => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        if (confettiParticles.length > 0) {
            confettiParticles.pop();
        } else {
            clearInterval(fadeOut);
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    }, 50);
}

// Prevent accidental zoom on double-tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Initialize gradient
document.body.classList.add('gradient-1');

// Heart explosion effect
function createHeartExplosion() {
    const hearts = ['💕', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '💝', '🤍'];
    const teddies = ['🧸', '🐻'];
    const numHearts = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < numHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            const isTeddy = Math.random() < 0.2; // 20% chance of teddy
            heart.textContent = isTeddy ? teddies[Math.floor(Math.random() * teddies.length)] : hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = '50%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            heart.style.animation = `floatHeart ${3 + Math.random() * 2}s ease-out forwards`;
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 50);
    }
}

// Add more floating hearts dynamically
function createFloatingHearts() {
    setInterval(() => {
        if (valentineScreen.classList.contains('active')) {
            const heart = document.createElement('div');
            const symbols = ['💕', '💖', '💗', '🧸', '✨', '💘'];
            heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1';
            heart.style.animation = `floatHeart ${8 + Math.random() * 4}s linear forwards`;
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 12000);
        }
    }, 2000);
}

createFloatingHearts();
