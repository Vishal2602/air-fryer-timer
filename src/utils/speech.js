/**
 * Speech synthesis utility for voice alerts
 * Uses the Web Speech API with fallbacks for browser support
 */

/**
 * Check if speech synthesis is supported
 * @returns {boolean} True if supported
 */
export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * Speak a message using the Web Speech API
 * @param {string} message - The message to speak
 * @param {Object} options - Speech options
 * @param {number} options.volume - Volume (0-1)
 * @param {number} options.rate - Speech rate (0.5-2)
 * @returns {boolean} True if speech was initiated
 */
export function speak(message, options = {}) {
  if (!isSpeechSupported()) {
    console.warn('Speech synthesis not supported in this browser');
    return false;
  }

  if (!message || typeof message !== 'string') {
    console.warn('Invalid message provided to speak function');
    return false;
  }

  // Cancel any ongoing speech to avoid overlapping
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(message);

  // Apply options with sensible defaults
  utterance.volume = options.volume ?? 1;
  utterance.rate = options.rate ?? 0.9;
  utterance.pitch = options.pitch ?? 1;

  // Try to use a friendly voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    voice => voice.lang.startsWith('en') && voice.name.includes('Female')
  ) || voices.find(
    voice => voice.lang.startsWith('en')
  );

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  try {
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.error('Speech synthesis error:', error);
    return false;
  }
}

/**
 * Cancel any ongoing speech
 */
export function cancelSpeech() {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Test if voice alerts are working
 * @param {number} volume - Volume level (0-1)
 * @returns {boolean} True if test speech was initiated
 */
export function testVoice(volume = 1) {
  return speak("Voice alerts are working!", { volume });
}
