import { Request, Response } from 'express';
import { UserServices } from './user.services';
import userValidationSchema from './user.validation';
import productValidationSchema from './product.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { error, value } = userValidationSchema.validate(userData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.details.map((detail) => detail.message),
      });
    }

    const result = await UserServices.createUserInDb(value);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const userData = req.body;

    const { error, value } = userValidationSchema.validate(userData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.details.map((detail) => detail.message),
      });
    }
    const result = await UserServices.updateSingleUserInDb(userId, value);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    // eslint-disable-next-line no-unused-vars
    const result = await UserServices.deleteUserFromDb(userId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const addSingleProduct = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const productData = req.body;

    const { error, value } = productValidationSchema.validate(productData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Product information Validation failed',
        error: error.details.map((detail) => detail.message),
      });
    }

    const result = await UserServices.addSingleProductToUserOrdersInDb(
      userId,
      value,
    );
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getAllProductOFSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders: result },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const getSingleUserAllProductTotalPrice = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = Number(req.params.userId);
    const result =
      await UserServices.getTotalProductPriceOFSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addSingleProduct,
  getAllProduct,
  getSingleUserAllProductTotalPrice,
};
