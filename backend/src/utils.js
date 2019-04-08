const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

function getUserId(ctx) {
  return ctx.request.userId;
}
module.exports = {
  hashPassword,
  getUserId
};
