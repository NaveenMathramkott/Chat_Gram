export const checkEmail = (email) => {
  const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
  const data = REGEX_EMAIL.test(email);
  return !data;
};
