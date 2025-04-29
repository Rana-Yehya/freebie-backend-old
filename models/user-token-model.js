// const mongoose = require("mongoose");

// const UserTokenSchema = mongoose.Schema(
//   {
//     refreshToken: {
//       type: String,

//       trim: true,
//       required: [true, "Please enter refresh token"],
//     },
//     ip: {
//       type: String,

//       trim: true,
//       required: [true, "Please enter ip"],
//     },
//     userAgent: {
//       type: String,

//       trim: true,
//       required: [true, "Please enter user agent"],
//     },

//     isValid: {
//       type: Boolean,
//       default: true,
//     },
//     user: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );
// module.exports = mongoose.model("UserToken", UserTokenSchema);
