import CustomError from "../../services/utils/customError.js";
import UserModel from "../Schemas/userModel.js";
import logger from "../../services/logger/logger.js";

export default class UserDaoDb {

    getByEmail = async(email) => {
        return await UserModel.findOne({email: email}).lean();
    }
}