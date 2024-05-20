export function maskCpf(value: string): string {
  //@ts-ignore import filterDigits function
  let digits = filterDigits(11, value);
  let maskedCpf = "";

  for (let i = 0; i < digits.length; i++) {
    switch (i) {
      case 3:
      case 6:
        maskedCpf += '.';
        break;
      case 9:
        maskedCpf += "-";
        break;
    }
    maskedCpf += digits[i];
  }
  
  return maskedCpf;
}
