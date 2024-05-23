const { convertId } = require("../lib/commonMethod");
const User = require("./user.schema");
const bcrypt = require('bcrypt');


async function createUser(data) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        const newUser = new User({
            name: data.name,
            email: data.email,
            password: hashPassword,
            phone: data.phone
        })
        await newUser.save();
        return newUser;
    }
    catch (err) {
        console.log("error while creating user ---", err);
        return null;
    }
}

async function users() {
    try {
        return await User.find();
    }
    catch (err) {
        console.log("error while fetching users---", err);
    }
}

async function user(id) {
    try {
        return await User.findById(convertId(id));
    }
    catch (err) {
        console.log("error whille fetching user---", err);
    }
}

async function updateUser(id, data) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        const updatedUser = await User.findByIdAndUpdate(convertId(id),
            {
                name: data.name,
                email: data.email,
                password: hashPassword,
                phone: data.phone
            }, {new : true});
            return updatedUser;
    }
    catch (err) {
        console.log("err while updating user----", err);
    }
}
module.exports = {
    createUser,
    users,
    user,
    updateUser
}