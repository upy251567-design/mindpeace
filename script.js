
/* =========================================================
   A LITTLE PLACE FOR YOU
   Main JavaScript
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const bgMusic = document.getElementById("bgMusic");

const musicControl = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

const enterButton = document.getElementById("enterButton");

const messageNext = document.getElementById("messageNext");
const surpriseNext = document.getElementById("surpriseNext");

const moodCards = document.querySelectorAll(".mood-card");

const responseContainer =
    document.getElementById("responseContainer");

const responseIcon =
    document.getElementById("responseIcon");

const responseMessage =
    document.getElementById("responseMessage");

const sadButton =
    document.getElementById("sadButton");

const smileButton =
    document.getElementById("smileButton");

const finalResponse =
    document.getElementById("finalResponse");

const particlesContainer =
    document.getElementById("particlesContainer");

const mainContent =
    document.getElementById("mainContent");


/* =========================================================
   MUSIC
   ========================================================= */


/* =========================================================
   STAGE 2 — ENHANCED MUSIC
   ========================================================= */

let musicPlaying = false;

const musicDisc =
    document.getElementById("musicDisc");


/* ---------------------------------------------------------
   Update music button
   --------------------------------------------------------- */

function updateMusicUI() {

    if (musicPlaying) {

        musicControl.classList.add("playing");

        musicControl.setAttribute(
            "aria-pressed",
            "true"
        );

        musicText.textContent =
            "Music On";

    } else {

        musicControl.classList.remove("playing");

        musicControl.setAttribute(
            "aria-pressed",
            "false"
        );

        musicText.textContent =
            "Music Off";
    }
}


/* ---------------------------------------------------------
   Smooth fade in
   --------------------------------------------------------- */

function fadeMusicIn() {

    let volume = 0;

    bgMusic.volume = 0;

    const fade = setInterval(() => {

        volume += 0.015;

        if (volume >= 0.45) {

            volume = 0.45;

            clearInterval(fade);
        }

        bgMusic.volume = volume;

    }, 100);
}


/* ---------------------------------------------------------
   Smooth fade out
   --------------------------------------------------------- */

function fadeMusicOut() {

    let volume = bgMusic.volume;

    const fade = setInterval(() => {

        volume -= 0.025;

        if (volume <= 0) {

            volume = 0;

            clearInterval(fade);

            bgMusic.pause();
        }

        bgMusic.volume = volume;

    }, 50);
}


/* ---------------------------------------------------------
   Start music
   --------------------------------------------------------- */

function startMusic() {

    bgMusic.volume = 0;

    bgMusic.play()
        .then(() => {

            musicPlaying = true;

            updateMusicUI();

            fadeMusicIn();

        })
        .catch(() => {

            console.log(
                "Music playback was blocked."
            );

        });
}


/* ---------------------------------------------------------
   Toggle music
   --------------------------------------------------------- */

musicControl.addEventListener(
    "click",
    () => {

        if (musicPlaying) {

            fadeMusicOut();

            musicPlaying = false;

            updateMusicUI();

        } else {

            bgMusic.play()
                .then(() => {

                    musicPlaying = true;

                    updateMusicUI();

                    fadeMusicIn();

                })
                .catch(() => {

                    console.log(
                        "Music playback was blocked."
                    );

                });
        }

    }
);




/*
   Start music with a gentle fade-in.
*/


/* =========================================================
   SMOOTH SECTION SCROLL
   ========================================================= */

