import logger from "../../services/logger/logger.js";

export default class UserDTO {
    constructor(user) {
        this.id = user._id
        this.name = user.name
        this.email = user.email
        this.password = user.password
    }
}