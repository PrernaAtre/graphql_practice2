const userService = require("./user.service")

module.exports = {
    Query : {
        users : async (_parent , args) =>
        {
            return userService.users();
        },
        user : async (_parent, args) => {
            return userService.user(args.id)
        }
    },
    Mutation : {
        createUser: async (_parent, {data})=> {
            return userService.createUser(data);
        },
        updateUser : async (_parent, {id, data}) =>{
            const newuser =  userService.updateUser(id, data)
            return newuser;
        }
    }
}