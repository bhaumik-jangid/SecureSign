import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true,"Please provide a username"], 
    unique: true 
  },
  email: { 
    type: String, 
    required: [true,"Please provide an email"], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true,"Please provide a password"]
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  isAdmin: { 
    type: Boolean, 
    default: false 
  },
  emailVerifyToken: String,
  emailVerifyTokenExpire: Date,
  forgotPasswordToken: String,
  forgotPasswordTokenExpire: Date
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;