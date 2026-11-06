
// ------------------------------------
// SCREEN NAVIGATION
// ------------------------------------

const screens = document.querySelectorAll(".screen");

function showScreen(screenId) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ------------------------------------
// BACKGROUND MUSIC
// ------------------------------------

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");

let musicPlaying = false;

musicButton.addEventListener("click", async () => {

    if (!musicPlaying) {

        try {

            await backgroundMusic.play();

            musicPlaying = true;
            musicIcon.textContent = "♫";
            musicLabel.textContent = "Music On";

        } catch (error) {

            musicLabel.textContent = "Check MP3";

            console.error("Music could not play:", error);

        }

    } else {

        backgroundMusic.pause();

        musicPlaying = false;
        musicIcon.textContent = "♪";
        musicLabel.textContent = "Play Music";

    }

});


// ------------------------------------
// SCREEN 1: OPEN ENVELOPE
// ------------------------------------

const envelope = document.getElementById("envelope");
const envelopeCaption = document.getElementById("envelopeCaption");

envelope.addEventListener("click", () => {

    envelopeCaption.textContent = "Your surprise is waiting... 💗";

    createConfetti(30);

    setTimeout(() => {
        showScreen("balloonSection");
    }, 1000);

});


// ------------------------------------
// SCREEN 2: POP BALLOONS
// ------------------------------------

const balloons = document.querySelectorAll(".balloon");
const messageBox = document.getElementById("messageBox");
const balloonCounter = document.getElementById("balloonCounter");
const letterButton = document.getElementById("letterButton");

let poppedCount = 0;

balloons.forEach(balloon => {

    balloon.addEventListener("click", () => {

        if (balloon.classList.contains("popped")) {
            return;
        }

        balloon.classList.add("popped");

        messageBox.textContent = balloon.dataset.message;

        poppedCount++;

        balloonCounter.textContent =
            `${poppedCount} / 5 balloons popped`;

        createConfetti(12);

        if (poppedCount === 5) {

            messageBox.textContent =
                "You have opened all my little messages! ❤️";

            letterButton.disabled = false;

            letterButton.textContent =
                "Read My Letter 💌";

            createConfetti(50);

        }

    });

});


// ------------------------------------
// GO TO LETTER
// ------------------------------------

letterButton.addEventListener("click", () => {

    if (poppedCount === 5) {
        showScreen("letterSection");
    }

});


// ------------------------------------
// GO TO CAKE
// ------------------------------------

const cakeButton = document.getElementById("cakeButton");

cakeButton.addEventListener("click", () => {
    showScreen("cakeSection");
});


// ------------------------------------
// CREATE 19 CANDLES
// ------------------------------------

const candlesContainer = document.getElementById("candles");

for (let i = 0; i < 19; i++) {

    const candle = document.createElement("div");

    candle.className = "candle";

    const row = Math.floor(i / 7);
    const column = i % 7;

    candle.style.left = (30 + column * 42) + "px";
    candle.style.top = (row * 15) + "px";

    const flame = document.createElement("div");

    flame.className = "flame";

    candle.appendChild(flame);

    candlesContainer.appendChild(candle);

}


// ------------------------------------
// BLOW OUT CANDLES
// ------------------------------------

const blowButton = document.getElementById("blowButton");
const cutButton = document.getElementById("cutButton");
const cakeInstruction = document.getElementById("cakeInstruction");
const cakeSection = document.getElementById("cakeSection");

let candlesBlown = false;

blowButton.addEventListener("click", () => {

    if (candlesBlown) {
        return;
    }

    candlesBlown = true;

    candlesContainer.classList.add("blown");

    blowButton.disabled = true;
    cutButton.disabled = false;

    cakeInstruction.textContent =
        "Your wish is on its way to come true! ✨❤️";

    createConfetti(50);

});


// ------------------------------------
// CUT THE CAKE
// ------------------------------------

const cakeCelebration = document.getElementById("cakeCelebration");

let cakeCut = false;

cutButton.addEventListener("click", () => {

    if (!candlesBlown || cakeCut) {
        return;
    }

    cakeCut = true;

    cakeSection.classList.add("cutting");

    cutButton.disabled = true;

    cakeInstruction.textContent =
        "A special slice just for you, Igl! 🎂❤️";

    setTimeout(() => {

        cakeInstruction.textContent =
            "The cake is ready! Happy Birthday, Igl! ❤️";

        cakeCelebration.hidden = false;

        createConfetti(150);

        // Start fireworks when the birthday celebration appears.
        createFireworks();

    }, 2300);

});


