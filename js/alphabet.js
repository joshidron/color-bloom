const data = {
  A: "Apple", B: "Ball", C: "Cat", D: "Dog", E: "Elephant",
  F: "Fish", G: "Goat", H: "Hat", I: "Ice cream", J: "Jug",
  K: "Kite", L: "Lion", M: "Monkey", N: "Nest", O: "Orange",
  P: "Parrot", Q: "Queen", R: "Rabbit", S: "Sun", T: "Tiger",
  U: "Umbrella", V: "Violin", W: "Watch", X: "Xylophone",
  Y: "Yak", Z: "Zebra"
};

const output = document.getElementById('output');
const lettersDiv = document.getElementById('letters');
const synth = window.speechSynthesis;
let currentTimeout = null;

// Speak function with optional delay
function speak(text, delay = 0) {
  // Clear any pending timeouts
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  
  if (delay > 0) {
    currentTimeout = setTimeout(() => {
      synth.speak(utterance);
      currentTimeout = null;
    }, delay);
  } else {
    synth.speak(utterance);
  }
}

function sayAndSpell(letter) {
  const upper = letter.toUpperCase();
  const word = data[upper];
  if (!word) return;

  const phrase = `${upper} for ${word}`;
  const spelledLine = `${word} spelled as ${word.toUpperCase().split('').join(' ')}`;

  output.textContent = `${phrase} - ${spelledLine}`;

  // Stop any ongoing speech and clear pending timeouts
  synth.cancel();
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }

  // Speak the phrase and then the spelled line
  speak(phrase);                          // e.g., "Y for Yak"
  speak(spelledLine, 1500);               // e.g., "Yak spelled as Y A K"
}

// Generate clickable buttons
Object.keys(data).forEach(letter => {
  const btn = document.createElement('div');
  btn.className = 'letter';
  btn.textContent = letter;
  btn.addEventListener('click', () => sayAndSpell(letter));
  lettersDiv.appendChild(btn);
});

// Handle keyboard press
document.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase();
  if (data[key]) {
    sayAndSpell(key);
  }
}); 