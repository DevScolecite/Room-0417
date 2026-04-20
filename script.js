// --- GLOBAL VARIABLES ---
let wrongAttempts = 0;

// --- PAGE 1 -> PAGE 2 (Opening the Letter) ---
function openLetter() {
    const envelope = document.querySelector('.envelope');
    const p1 = document.getElementById('page-1');
    const p2 = document.getElementById('page-2');
    const content = document.querySelector('.content');

    envelope.classList.add('open');

    setTimeout(() => {
        p1.style.opacity = '0';
        
        setTimeout(() => {
            p1.classList.add('hidden');
            p2.classList.remove('hidden');
            p2.style.opacity = '1';
            content.classList.add('animate-text');
        }, 600); 
    }, 300); 
}

// --- PAGE 2 -> PASSCODE SCREEN ---
function goToLobby(event) {
    if(event) event.preventDefault();
    const p2 = document.getElementById('page-2');
    const passcodeScreen = document.getElementById('passcode-screen');

    p2.style.opacity = '0';
    setTimeout(() => {
        p2.classList.add('hidden');
        passcodeScreen.classList.remove('hidden');
        passcodeScreen.style.opacity = '1';
        
        const input = document.getElementById('passcode-input');
        if(input) input.focus();
    }, 800);
}

// --- PASSCODE LOGIC ---
document.getElementById('passcode-input').addEventListener('input', function(e) {
    const code = e.target.value;
    const errorMsg = document.getElementById('error-message');
    const fineMsg = document.getElementById('fine-message');
    const successMsg = document.getElementById('success-message');
    const inputWrapper = document.querySelector('.input-wrapper');
    const hint = document.querySelector('.passcode-hint');
    const container = document.querySelector('.passcode-container');

    if (code === '0530') { 
        this.blur();
        if(inputWrapper) inputWrapper.style.display = 'none';
        if(hint) hint.style.display = 'none';
        errorMsg.classList.add('hidden');
        fineMsg.classList.add('hidden');
        successMsg.classList.remove('hidden');

        setTimeout(() => {
            unlockLobby(); 
        }, 2500);
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

        setTimeout(() => {
            e.target.value = '';
        }, 600);
    }
    else {
        errorMsg.classList.add('hidden');
    }
});

// --- FINAL TRANSITION: UNLOCK THE LOBBY ---
function unlockLobby() {
    const ps = document.getElementById('passcode-screen');
    const p3 = document.getElementById('page-3');
    const curtain = document.getElementById('transition-curtain');

    // 1. Bring down the blackout curtain
    curtain.style.opacity = '1';

    setTimeout(() => {
        // 2. Immediate page swap hidden by the curtain
        ps.classList.add('hidden');
        p3.classList.remove('hidden');
        p3.style.display = 'block'; // Ensures it's renderable
        p3.scrollTop = 0;           // Start from the top
        p3.style.opacity = '1';

        // 3. Reveal the Lobby
        setTimeout(() => {
            curtain.style.opacity = '0';
        }, 300); 

    }, 400); 
}
// --- 1. OVERLAY LOGIC (Message & Flowers) ---

function openMessage() {
    const overlay = document.getElementById('paper-overlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function closeMessage() {
    const overlay = document.getElementById('paper-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

function showBouquet() {
    const overlay = document.getElementById('flower-overlay');
    if (overlay) {
        // Force reset the display just in case
        overlay.style.display = 'flex'; 
        // Adding a tiny delay ensures the browser registers the change
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
    }
}

function closeFlowers() {
    const overlay = document.getElementById('flower-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        // Wait for animation to finish before hiding display
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
}



function showHirono() {
    const overlay = document.getElementById('hirono-overlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function closeHirono() {
    const overlay = document.getElementById('hirono-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}



// --- 2. REVEAL ANIMATION (Scroll Logic) ---

const observerOptions = {
    root: null, // Use null to observe based on the phone screen viewport
    threshold: 0.1 // Triggers as soon as 10% of the section is seen
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const icons = entry.target.querySelectorAll('.icon-item');
            icons.forEach((icon, index) => {
                // Add the reveal class with a tiny delay for each icon (staggered)
                setTimeout(() => {
                    icon.classList.add('reveal');
                }, index * 150); 
            });
        }
    });
}, observerOptions);

// Observe the middle section
const interactivePage = document.querySelector('.interactive-page');
if (interactivePage) {
    observer.observe(interactivePage);
}
