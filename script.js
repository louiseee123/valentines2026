// Create floating hearts in the background
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const colors = ['#ff4081', '#d32f75', '#ff79a6', '#ffafbd', '#ffc3a0'];
    
    // Create initial hearts
    for (let i = 0; i < 25; i++) {
        createHeart(heartsContainer, colors);
    }
    
    // Add new hearts periodically
    setInterval(() => {
        if (document.hasFocus()) { // Only create hearts when page is active
            createHeart(heartsContainer, colors);
        }
    }, 1500);
}

function createHeart(container, colors) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random properties for each heart
    const size = Math.random() * 20 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.5 + 0.3;
    
    // Apply styles
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.backgroundColor = color;
    heart.style.left = `${left}vw`;
    heart.style.top = '100vh';
    heart.style.opacity = opacity;
    
    // Add before and after pseudo-element styles
    heart.style.setProperty('--heart-color', color);
    
    // Add to container
    container.appendChild(heart);
    
    // Animate heart floating up
    heart.animate([
        { transform: `translateY(0) rotate(45deg)`, opacity: opacity },
        { transform: `translateY(-100vh) rotate(45deg)`, opacity: 0 }
    ], {
        duration: animationDuration * 1000,
        easing: 'linear'
    });
    
    // Remove heart after animation completes
    setTimeout(() => {
        if (heart.parentNode === container) {
            container.removeChild(heart);
        }
    }, animationDuration * 1000);
}

// Valentine's Day countdown
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let valentineDate = new Date(currentYear, 1, 14); // February 14
    
    // If Valentine's Day has passed this year, set it to next year
    if (now > valentineDate) {
        valentineDate = new Date(currentYear + 1, 1, 14);
    }
    
    const diff = valentineDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Interactive heart click effect
function setupInteractiveHeart() {
    const mainHeart = document.getElementById('mainHeart');
    const valentineQuestion = document.getElementById('valentineQuestion');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Click on the big heart
    mainHeart.addEventListener('click', function() {
        // Create burst of hearts
        createHeartBurst();
        
        // Change question text temporarily
        const originalText = valentineQuestion.textContent;
        valentineQuestion.textContent = "You have my heart already! 💖";
        valentineQuestion.style.color = "#ff4081";
        
        setTimeout(() => {
            valentineQuestion.textContent = originalText;
            valentineQuestion.style.color = "";
        }, 2000);
    });
    
    // Yes button click
    yesBtn.addEventListener('click', function() {
        valentineQuestion.textContent = "Yay! You've made me the happiest! 💝";
        valentineQuestion.style.color = "#4CAF50";
        valentineQuestion.style.fontSize = "2.8rem";

        // Play romantic music
        const music = document.getElementById('romanticMusic');
        music.volume = 0.3; // Set volume to 30%
        music.play().catch(e => console.log('Audio play failed:', e));

        // Background flash effect
        backgroundFlash();

        // Screen shake effect
        screenShake();

        // Create celebration effect
        createCelebration();

        // Create confetti effect
        createConfetti();

        // Create fireworks effect
        createFireworks();

        // Disable buttons after response
        yesBtn.disabled = true;
        noBtn.disabled = true;
        yesBtn.textContent = "💖 Yes! 💖";
        noBtn.textContent = "She said YES!";

        // Show a sweet message after a delay
        setTimeout(() => {
            const message = document.createElement('div');
            message.style.cssText = `
                background: linear-gradient(135deg, #4CAF50, #8BC34A);
                color: white;
                padding: 20px;
                border-radius: 15px;
                margin-top: 30px;
                font-size: 1.4rem;
                animation: pulse 2s infinite;
            `;
            message.innerHTML = "I can't wait to spend Valentine's Day with you! Get ready for a surprise! 🎁";
            document.querySelector('.valentine-question').appendChild(message);
        }, 1000);
    });
    
    // No button hover effect (moves away from cursor)
    noBtn.addEventListener('mouseover', function() {
        // Move button to random position
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
        noBtn.style.transition = 'left 0.3s, top 0.3s';
    });
    
    // Click on no button
    noBtn.addEventListener('click', function() {
        // Move button to random position
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
        noBtn.style.transition = 'left 0.3s, top 0.3s';

        valentineQuestion.textContent = "Please reconsider! 🥺";
        valentineQuestion.style.color = "#f44336";

        // Reset after a delay
        setTimeout(() => {
            valentineQuestion.textContent = "Will you be my Valentine?";
            valentineQuestion.style.color = "";
        }, 2000);
    });
}

