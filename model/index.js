const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const config = require('config');

const genreScheme = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength:50,
        trim: true,
        lowercase:true,
    }
})

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    isGold: {
        type: Boolean,
        default:false,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        maxLength: 15,
    }
})

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength:255
    },
    genre: {
        type: genreScheme,
        required:true,
    },
    numberInStock: {
        type: Number,
        required: true,
        minLength: 0,
        maxLength:255,
    },
    dailyRentalRent: {
        type: Number,
        required: true,
        minLength: 0,
        maxLength:255,
    }
})

const rentalSchema = new Schema({
    customer: { 
      type: new Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        },
        isGold: {
          type: Boolean,
          default: false
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        }      
      }),  
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true, 
          minlength: 5,
          maxlength: 255
        },
        dailyRentalRate: { 
          type: Number, 
          required: true,
          min: 0,
          max: 255
        }   
      }),
      required: true
    },
    dateOut: { 
      type: Date, 
      required: true,
      default: Date.now
    },
    dateReturned: { 
      type: Date
    },
    rentalFee: { 
      type: Number, 
      min: 0
    }
  });

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength:255
  },
  password:{
    type: String,
    required: true,
    minLength: 5,
    maxLength:1024
  },
  isAdmin:Boolean
}) 

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id,isAdmin:this.isAdmin }, config.get('jwtPrivateKey'))
  return token
}
const Genre = mongoose.model('genres', genreScheme);
const Customer = mongoose.model('customers', customerSchema);
const Movies = mongoose.model('movies', movieSchema);
const Rental = mongoose.model('rentals', rentalSchema);
const User = mongoose.model('users', userSchema);

module.exports = {Genre,Customer,Movies,Rental,User}