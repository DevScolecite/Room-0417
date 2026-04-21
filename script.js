// --- GLOBAL VARIABLES ---
let wrongAttempts = 0;
const music = document.getElementById('bg-music');
let fadePoint = 0.6; 
let fadeInInterval;
let fadeOutInterval;

// --- ICON WIGGLE LOGIC (GSAP) ---
function startIconWiggles() {
    const icons = document.querySelectorAll('.icon-item');
    icons.forEach((icon) => {
        gsap.to(icon, {
            x: "random(-3, 3)",
            y: "random(-3, 3)",
            rotation: "random(-2, 2)",
            duration: "random(2, 4)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            repeatRefresh: true
        });
    });
}

function startIceCreamWiggle() {
    const iceCream = document.getElementById('ice-cream-trigger');
    if (!iceCream) return;
    gsap.to(iceCream, {
        x: "random(-8, 8)",
        y: "random(-8, 8)",
        rotation: "random(-10, 10)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true
    });
}

// --- HIRONO OVERLAY LOGIC ---
function showHirono() {
    const overlay = document.getElementById('hirono-overlay');
    if (overlay) {
        overlay.classList.add('active');
        if (music) {
            clearInterval(fadeOutInterval);
            music.currentTime = 0; 
            music.volume = 0;
            music.play().then(() => {
                clearInterval(fadeInInterval);
                fadeInInterval = setInterval(() => {
                    if (music.volume < fadePoint) {
                        let newVol = Math.min(music.volume + 0.05, fadePoint);
                        music.volume = parseFloat(newVol.toFixed(2));
                    } else {
                        clearInterval(fadeInInterval);
                    }
                }, 100);
            }).catch(e => console.log("Playback interaction required"));
        }
    }
}

function closeHirono() {
    const overlay = document.getElementById('hirono-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        if (music) {
            clearInterval(fadeInInterval);
            clearInterval(fadeOutInterval);
            fadeOutInterval = setInterval(() => {
                if (music.volume > 0.05) {
                    let newVol = Math.max(music.volume - 0.05, 0);
                    music.volume = parseFloat(newVol.toFixed(2));
                } else {
                    music.pause();
                    music.volume = 0;
                    clearInterval(fadeOutInterval);
                }
            }, 50); 
        }
    }
}

// --- PAGE TRANSITIONS ---
function openLetter() {
    const envelope = document.querySelector('.envelope');
    const p1 = document.getElementById('page-1');
    const p2 = document.getElementById('page-2');

    if (!envelope) return;
    envelope.classList.add('open');

    setTimeout(() => {
        p1.style.opacity = '0';
        setTimeout(() => {
            p1.classList.add('hidden');
            p2.classList.remove('hidden');
            p2.style.display = 'flex';
            setTimeout(() => {
                p2.classList.add('animate-text');
                p2.style.opacity = '1';
            }, 100);
        }, 600); 
    }, 800); 
}

function goToLobby(event) {
    if (event) event.preventDefault();
    const curtain = document.getElementById('transition-curtain');
    const p2 = document.getElementById('page-2');
    const passcodeScreen = document.getElementById('passcode-screen');

    curtain.style.opacity = '1';
    curtain.style.pointerEvents = 'auto';

    setTimeout(() => {
        p2.classList.add('hidden');
        p2.style.display = 'none';
        passcodeScreen.classList.remove('hidden');
        passcodeScreen.style.display = 'flex';
        passcodeScreen.style.opacity = '1';

        setTimeout(() => {
            curtain.style.opacity = '0';
            curtain.style.pointerEvents = 'none';
        }, 400); 
    }, 500); 
}

// --- PASSCODE LOGIC ---
const passcodeInput = document.getElementById('passcode-input');
if (passcodeInput) {
    passcodeInput.addEventListener('input', function(e) {
        const code = e.target.value;
        const errorMsg = document.getElementById('error-message');
        const fineMsg = document.getElementById('fine-message');
        const successMsg = document.getElementById('success-message');
        const inputWrapper = document.querySelector('.input-wrapper');
        const hint = document.querySelector('.passcode-hint');
        const container = document.querySelector('.passcode-container');

        if (code === '0530') { 
            if(hint) hint.classList.add('hidden');
            if(inputWrapper) inputWrapper.classList.add('hidden');
            if(errorMsg) errorMsg.classList.add('hidden');
            if(fineMsg) fineMsg.classList.add('hidden');
            
            if(successMsg) {
                successMsg.classList.remove('hidden');
                successMsg.style.display = 'block';
                successMsg.style.opacity = '1';
            }

            const petalCont = document.getElementById('petal-container');
            if(petalCont) petalCont.style.display = 'block';
            shootAdvancePetals(); 

            setTimeout(() => {
                unlockLobby(); 
            }, 3500); 
        }
        else if (code.length === 4) {
            wrongAttempts++; 
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 400);

            if (wrongAttempts >= 5) {
                fineMsg.classList.remove('hidden');
                errorMsg.classList.add('hidden'); 
            } else {
                errorMsg.classList.remove('hidden');
            }
            setTimeout(() => { e.target.value = ''; }, 600);
        }
    });
}

// --- INDEPENDENT SMOOTH WIGGLES ---
function startIconWiggles() {
    // Target only the IMG tags so the text labels stay still
    const iconImages = document.querySelectorAll('.icon-item img');
    
    iconImages.forEach((img, index) => {
        // Different delay and different duration for every single image
        const staggeredDelay = (index * 0.7) + Math.random();
        const smoothSpeed = 2 + Math.random() * 2; // Random speed between 2s and 4s

        gsap.to(img, {
            x: "random(-6, 6)",
            y: "random(-4, 4)",
            rotation: "random(-5, 5)",
            duration: smoothSpeed, 
            ease: "sine.inOut", // Changed from 'steps' to 'sine' for high FPS smoothness
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
            delay: staggeredDelay 
        });
    });
}