// ------------------------------------
// SURPRISE GIFT BOX
// ------------------------------------

const giftButton = document.getElementById("giftButton");
const giftEmoji = document.getElementById("giftEmoji");
const giftMessage = document.getElementById("giftMessage");

giftButton.addEventListener("click", () => {

    if (!giftMessage.hidden) {
        return;
    }

    giftEmoji.textContent = "💝";

    giftButton.disabled = true;

    giftButton.querySelector("small").textContent =
        "Your special gift is open! ❤️";

    giftMessage.hidden = false;

    createConfetti(80);

    createFireworks();

});


// ------------------------------------
// FIREWORKS
// ------------------------------------

function createFireworks() {

    const colors = [
        "#ff6b9d",
        "#ffd166",
        "#c084fc",
        "#ff8c69",
        "#ffffff",
        "#7dd3fc"
    ];

    const positions = [
        [20, 25],
        [75, 20],
        [50, 35],
        [30, 55],
        [80, 60]
    ];

    positions.forEach(([x, y], index) => {

        setTimeout(() => {

            for (let i = 0; i < 35; i++) {

                const particle = document.createElement("span");

                particle.className = "firework-particle";

                particle.style.left = x + "vw";
                particle.style.top = y + "vh";

                particle.style.background =
                    colors[Math.floor(Math.random() * colors.length)];

                const angle = (Math.PI * 2 * i) / 35;

                const distance = 50 + Math.random() * 100;

                particle.style.setProperty(
                    "--move-x",
                    Math.cos(angle) * distance + "px"
                );

                particle.style.setProperty(
                    "--move-y",
                    Math.sin(angle) * distance + "px"
                );

                document.body.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, 1600);

            }

        }, index * 300);

    });

}


// ------------------------------------
// CELEBRATE AGAIN
// ------------------------------------

const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", () => {

    cakeSection.classList.remove("cutting");

    candlesContainer.classList.remove("blown");

    cakeCelebration.hidden = true;

    // Reset gift
    giftMessage.hidden = true;
    giftEmoji.textContent = "🎁";
    giftButton.disabled = false;

    giftButton.querySelector("small").textContent =
        "Open Your Gift";

    // Reset balloons
    balloons.forEach(balloon => {
        balloon.classList.remove("popped");
    });

    poppedCount = 0;

    balloonCounter.textContent = "0 / 5 balloons popped";

    messageBox.textContent =
        "Your special message will appear here 💌";

    letterButton.disabled = true;

    // Reset cake
    candlesBlown = false;
    cakeCut = false;

    blowButton.disabled = false;
    cutButton.disabled = true;

    cakeInstruction.textContent =
        "First, close your eyes and make a beautiful wish! 🥹";

    showScreen("welcome");

});


// ------------------------------------
// CONFETTI EFFECT
// ------------------------------------

function createConfetti(amount) {

    const colors = [
        "#f28eae",
        "#f8c5d5",
        "#e8b4c8",
        "#d9a7f0",
        "#ffd27f",
        "#ffffff"
    ];

    for (let i = 0; i < amount; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        confetti.style.animationDelay =
            Math.random() * 0.5 + "s";

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6000);

    }

}


// ------------------------------------
// FLOATING HEARTS
// ------------------------------------

const floatingHearts = document.getElementById("floatingHearts");

function createFloatingHeart() {

    const heart = document.createElement("span");

    heart.className = "heart-particle";

    heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (12 + Math.random() * 22) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 7) + "s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 14000);

}

setInterval(createFloatingHeart, 700);


// ------------------------------------
// FALLING ROSE PETALS
// ------------------------------------

const petalContainer = document.getElementById("petalContainer");

function createPetal() {

    const petal = document.createElement("span");

    petal.className = "petal";

    petal.textContent = Math.random() > 0.5 ? "🌸" : "🌷";

    petal.style.left = Math.random() * 100 + "vw";

    petal.style.fontSize =
        (12 + Math.random() * 12) + "px";

    petal.style.animationDuration =
        (7 + Math.random() * 6) + "s";

    petalContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 14000);

}

setInterval(createPetal, 1200);
