export default class UserFactory {
    static getPersistence = async () => {
        switch (process.env.PERSISTENCE) {
            case "ARRAY":
                let { default: UsersDaoArray } = await import('./userDaoArray.js')
                return new UsersDaoArray()
            case "MONGOOSE":
                let { default: UserDaoDb } = await import('./userDaoDb.js')
                return UserDaoDb()
        }
    }
}