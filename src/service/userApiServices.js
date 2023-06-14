import db from '../models/index';

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description'], },
        });
        if (users) {
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }

        } else {
            return {
                EM: 'get data success',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        return {
            EM: 'something wrongs with services',
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        await db.User.create({

        })
    } catch (error) {

    }
}

const updateUser = async (data) => {
    try {
        let user = await db.user.findOne({
            where: { id: data.id }
        })
        if (user) {
            //update
            user.save({

            })
        } else {
            //not found
        }
    } catch (error) {

    }
}

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: { id: id }
        })
    } catch (error) {

    }
}


module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser
}