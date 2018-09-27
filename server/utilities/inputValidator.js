class Validator {
  static validate(type, value) {
    // DISCLAIMER: THIS EMAIL REGEX SNIPPET IS NOT MY OWN AND ITS IDEA WAS COPIED FROM
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    if (type === 'email') {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
