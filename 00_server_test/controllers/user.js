const { StatusCodes } = require('http-status-codes');
const dataUser = require('../mockData/user.json');

const getAllUsers = async (req, res) => {
    res.status(StatusCodes.OK).json({ data: dataUser });
};

const getSingleUser = async (req, res) => {
    const { id } = req.params;
    const user = await dataUser.filter((item) => item.id == id)[0];
    res.status(StatusCodes.OK).json({ data: user });
};

module.exports = {
    getAllUsers,
    getSingleUser,
};
