// login signin changing text
const typedText = document.querySelector('.typed-text');
const welcomeText = 'Welcome to AJ-Kitchen';

let i = 0;
const typingSpeed = 50;

function typeText() {
if (i < welcomeText.length) {
typedText.textContent += welcomeText.charAt(i);
i++;
setTimeout(typeText, typingSpeed);
}
}

typeText();