function goToSection(id) {

    const section =
        document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   ENTER BUTTON
   ========================================================= */

enterButton.addEventListener("click", () => {

    /*
       Start music after user interaction.
    */

    if (!musicPlaying) {
        startMusic();
    }


    /*
       Small button animation.
    */

    enterButton.style.transform =
        "scale(0.94)";

    setTimeout(() => {

        enterButton.style.transform =
            "";

    }, 180);


    /*
       Move to message section.
    */

    setTimeout(() => {

        goToSection("messageScreen");

    }, 250);

});


/* =========================================================
   MESSAGE → MOOD SECTION
   ========================================================= */

messageNext.addEventListener("click", () => {

    goToSection("moodScreen");

});


/* =========================================================
   MOOD MESSAGES
   ========================================================= */

const moodMessages = {

    kindness: {

        icon: "💌",

        message:
            "You deserve kindness, especially from yourself. Be a little gentle with yourself today. 🌷"

    },


    happiness: {

        icon: "🌸",

        message:
            "Here's your tiny reminder: you are allowed to have good moments, even on difficult days. ✨"

    },


    funny: {

        icon: "😂",

        message:
            "Official diagnosis: you need approximately 73% more silly things and 0% unnecessary overthinking today. 😭😂"

    },


    surprise: {

        icon: "✨",

        message:
            "Surprise! Someone took the time to make an entire little website just to hopefully make you smile. 🥹🌷"

    }

};


/* =========================================================
   MOOD CARD CLICK
   ========================================================= */

moodCards.forEach(card => {

    card.addEventListener("click", () => {

        const type =
            card.dataset.message;

        const selected =
            moodMessages[type];

        if (!selected) return;
    });
     });

        /*
           Remove active state
           from other cards.
        */

       /* =========================================================
   STAGE 3 — INTERACTIVE MOOD CARDS
   ========================================================= */

moodCards.forEach(card => {

    card.addEventListener("click", () => {

        // Remove animation class first
        card.classList.remove("card-clicked");

        // Restart animation
        void card.offsetWidth;

        card.classList.add("card-clicked");

        // Active card
        moodCards.forEach(item => {
            item.classList.remove("active");
        });

        card.classList.add("active");

        // Get selected mood
      //  const mood = card.dataset.message;

        // Show message
        //responseMessage.textContent = moodMessages[mood];
const mood = card.dataset.message;

const selectedMood = moodMessages[mood];

responseMessage.textContent =
    selectedMood.message || selectedMood;




        // Show response
        responseContainer.classList.add("show");

        // Reveal next button
        surpriseNext.classList.add("show");

        // Create little celebration
        createMoodParticles(card);

    });

});


/* =========================================================
   MOOD PARTICLES
   ========================================================= */

function createMoodParticles(card) {

    const symbols = [
        "♡",
        "♥",
        "✦",
        "✧",
        "✨",
        "🌸"
    ];

    const rect = card.getBoundingClientRect();

    for (let i = 0; i < 12; i++) {

        const particle = document.createElement("span");

        particle.className = "mood-particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left =
            `${rect.left + rect.width / 2}px`;

        particle.style.top =
            `${rect.top + rect.height / 2}px`;

        particle.style.fontSize =
            `${10 + Math.random() * 10}px`;

        particle.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 180}px`
        );

        particle.style.setProperty(
            "--y",
            `${-60 - Math.random() * 130}px`
        );

        particle.style.setProperty(
            "--duration",
            `${1.2 + Math.random() * 1.2}s`
        );

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 2600);
    }
}


/* =========================================================
   MOOD → SURPRISE
   ========================================================= */

surpriseNext.addEventListener("click", () => {

    goToSection("surpriseScreen");

});


/* =========================================================
   FINAL SURPRISE
   ========================================================= */

sadButton.addEventListener("click", () => {

    /*
       Add celebration mode.
    */

    document.body.classList.add(
        "celebration"
    );


    /*
       Create lots of floating particles.
    */

    createCelebration();


    /*
       Small delay before final section.
    */

    setTimeout(() => {

        goToSection("finalScreen");

    }, 900);

});


/* =========================================================
   FLOATING PARTICLES
   ========================================================= */

function createParticles(symbol, amount = 5) {

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add(
            "particle"
        );

        particle.textContent = symbol;


        /*
           Random horizontal position.
        */

        particle.style.left =
            Math.random() * 100 + "%";


        /*
           Random size.
        */

        particle.style.fontSize =
            14 + Math.random() * 18 + "px";


        /*
           Random animation duration.
        */

        particle.style.animationDuration =
            3 + Math.random() * 3 + "s";


        /*
           Random delay.
        */

        particle.style.animationDelay =
            Math.random() * 0.8 + "s";


        particlesContainer.appendChild(
            particle
        );


        /*
           Remove after animation.
        */

        setTimeout(() => {

            particle.remove();

        }, 7000);

    }

}


/* =========================================================
   BIG CELEBRATION
   ========================================================= */

function createCelebration() {

    const symbols = [
        "❤️",
        "♡",
        "✨",
        "🌸",
        "🌷",
        "✦",
        "💗",
        "✧"
    ];


    for (let i = 0; i < 45; i++) {

        const randomSymbol =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        createParticles(
            randomSymbol,
            1
        );

    }

}


/* =========================================================
   SMILE BUTTON
   ========================================================= */

smileButton.addEventListener("click", () => {

    /*
       Show final response.
    */

    finalResponse.classList.add(
        "show"
    );


    /*
       Create happy particles.
    */

    createCelebration();


    /*
       Change button text.
    */

    smileButton.innerHTML = `
        <span>You did it ✨</span>
        <span>♡</span>
    `;


    /*
       Prevent repeated clicks.
    */

    smileButton.disabled = true;

    smileButton.style.cursor =
        "default";

});


/* =========================================================
   GENTLE PARALLAX EFFECT
   ========================================================= */

window.addEventListener(
    "mousemove",
    (event) => {

        /*
           Don't run this effect
           on small screens.
        */

        if (window.innerWidth < 768) {
            return;
        }


        const x =
            (event.clientX /
                window.innerWidth -
                0.5) * 2;

        const y =
            (event.clientY /
                window.innerHeight -
                0.5) * 2;


        const glows =
            document.querySelectorAll(
                ".glow"
            );


        glows.forEach(
            (glow, index) => {

                const strength =
                    (index + 1) * 6;

                glow.style.transform =
                    `translate(
                        ${x * strength}px,
                        ${y * strength}px
                    )`;

            }
        );

    }
);


/* =========================================================
   PAGE LOAD
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        /*
           Make sure page starts
           at the beginning.
        */

        window.scrollTo(
            0,
            0
        );


        /*
           Make sure music starts
           turned off.
        */

        musicPlaying = false;

        musicIcon.textContent = "♫";
        musicText.textContent =
            "Music Off";

    }
);
    
