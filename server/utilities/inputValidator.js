class Validator {
  static validate(type, value) {
    if (type === 'email') {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(String(value).toLowerCase());
    }
    const stringy = value.trim();
    if (stringy.length < 4) {
      return false;
    }
    return true;
  }

  static validateInt(int) {
    if (typeof int !== 'number') {
      return false;
    }
    if (int < 1) {
      return false;
    }
    return true;
  }

  static validateString(string) {
    if (typeof string === 'undefined') {
      return false;
    }
    if (string.length < 3) {
      return false;
    }
    return true;
  }
}
export default Validator;
