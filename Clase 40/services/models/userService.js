import UserFactory from "../../models/DAOs/userFactory.js"

export default class UsersService {
    constructor() {
        this.usersDao
        this.init()
    }

    init = async() => {
        this.usersDao = await UserFactory.getPersistence()
    }

    getByEmail = async(email) => {
        return this.usersDao.getByEmail(email);
    }
}