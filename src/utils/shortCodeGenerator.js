// Use named export for correct import
export function generateShortCode() {
  // 7-character random string
  return Math.random().toString(36).substring(2, 9);
}
