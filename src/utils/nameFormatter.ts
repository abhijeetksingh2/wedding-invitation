export const formatGuestName = (guestName: string): string => {
  if (!guestName || guestName.toLowerCase() === 'guest') {
    return 'Guest';
  }
  
  // Convert hyphenated names to spaced format and capitalize each word
  return guestName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
