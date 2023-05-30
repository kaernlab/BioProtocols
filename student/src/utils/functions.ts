function isFirstCharANumber(str: string): boolean {
  return /^\d$/.test(str.charAt(0));
}

export default isFirstCharANumber;
