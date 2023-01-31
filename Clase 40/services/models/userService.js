import UserFactory from "../../models/DAOs/userFactory.js";
import logger from "../logger/logger.js";

let instance = null;

export default class UsersService {
    constructor() {
        this.usersDao;
        this.init();
    }

    init = async() => {
        this.usersDao = await UserFactory.getPersistence();
    }

    getByEmail = async(email) => {
        return await this.usersDao.getByEmail(email);
    }

    static getInstance() {
        if(!instance){
            instance = new UsersService();
        }

        return instance;
    }
}