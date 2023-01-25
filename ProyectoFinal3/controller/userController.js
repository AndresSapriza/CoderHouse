import UserModel from "../models/userModel.js";

class UserController {

    async get(req,res){
        try{
            const email = req.params.email;
            if(email){
                const user = await UserModel.find({email: email});
                if(!user) return res.status(404).json({message: `User doesn't exist.`});
                return res.status(200).json(user);
            }else{
                return res.status(400).json({message: `Email can't be empty.`});
            }
        }catch(err){
            return res.status(500).json({message: `Something happen`});
        }
        
    }
}


export default new UserController();