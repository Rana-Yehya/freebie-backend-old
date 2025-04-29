// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const validator = require("validator");

// const UserSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       minLength: 3,
//       maxLength: 10,
//       trim: true,
//       required: [true, "Please enter name"],
//     },
//     email: {
//       type: String,
//       unique: [true, "Please enter a unique email address"],
//       required: [true, "Please enter email"],
//       trim: true,
//       validator: validator.isEmail,
//     },
//     password: {
//       type: String,
//       required: [true, "Please enter password"],
//       trim: true,
//       minLength: 8,
//     },
//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "user",
//     },
//     verificationToken: {
//       type: String,
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     verifiedAt: {
//       type: Date,
//     },
//     passwordToken: {
//       type: String,
//     },
//     passwordTokenExpiresAt: {
//       type: Date,
//     },
//   },
//   { timestamps: true }
// );

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return;
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
// UserSchema.methods.comparePasswords = async function (passwordToCmpare) {
//   const match = await bcrypt.compare(passwordToCmpare, this.password);
//   return match;
// };

// UserSchema.methods.getName = function () {
//   return this.name;
// };

// UserSchema.methods.getId = function () {
//   return this._id;
// };

// UserSchema.methods.getEmail = function () {
//   return this.email;
// };
// UserSchema.methods.getRole = function () {
//   return this.role;
// };

// module.exports = mongoose.model("User", UserSchema);
