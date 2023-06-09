import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false

}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false
}

const registerNewUser = async (rawUserData) => {

    try {

        //check email/phonenumber are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The Email is already exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExist === true) {
            return {
                EM: 'The phone number is already exist',
                EC: '1'
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone
        })
        return {
            EM: 'A user is created successfully',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Songthing wrongs is service...',
            EC: -2
        }
    }
}

const checkPassword = (inputpassword, hashPassword) => {
    return bcrypt.compareSync(inputpassword, hashPassword); //true or false
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword === true) {
                return {
                    EM: 'You are logged in successfully',
                    EC: 0,
                    DT: ""
                }
            }
        }

        console.log(">>> Not found user with email ", rawData.valueLogin, "password:", rawData.password);
        return {
            EM: 'Your email/phone number or password is incorrect',
            EC: '1',
            DT: ''
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'Songthing wrongs is service...',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin
}