function autoHypenTel(
  str: string,
  phone: string,
  setPhone: (tmp: string) => string,
): string | unknown {
  str = phone.replace(/[^0-9]/g, '');
  let tmp = '';

  if (str.charAt(2) === '1') {
    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.substring(0, 3);
      tmp += '-';
      tmp += str.substring(3);
      return setPhone(tmp);
    } else if (str.length < 11) {
      tmp += str.substring(0, 3);
      tmp += '-';
      tmp += str.substring(3, 6);
      tmp += '-';
      tmp += str.substring(6);
      return setPhone(tmp);
    } else {
      tmp += str.substring(0, 3);
      tmp += '-';
      tmp += str.substring(3, 7);
      tmp += '-';
      tmp += str.substring(7);
      return setPhone(tmp);
    }
  } else if (str.charAt(2) === '0') {
    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.substring(0, 3);
      tmp += '-';
      tmp += str.substring(3);
      return setPhone(tmp);
    } else if (str.length < 11) {
      tmp += str.substring(0, 3);
      tmp += '-';
      tmp += str.substring(3, 6);
      tmp += '-';
      tmp += str.substring(6);
      return setPhone(tmp);
    } else {
      tmp += str.substring(0, 3);
      tmp += '-';
      tmp += str.substring(3, 7);
      tmp += '-';
      tmp += str.substring(7);
      return setPhone(tmp);
    }
  }
  return str;
}
export default autoHypenTel;
