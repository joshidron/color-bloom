const numbers = [
  { numeral: '0', word: 'zero' },{ numeral: '1', word: 'one' }, { numeral: '2', word: 'two' },
   { numeral: '3', word: 'three' },{ numeral: '4', word: 'four' }, { numeral: '5', word: 'five' }, { numeral: '6', word: 'six' },
  { numeral: '7', word: 'seven' }, { numeral: '8', word: 'eight' }, { numeral: '9', word: 'nine' },
  { numeral: '10', word: 'ten' }, { numeral: '11', word: 'eleven' }, { numeral: '12', word: 'twelve' },
  { numeral: '13', word: 'thirteen' }, { numeral: '14', word: 'fourteen' }, { numeral: '15', word: 'fifteen' },
  { numeral: '16', word: 'sixteen' }, { numeral: '17', word: 'seventeen' }, { numeral: '18', word: 'eighteen' },
  { numeral: '19', word: 'nineteen' }, { numeral: '20', word: 'twenty' }, { numeral: '21', word: 'twenty-one' },
  { numeral: '22', word: 'twenty-two' }, { numeral: '23', word: 'twenty-three' }, { numeral: '24', word: 'twenty-four' },
  { numeral: '25', word: 'twenty-five' }, { numeral: '26', word: 'twenty-six' }, { numeral: '27', word: 'twenty-seven' },
  { numeral: '28', word: 'twenty-eight' }, { numeral: '29', word: 'twenty-nine' }, { numeral: '30', word: 'thirty' },
  { numeral: '31', word: 'thirty-one' }, { numeral: '32', word: 'thirty-two' }, { numeral: '33', word: 'thirty-three' },
  { numeral: '34', word: 'thirty-four' }, { numeral: '35', word: 'thirty-five' }, { numeral: '36', word: 'thirty-six' },
  { numeral: '37', word: 'thirty-seven' }, { numeral: '38', word: 'thirty-eight' }, { numeral: '39', word: 'thirty-nine' },
  { numeral: '40', word: 'forty' }, { numeral: '41', word: 'forty-one' }, { numeral: '42', word: 'forty-two' },
  { numeral: '43', word: 'forty-three' }, { numeral: '44', word: 'forty-four' }, { numeral: '45', word: 'forty-five' },
  { numeral: '46', word: 'forty-six' }, { numeral: '47', word: 'forty-seven' }, { numeral: '48', word: 'forty-eight' },
  { numeral: '49', word: 'forty-nine' }, { numeral: '50', word: 'fifty' }, { numeral: '51', word: 'fifty-one' },
  { numeral: '52', word: 'fifty-two' }, { numeral: '53', word: 'fifty-three' }, { numeral: '54', word: 'fifty-four' },
  { numeral: '55', word: 'fifty-five' }, { numeral: '56', word: 'fifty-six' }, { numeral: '57', word: 'fifty-seven' },
  { numeral: '58', word: 'fifty-eight' }, { numeral: '59', word: 'fifty-nine' }, { numeral: '60', word: 'sixty' },
  { numeral: '61', word: 'sixty-one' }, { numeral: '62', word: 'sixty-two' }, { numeral: '63', word: 'sixty-three' },
  { numeral: '64', word: 'sixty-four' }, { numeral: '65', word: 'sixty-five' }, { numeral: '66', word: 'sixty-six' },
  { numeral: '67', word: 'sixty-seven' }, { numeral: '68', word: 'sixty-eight' }, { numeral: '69', word: 'sixty-nine' },
  { numeral: '70', word: 'seventy' }, { numeral: '71', word: 'seventy-one' }, { numeral: '72', word: 'seventy-two' },
  { numeral: '73', word: 'seventy-three' }, { numeral: '74', word: 'seventy-four' }, { numeral: '75', word: 'seventy-five' },
  { numeral: '76', word: 'seventy-six' }, { numeral: '77', word: 'seventy-seven' }, { numeral: '78', word: 'seventy-eight' },
  { numeral: '79', word: 'seventy-nine' }, { numeral: '80', word: 'eighty' }, { numeral: '81', word: 'eighty-one' },
  { numeral: '82', word: 'eighty-two' }, { numeral: '83', word: 'eighty-three' }, { numeral: '84', word: 'eighty-four' },
  { numeral: '85', word: 'eighty-five' }, { numeral: '86', word: 'eighty-six' }, { numeral: '87', word: 'eighty-seven' },
  { numeral: '88', word: 'eighty-eight' }, { numeral: '89', word: 'eighty-nine' }, { numeral: '90', word: 'ninety' },
  { numeral: '91', word: 'ninety-one' }, { numeral: '92', word: 'ninety-two' }, { numeral: '93', word: 'ninety-three' },
  { numeral: '94', word: 'ninety-four' }, { numeral: '95', word: 'ninety-five' }, { numeral: '96', word: 'ninety-six' },
  { numeral: '97', word: 'ninety-seven' }, { numeral: '98', word: 'ninety-eight' }, { numeral: '99', word: 'ninety-nine' },
  { numeral: '100', word: 'one hundred' }
];

const lettersDiv = document.getElementById('letters');
const outputNumber = document.getElementById('output');

let lastActiveButton = null;

// Text-to-speech
function speakEnglish(text) {
  const synth = window.speechSynthesis;
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'en-US';
  synth.cancel();
  synth.speak(msg);
}

// Create number buttons
numbers.forEach(({ numeral, word }) => {
  const btn = document.createElement('div');
  btn.className = 'letter';
  btn.textContent = numeral;
  btn.dataset.number = numeral;

  btn.addEventListener('click', () => handleNumber(numeral, word, btn));
  lettersDiv.appendChild(btn);
});

function handleNumber(numeral, word, btn) {
  const spelling = word.toUpperCase().split('').join(' ');
  const text = `${numeral} Spelled as: ${spelling}`;
  outputNumber.textContent = text;
  
  // ✅ Correct function name
  speakEnglish(`${word}. Spelled as: ${spelling}`);

  if (lastActiveButton) lastActiveButton.classList.remove('active');
  if (btn) {
    btn.classList.add('active');
    lastActiveButton = btn;
  }
}


// --- Keyboard support ---
let typed = '';
let typingTimer;

document.addEventListener('keydown', (e) => {
  if (!/\d/.test(e.key)) return;

  typed += e.key;

  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    const match = numbers.find(n => n.numeral === typed);
    if (match) {
      const btn = document.querySelector(`.letter[data-number="${typed}"]`);
      handleNumber(match.numeral, match.word, btn);
    } else {
      outputNumber.textContent = `Number ${typed} not found`;
    }
    typed = '';
  }, 700);
});
