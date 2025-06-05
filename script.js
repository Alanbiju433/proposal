const pages = {
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    page3: document.getElementById('page3'),
};

const bgMusic = document.getElementById('bg-music');

function showPage(pageId) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[pageId].classList.add('active');
}

function playBackgroundMusic() {
    // Play music only after user interaction to avoid autoplay restrictions
    const playOnInteraction = () => {
        bgMusic.play().catch(() => {
            // Ignore play errors
        });
        window.removeEventListener('click', playOnInteraction);
        window.removeEventListener('mousemove', playOnInteraction);
    };
    window.addEventListener('click', playOnInteraction);
    window.addEventListener('mousemove', playOnInteraction);
}

document.getElementById('yesButton').addEventListener('click', () => {
    // Transition from page 1 to page 2 with fade out/in
    pages.page1.classList.add('fade-out');
    // Play background music on clicking "Yes"
    bgMusic.play().catch(() => {
        // Ignore play errors
    });
    setTimeout(() => {
        showPage('page2');
        startPresentation();
    }, 1000);
});

const presentationSlides = [
    {
        image: 'love1.png',
        title: 'Our Journey Begins',
        message: 'From the moment we met...'
    },
    {
        image: 'love2.png',
        title: 'Memories We Made',
        message: 'Every moment with you is precious.'
    },
    {
        image: 'love3.png',
        title: 'Laughs and Smiles',
        message: 'You light up my world.'
    },
    {
        image: 'love4.png',
        title: 'Dreams Together',
        message: 'Building our future hand in hand.'
    },
    {
        image: 'love5.png',
        title: 'Forever and Always',
        message: 'Will you be mine forever?',
        showYesButton: true
    }
];

let currentSlideIndex = 0;
let nextButtonTimeout;

function startPresentation() {
    currentSlideIndex = 0;
    showSlide(currentSlideIndex);
}

function showSlide(index) {
    const slide = presentationSlides[index];
    const slideImage = document.getElementById('slideImage');
    const slideTitle = document.getElementById('slideTitle');
    const slideMessage = document.getElementById('slideMessage');
    const nextButton = document.getElementById('nextButton');

    slideImage.src = slide.image;
    slideTitle.textContent = slide.title;
    slideMessage.textContent = slide.message;
    nextButton.style.display = 'none';

    // Show next button after 2 seconds
    clearTimeout(nextButtonTimeout);
    nextButtonTimeout = setTimeout(() => {
        nextButton.style.display = 'inline-block';
        if (slide.showYesButton) {
            nextButton.textContent = 'Yesssss 💖';
        } else {
            nextButton.textContent = 'Next';
        }
    }, 2000);

    nextButton.onclick = () => {
        if (currentSlideIndex < presentationSlides.length - 1) {
            currentSlideIndex++;
            showSlide(currentSlideIndex);
        } else {
            // End of presentation, show thank you page
            showPage('page3');
            // Hide next button on thank you page
            const nextButton = document.getElementById('nextButton');
            if (nextButton) {
                nextButton.style.display = 'none';
            }
            // Show final yes button event listener
            const finalYesButton = document.getElementById('finalYesButton');
            if (finalYesButton) {
                finalYesButton.style.display = 'inline-block';
                finalYesButton.onclick = () => {
                    alert('Thank you for saying YES! 💖');
                };
            }
        }
    };
}

window.addEventListener('load', () => {
    playBackgroundMusic();
});

// Three.js scene variables
let scene, camera, renderer;

function initThreeJSScene() {
    // No 3D scene needed for presentation style
}

function onPointerDown(event) {
    isUserInteracting = true;

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;
}

function onPointerMove(event) {
    if (isUserInteracting) {
        lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;

        lat = Math.max(-85, Math.min(85, lat));

        heartGroup.rotation.y = THREE.MathUtils.degToRad(lon);
        heartGroup.rotation.x = THREE.MathUtils.degToRad(lat);
    }
}

function onPointerUp() {
    isUserInteracting = false;
}

function onDocumentMouseWheel(event) {
    camera.position.z += event.deltaY * 0.05;
    camera.position.z = Math.min(Math.max(camera.position.z, 10), 100);

    if (camera.position.z < 30) {
        alert("You zoomed in close! ❤️");
    }
}

function animate() {
    requestAnimationFrame(animate);

    // No auto rotation or zoom, user controls only

    renderer.render(scene, camera);
}

// Remove auto zoom event listeners and timers
document.getElementById('page2').removeEventListener('wheel', () => {});
// No timed zoom
