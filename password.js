const bcrypt = require("bcryptjs");

const passwordEncrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const passwordCompare = async ({ passwordToCmpare, password }) => {
  const match = await bcrypt.compare(passwordToCmpare, password);
  return match;
};
const main = async () => {
  console.log("$2b$10$U9L3L8JLCvzblIc9JGdOY.GpawndsKbSGtdyv0PW1o6UNdMlz6c9C");
  const password = await passwordEncrypt("password");
  console.log(password);

  const match = await passwordCompare({
    passwordToCmpare: "password",
    password: password,
  });
  console.log(match);
};
main();
