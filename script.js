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

const noMessages = [
    "What?",
    "Why?",
    "I know you love me",
    "I'm not going anywhere",
];
let noIndex = 0;

document.getElementById('noButton').addEventListener('click', () => {
    const responseElem = document.getElementById('response');
    responseElem.textContent = noMessages[noIndex];
    noIndex = (noIndex + 1) % noMessages.length;
});

const presentationSlides = [
    {
        image: 'images/love1.png',
        title: 'Our Journey Begins',
        message: 'From the moment we met...'
    },
    {
        image: 'images/love2.png',
        title: 'Memories We Made',
        message: 'Every moment with you is precious.'
    },
    {
        image: 'images/love3.png',
        title: 'Laughs and Smiles',
        message: 'You light up my world.'
    },
    {
        image: 'images/love4.png',
        title: 'Dreams Together',
        message: 'Building our future hand in hand.'
    },
    {
        image: 'images/love5.png',
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
    // Fade in thank you note and show cat after 5 seconds
    const thankYouNote = document.querySelector('.thank-you-note');
    const cat = document.getElementById('cat');
    const chatBox = document.getElementById('chatBox');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');

    // Setup WebSocket connection
    const socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('open', () => {
        console.log('Connected to WebSocket server');
    });

socket.addEventListener('message', (event) => {
    if (typeof event.data === 'string') {
        addMessage(event.data, 'other');
    } else if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
            addMessage(reader.result, 'other');
        };
        reader.readAsText(event.data);
    } else {
        console.warn('Unknown message data type:', event.data);
    }
});

    socket.addEventListener('close', () => {
        console.log('Disconnected from WebSocket server');
    });

    // Show cat after fade-in
    setTimeout(() => {
        cat.classList.add('visible');
    }, 5000);

    // Toggle chat box on cat click
    cat.addEventListener('click', () => {
        if (chatBox.style.display === 'flex') {
            chatBox.style.display = 'none';
        } else {
            chatBox.style.display = 'flex';
            chatInput.focus();
        }
    });

    // Add message to chat
    function addMessage(message, sender) {
        const messageElem = document.createElement('div');
        const senderLabel = document.createElement('span');
        senderLabel.style.fontWeight = 'bold';
        senderLabel.style.marginRight = '8px';
        senderLabel.textContent = sender === 'user' ? 'You:' : 'Love:';
        messageElem.appendChild(senderLabel);
        const messageText = document.createTextNode(message);
        messageElem.appendChild(messageText);
        messageElem.className = sender === 'user' ? 'user-message' : 'other-message';
        chatMessages.appendChild(messageElem);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle send button click
    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            socket.send(message);
            chatInput.value = '';
        }
    });

    // Handle enter key in input
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
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
