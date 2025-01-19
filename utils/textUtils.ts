
export const sanitizeText = (text: string) => {
  return text
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
};