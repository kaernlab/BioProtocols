function isThirdCharANumber(str: string): boolean {
  return /^\d$/.test(str.charAt(3));
}

export default isThirdCharANumber;
