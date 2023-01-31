import UsersService from "../../services/models/userService.js";
import UserDTO from "../../models/DTOs/userDTO.js";

const userService = await UsersService.getInstance();

class UserController {

    async get(req,res){
        try{
            const email = req.params.email;
            if(email){
                const user = await userService.getByEmail(email);
                if(!user) return res.status(404).json({message: `User doesn't exist.`});
                let userDto = user => new UserDTO(user);
                return res.status(200).json(userDto);
            }else{
                return res.status(400).json({message: `Email can't be empty.`});
            }
        }catch(err){
            return res.status(500).json({message: `Something happen`});
        }
        
    }
}


export default new UserController();