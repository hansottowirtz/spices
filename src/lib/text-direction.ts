// Regular expression to match RTL Unicode characters
const rtlChars = /[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]/;

// Regular expression to match LTR Unicode characters
const ltrChars = /[\u0000-\u05FF\u0700-\u08FF\uFB00-\uFB4F\uFB50-\uFDFF\uFE70-\uFEFF]/;

export function getTextDirection(text: string) {
  // Count the number of RTL and LTR characters in the text
  const rtlCount = (text.match(rtlChars) || []).length;
  const ltrCount = (text.match(ltrChars) || []).length;

  // Return the text direction based on the character count
  if (rtlCount > 0 && ltrCount === 0) {
    return 'rtl';
  } else if (ltrCount > 0 && rtlCount === 0) {
    return 'ltr';
  } else {
    return 'auto';
  }
}