const isValidName = function (name) {
  const nameRegex = /^[a-zA-Z\s\-_@#&(),.!?']+$/;
  const hasAtLeastTwoLetters = (name.match(/[a-zA-Z]/g) || []).length >= 2;
  return nameRegex.test(name) && name.trim().length > 0 && hasAtLeastTwoLetters;
};

const isValidEmail = function (email) {
  const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value !== "string" || value == "") return false;
  return true;
};

const validString = function (value) {
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidPassword = function (password) {
  const hasUppercase = /[A-Z]/.test(password);
  const lowercaseMatches = password.match(/[a-z]/g) || [];
  const hasTwoLowercase = lowercaseMatches.length >= 2;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=~`]/.test(password);

  return hasUppercase && hasTwoLowercase && hasSpecialChar;
};

module.exports = {
  isValidName,
  isValidEmail,
  isValid,
  validString,
  isValidPassword
};