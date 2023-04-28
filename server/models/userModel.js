import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
   profilePicture:{
    type : String,
    default : "https://res.cloudinary.com/dihxiv8cj/image/upload/v1682281532/defaultProfile_t7znon.png",
    required : true
   },
    coverPicture: {
      type : String,
      default : "https://res.cloudinary.com/dihxiv8cj/image/upload/v1682282443/defaultCover_sxkzti.jpg",
      required : true
     },
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
