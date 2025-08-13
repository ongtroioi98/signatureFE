export function calculateTextWidth(text?: string, font = '16px Arial') {
  if (!text?.length) return 0;

  // Create a canvas element
  const canvas = document.createElement('canvas');
  if (!canvas) return 0;

  const context: any = canvas.getContext('2d');
  if (!context) return 0;

  context.font = font;
  const textWidth = context.measureText(text)?.width;
  return textWidth ?? 0;
}

export const truncateText = (
  text?: string,
  maxWidth?: number,
  font = '16px Arial',
) => {
  if (!maxWidth || !text?.length) return text;

  const canvas = document.createElement('canvas');
  if (!canvas) return text;

  const context = canvas.getContext('2d');
  if (!context) return text;

  context.font = font;

  let truncatedText = text;
  while (context.measureText(truncatedText).width > maxWidth - 1) {
    truncatedText = truncatedText.slice(0, -1);
  }

  return truncatedText.length < text.length
    ? `${truncatedText}...`
    : truncatedText;
};
