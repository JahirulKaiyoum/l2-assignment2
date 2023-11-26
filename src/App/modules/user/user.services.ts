import { TOrders, TUser } from "./user.interface";
import User from "./user.model";

const createUserInDb = async (userData: TUser) => {
    const result = (await User.create(userData))
    const responseUser = {   
            userId: result.userId,
            username: result.username,
            fullName: result.fullName,
            age: result.age,
            email: result.email,
            isActive: result.isActive,
            hobbies: result.hobbies,
            address: result.address  
            }
    return responseUser;
};

const getAllUsersFromDb = async () => {
    const users = await User.find().select({
        _id:0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      });
    return users;
};

const getSingleUserFromDb = async (userId: number) => {
    const user = await User.isUserExists(userId);
    if (user) {
        return user;
    } else {
        throw new Error('User not found!');
    }

};

const updateSingleUserInDb = async (userId: number, userData: TUser) => {
    const foundUser = await User.isUserExists(userId);
    const updatedData = userData;
    if (foundUser) {
        const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            { $set: updatedData },
            { new: true }
        ).select({
            password: 0,__v: 0,_id: 0,orders:0});
        return updatedUser;
    } else {
        throw new Error('User not found!');
    }

};

const deleteUserFromDb = async (userId: number) => {

    const foundUser = await User.isUserExists(userId);
   
    if (foundUser) {
        const result = await User.deleteOne({ userId });
        return result;
    } else {
        throw new Error('User not found!');
    }

};


const addSingleProductToUserOrdersInDb = async (userId: number, productData: TOrders) => {
    const foundUser = await User.isUserExists(userId);
    const product = productData;
    console.log({product})
    if (foundUser) {
        if (!foundUser.orders) {
            foundUser.orders = [];
        };
        const userData = await User.findOne({ userId });
        if (userData) {
            if (!userData.orders) {
                userData.orders = []
            };
            if (userData.orders.length >= 0) {
                userData.orders.push(product)
            };
            await User.updateOne({ userId }, { $set: userData });
            console.log(userData)
        }
    } else {
        throw new Error('User not found!');
    }

};




const getAllProductOFSingleUserFromDb = async (userId: number) => {

    const foundUser = await User.isUserExists(userId);
    if (foundUser) {    
        const userDetails = await User.findOne({ userId: foundUser.userId });
        const orders = userDetails?.orders;
        return orders;
    } else {
        throw new Error('User not found!');
    }
};

const getTotalProductPriceOFSingleUserFromDb = async (userId: number) => {

    const foundUser = await User.isUserExists(userId);
    if (foundUser) {    
        const userDetails = await User.findOne({ userId: foundUser.userId });
        const orders = userDetails?.orders;

        const totalPrice = orders?.reduce((total, order) => {
            return total + order.price * order.quantity;
        }, 0); 
        
        return totalPrice;
    } else {
        throw new Error('User not found!');
    }
};
export const UserServices = {
    createUserInDb,
    getAllUsersFromDb,
    getSingleUserFromDb,
    updateSingleUserInDb,
    deleteUserFromDb,
    addSingleProductToUserOrdersInDb,
    getAllProductOFSingleUserFromDb,
    getTotalProductPriceOFSingleUserFromDb
}