// Create heart burst effect
function createHeartBurst() {
    const container = document.querySelector('.interactive-heart');
    const colors = ['#ff4081', '#d32f75', '#ff79a6'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        const size = Math.random() * 15 + 8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.backgroundColor = color;
        heart.style.position = 'absolute';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.opacity = '0.9';
        heart.style.zIndex = '10';
        
        container.appendChild(heart);
        
        // Random direction for burst
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Animate the burst
        heart.animate([
            { 
                transform: 'translate(-50%, -50%) rotate(45deg) scale(1)', 
                opacity: 0.9 
            },
            { 
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(45deg) scale(0.5)`, 
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode === container) {
                container.removeChild(heart);
            }
        }, 1000);
    }
}

// Create celebration effect for "Yes" response
function createCelebration() {
    // Create confetti-like hearts
    const container = document.getElementById('heartsContainer');
    const colors = ['#ff4081', '#4CAF50', '#FFC107', '#2196F3', '#9C27B0'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');

            const size = Math.random() * 25 + 10;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;

            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.setProperty('--heart-color', color);
            heart.style.left = `${left}vw`;
            heart.style.top = '0';
            heart.style.opacity = '0.9';
            heart.style.zIndex = '100';

            container.appendChild(heart);

            // Fall with slight horizontal movement
            const xMovement = (Math.random() - 0.5) * 100;

            heart.animate([
                {
                    transform: `translate(0, 0) rotate(45deg)`,
                    opacity: 0.9
                },
                {
                    transform: `translate(${xMovement}px, 100vh) rotate(45deg)`,
                    opacity: 0
                }
            ], {
                duration: Math.random() * 2000 + 3000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });

            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode === container) {
                    container.removeChild(heart);
                }
            }, 5000);
        }, i * 15);
    }
}

// Create confetti effect
function createConfetti() {
    const container = document.getElementById('heartsContainer');
    const colors = ['#ff4081', '#4CAF50', '#FFC107', '#2196F3', '#9C27B0', '#FF5722', '#9C27B0'];

    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;

            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}vw`;
            confetti.style.top = '0';
            confetti.style.opacity = '0.8';
            confetti.style.zIndex = '100';

            container.appendChild(confetti);

            // Fall with rotation
            const rotation = Math.random() * 360;
            const xMovement = (Math.random() - 0.5) * 200;

            confetti.animate([
                {
                    transform: `translate(0, 0) rotate(0deg)`,
                    opacity: 0.8
                },
                {
                    transform: `translate(${xMovement}px, 100vh) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'ease-out'
            });

            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode === container) {
                    container.removeChild(confetti);
                }
            }, 5000);
        }, i * 10);
    }
}

// Create fireworks effect
function createFireworks() {
    const container = document.getElementById('heartsContainer');
    const colors = ['#ff4081', '#4CAF50', '#FFC107', '#2196F3', '#9C27B0', '#FF5722'];

    for (let burst = 0; burst < 5; burst++) {
        setTimeout(() => {
            const burstX = Math.random() * window.innerWidth;
            const burstY = Math.random() * (window.innerHeight / 2);

            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('firework-particle');

                const size = Math.random() * 8 + 4;
                const color = colors[Math.floor(Math.random() * colors.length)];

                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.backgroundColor = color;
                particle.style.left = `${burstX}px`;
                particle.style.top = `${burstY}px`;
                particle.style.opacity = '1';
                particle.style.zIndex = '200';

                container.appendChild(particle);

                // Burst in all directions
                const angle = (Math.PI * 2 * i) / 30;
                const distance = Math.random() * 200 + 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                particle.animate([
                    {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 1
                    },
                    {
                        transform: `translate(${x}px, ${y}px) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 2000,
                    easing: 'ease-out'
                });

                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode === container) {
                        container.removeChild(particle);
                    }
                }, 2000);
            }
        }, burst * 500);
    }
}

// Screen shake effect
function screenShake() {
    const body = document.body;
    body.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        body.style.animation = '';
    }, 500);
}

// Background flash effect
function backgroundFlash() {
    const body = document.body;
    const originalBg = body.style.background;
    body.style.background = 'linear-gradient(135deg, #FFD700, #FF69B4)';
    setTimeout(() => {
        body.style.background = originalBg;
    }, 300);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts in background
    createFloatingHearts();
    
    // Set up countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Set up interactive elements
    setupInteractiveHeart();
    
    // Add a sweet message in the console
    console.log("%c💝 For the most amazing person in my life 💝", "color: #ff4081; font-size: 18px; font-weight: bold;");
    console.log("%cThis Valentine's Day, I choose you. Today, tomorrow, and always.", "color: #d32f75; font-size: 14px;");
});