function startIceCreamWiggle() {
    const iceCreamImg = document.querySelector('#ice-cream-trigger img');
    if (!iceCreamImg) return;
    
    gsap.to(iceCreamImg, {
        x: "random(-10, 10)",
        y: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: 2.5,
        ease: "sine.inOut", // Smooth movement
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        delay: 0.5
    });
}


// --- UPDATED UNLOCK LOBBY ---
// --- YOUR UNLOCK LOBBY (Keep this as is) ---
function unlockLobby() {
    const ps = document.getElementById('passcode-screen');
    const p3 = document.getElementById('page-3');
    const curtain = document.getElementById('transition-curtain');
    const iceCream = document.getElementById('ice-cream-trigger');

    if (curtain) {
        curtain.style.display = 'block';
        curtain.style.opacity = '1';
    }

    setTimeout(() => {
        if (ps) ps.classList.add('hidden');
        if (p3) {
            p3.classList.remove('hidden');
            p3.style.display = 'block'; 
            p3.style.opacity = '1';
            p3.scrollTop = 0;
            
            // This now triggers the staggered logic
            startIconWiggles();
        }

        if (iceCream) {
            iceCream.setAttribute('style', 'display: block !important; opacity: 1 !important; visibility: visible !important;');
            startIceCreamWiggle();
        }

        setTimeout(() => {
            if (curtain) curtain.style.opacity = '0';
            setTimeout(() => { if(curtain) curtain.style.display = 'none'; }, 300);
        }, 300); 
    }, 600); 
}

// --- OVERLAYS ---
function openMessage() {
    const overlay = document.getElementById('paper-overlay');
    if (overlay) overlay.classList.add('active');
}

function closeMessage() {
    const overlay = document.getElementById('paper-overlay');
    if (overlay) overlay.classList.remove('active');
}

function showBouquet() {
    const overlay = document.getElementById('flower-overlay');
    if (overlay) {
        overlay.style.display = 'flex'; 
        setTimeout(() => overlay.classList.add('active'), 10);
    }
}

function closeFlowers() {
    const overlay = document.getElementById('flower-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.style.display = 'none', 300);
    }
}

// --- SCROLL REVEAL ---
const interactivePage = document.querySelector('.interactive-page');
if (interactivePage) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icons = entry.target.querySelectorAll('.icon-item');
                icons.forEach((icon, index) => {
                    setTimeout(() => icon.classList.add('reveal'), index * 150); 
                });
            }
        });
    }, { threshold: 0.1 });
    observer.observe(interactivePage);
}

// --- EFFECTS & PETALS ---
function shootAdvancePetals() {
    const container = document.getElementById('petal-container');
    if (!container) return;
    const petalCount = 150; 
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.classList.add('sunflower-petal');
            container.appendChild(petal);
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight + 80; 
            const angle = (Math.PI / 3) + (Math.random() * (Math.PI / 3)); 
            const velocity = 15 + Math.random() * 7; 
            const gravity = 0.3; 
            const lateralDrift = (Math.random() - 0.5) * 2;
            let posX = startX, posY = startY;
            let vx = -Math.cos(angle) * velocity, vy = -Math.sin(angle) * velocity; 
            let rotation = Math.random() * 360, rotationSpeed = (Math.random() - 0.5) * 10;
            let opacity = 1;

            function animate() {
                vy += gravity;      
                posX += vx + lateralDrift;
                posY += vy;
                rotation += rotationSpeed;
                petal.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;
                petal.style.opacity = opacity;
                if (vy > 0) { opacity -= 0.008; }
                if (opacity > 0 && posY < window.innerHeight + 100) {
                    requestAnimationFrame(animate);
                } else {
                    petal.remove();
                }
            }
            requestAnimationFrame(animate);
        }, i * 10); 
    }
}

// --- ICE CREAM MODAL ---
function openIceCreamModal() {
    const modal = document.getElementById('ice-cream-modal');
    if (modal) {
        modal.style.display = 'flex';
        // Updated selector to .receipt-card
        gsap.fromTo(".receipt-card", 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
    }
}


function closeIceCreamModal() {
    const modal = document.getElementById('ice-cream-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}
function applyReceiptRidges() {
    const card = document.querySelector('.receipt-card');
    if (!card) return;

    const ridges = 30; // Number of "teeth"
    const step = 100 / ridges;
    let topPath = "";
    let bottomPath = "";

    for (let i = 0; i <= ridges; i++) {
        const x = i * step;
        // Top edge: Zigzag between 0% and 3%
        const yTop = (i % 2 === 0) ? 0 : 3;
        topPath += `${x}% ${yTop}%, `;

        // Bottom edge: Zigzag between 100% and 97%
        // We add this to the start of the bottom string to wrap the polygon correctly
        const yBottom = (i % 2 === 0) ? 100 : 97;
        bottomPath = `${x}% ${yBottom}%, ` + bottomPath;
    }

    // Combine paths and remove the trailing comma
    const finalPath = `polygon(${topPath}${bottomPath.slice(0, -2)})`;
    card.style.clipPath = finalPath;
}

// Ensure it runs when you open the modal
function openIceCreamModal() {
    const modal = document.getElementById('ice-cream-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Trigger the ridge generation
        applyReceiptRidges();

        gsap.fromTo(".receipt-card", 
            { y: 100, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
    }
}
