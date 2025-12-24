/**
 * Format seconds into MM:SS display format
 * @param {number} totalSeconds - Total seconds to format
 * @returns {string} Formatted time string (e.g., "12:34")
 */
export function formatTime(totalSeconds) {
  // Handle edge cases defensively
  if (totalSeconds === null || totalSeconds === undefined || isNaN(totalSeconds)) {
    return "00:00";
  }

  // Ensure non-negative value
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));

  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  // Pad with leading zeros
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}

/**
 * Format minutes into a human-readable string
 * @param {number} minutes - Total minutes
 * @returns {string} Formatted string (e.g., "24 min")
 */
export function formatMinutes(minutes) {
  if (minutes === null || minutes === undefined || isNaN(minutes)) {
    return "0 min";
  }
  return `${Math.floor(minutes)} min`;
}

/**
 * Convert minutes to seconds
 * @param {number} minutes - Minutes to convert
 * @returns {number} Seconds
 */
export function minutesToSeconds(minutes) {
  if (minutes === null || minutes === undefined || isNaN(minutes)) {
    return 0;
  }
  return Math.floor(minutes) * 60;
}
