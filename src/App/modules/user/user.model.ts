import { TAddress, TFullName, TOrders, TUser, UserModel } from './user.interface';
import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt"
import config from '../../config';

const FullNameSchema = new Schema<TFullName>({
    firstName:  {type:String,required:true},
    lastName:  {type:String,required:true}
}
)
const AddressSchema = new Schema<TAddress>({
    street: {type:String,required:true},
    city: {type:String,required:true},
    country: {type:String,required:true}
}
)

const OrderSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});


const UserSchema = new Schema<TUser,UserModel>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true,unique: true },
    password: { type: String, required: true },
    fullName: { type: FullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
  address: { type: AddressSchema, required: true },
  orders: { type: [OrderSchema], default: [] },
    
});


UserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; 
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
  });
UserSchema.statics.isUserExists = async function(userId:number) {
    const existingUser = await User.findOne({ userId }).select({
        password: 0,
        __v: 0,
      _id: 0,
        orders:0
      });
    return existingUser;
}
const User = model<TUser,UserModel>("User", UserSchema);
export default User;