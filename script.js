// Event Handling
const magicButton = document.getElementById('magic-button');
const buttonMessage = document.getElementById('button-message');
let clickCount = 0;

magicButton.addEventListener('click', () => {
    clickCount++;
    magicButton.style.backgroundColor = `hsl(${clickCount * 60 % 360}, 70%, 50%)`;
    buttonMessage.textContent = `Clicked ${clickCount} times!`;
});

magicButton.addEventListener('mouseover', () => {
    buttonMessage.textContent = 'Hovering... Try clicking or double-clicking!';
});

magicButton.addEventListener('mouseout', () => {
    buttonMessage.textContent = `Interact with the button above! (Clicked ${clickCount} times)`;
});

magicButton.addEventListener('dblclick', () => {
    buttonMessage.textContent = 'Secret Double-Click Action! 🎉';
    magicButton.style.transform = 'scale(1.2)';
    setTimeout(() => {
        magicButton.style.transform = 'scale(1)';
    }, 300);
});

// Long press detection
let pressTimer;
magicButton.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
        buttonMessage.textContent = 'Long Press Detected! 🕒';
        magicButton.style.backgroundColor = '#ff4444';
    }, 1000);
});
magicButton.addEventListener('mouseup', () => clearTimeout(pressTimer));
magicButton.addEventListener('mouseleave', () => clearTimeout(pressTimer));