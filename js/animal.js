function playSound(event, soundUrl) {
  event.preventDefault();
  event.stopPropagation();
  
  const audio = new Audio(soundUrl);
  let playTime = 0;
  let soundInterval;
  
  audio.onloadedmetadata = function() {
    const duration = audio.duration;
    
    if (duration < 2) {
      // For sounds shorter than 2 seconds, loop them
      audio.loop = true;
      
      // Play the sound
      audio.play().catch(e => console.log("Audio play failed:", e));
      
      // Set a timer to stop after 2 seconds
      soundInterval = setInterval(() => {
        playTime += duration;
        if (playTime >= 2) {
          audio.pause();
          audio.currentTime = 0;
          clearInterval(soundInterval);
        }
      }, duration * 1000);
    } else {
      // For sounds longer than 2 seconds, play just the first 2 seconds
      audio.play().catch(e => console.log("Audio play failed:", e));
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 2000);
    }
  };
  
  // Fallback in case metadata doesn't load
  audio.onerror = function() {
    audio.play().catch(e => console.log("Audio play failed:", e));
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000);
  };
}