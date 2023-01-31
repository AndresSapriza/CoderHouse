import CustomError from "../../services/utils/customError.js";
import UserModel from "../Schemas/userModel.js";

export default class UserDaoDb {

    async getByEmail(email){
        return await UserModel.find({email: email});
    }
}