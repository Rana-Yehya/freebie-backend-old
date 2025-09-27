const bcrypt = require("bcryptjs");

const passwordEncrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const passwordCompare = async ({ passwordToCmpare, password }) => {
  const match = await bcrypt.compare(passwordToCmpare, password);
  return match;
};
module.exports = { passwordEncrypt, passwordCompare };
