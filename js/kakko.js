const letters = [
      { letter: 'અ', word: 'અનાર' }, { letter: 'આ', word: 'આમલી' },
      { letter: 'ઇ', word: 'ઇમારત' }, { letter: 'ઈ', word: 'ઈજાપત્ર' },
      { letter: 'ઉ', word: 'ઉંદર' }, { letter: 'ઊ', word: 'ઊંટ' },
      { letter: 'ઋ', word: 'ઋષિ' }, { letter: 'એ', word: 'એરપ્લેન' },
      { letter: 'ઐ', word: 'ઐનક' }, { letter: 'ઓ', word: 'ઓટલો' },
      { letter: 'ઔ', word: 'ઔષધિ' }, { letter: 'ક', word: 'કબૂતર' },
      { letter: 'ખ', word: 'ખડિયો' }, { letter: 'ગ', word: 'ગાય' },
      { letter: 'ઘ', word: 'ઘડિયાળ' }, { letter: 'ઙ', word: 'ઙાર' },
      { letter: 'ચ', word: 'ચંપા' }, { letter: 'છ', word: 'છત્રી' },
      { letter: 'જ', word: 'જહાજ' }, { letter: 'ઝ', word: 'ઝાંઝર' },
      { letter: 'ઞ', word: 'ઞાન' }, { letter: 'ટ', word: 'ટમેટું' },
      { letter: 'ઠ', word: 'ઠંડક' }, { letter: 'ડ', word: 'ડબ્બો' },
      { letter: 'ઢ', word: 'ઢોલ' }, { letter: 'ણ', word: 'ણંદી' },
      { letter: 'ત', word: 'તલવાર' }, { letter: 'થ', word: 'થેલી' },
      { letter: 'દ', word: 'દવાખાનું' }, { letter: 'ધ', word: 'ધજા' },
      { letter: 'ન', word: 'નદી' }, { letter: 'પ', word: 'પંખી' },
      { letter: 'ફ', word: 'ફુલ' }, { letter: 'બ', word: 'બિલાડી' },
      { letter: 'ભ', word: 'ભમરડો' }, { letter: 'મ', word: 'મોટર' },
      { letter: 'ય', word: 'યાન' }, { letter: 'ર', word: 'રડવું' },
      { letter: 'લ', word: 'લિમડો' }, { letter: 'વ', word: 'વાછરડો' },
      { letter: 'શ', word: 'શકુંન' }, { letter: 'ષ', word: 'ષડરિપુ' },
      { letter: 'સ', word: 'સૂરજ' }, { letter: 'હ', word: 'હાથી' }
    ];

    const lettersDiv = document.getElementById('letters');
    const output = document.getElementById('output');

    // Function to speak Gujarati with fallback
    function speakGujarati(text) {
      const synth = window.speechSynthesis;

      const speak = () => {
        const voices = synth.getVoices();
        let gujaratiVoice = voices.find(voice => voice.lang === 'gu-IN');

        // Fallback to Hindi or Indian English if Gujarati not found
        if (!gujaratiVoice) {
          gujaratiVoice = voices.find(voice =>
            voice.lang.startsWith('hi') || voice.lang.startsWith('en-IN')
          );
        }

        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'gu-IN';
        if (gujaratiVoice) msg.voice = gujaratiVoice;

        synth.cancel(); // Stop any ongoing speech
        synth.speak(msg);
      };

      // If voices not loaded yet, wait for them
      if (synth.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = speak;
      } else {
        speak();
      }
    }

    // Render buttons
 letters.forEach(({ letter, word }) => {
  const btn = document.createElement('div');
  btn.className = 'letter';
  btn.textContent = letter;
  btn.addEventListener('click', () => {
    const text = `${letter} એટલે ${word}`; // ✅ changed "માટે" to "એટલે"
    output.textContent = text;
    speakGujarati(text);
  });
  lettersDiv.appendChild(btn);
});
