const { User } = require("../models");

const authorize = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(400).json({
        message: "No Token Provided",
      });
    }
    const token = auth.split(" ")[1];
    const user = await User.findOne({
      where: {
        noIdentifier: token,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User with this token can't be found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.status(200).json({
      message: "Successfully get the user",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({
        message: "Identifier tidak boleh kosong",
      });
    }

    if (identifier.length < 4) {
      return res.status(400).json({
        message: "Identifier harus memiliki panjang setidaknya 4 angka/karakter",
      });
    }

    const user = await User.findOne({
      where: {
        noIdentifier: identifier,
      },
    });

    if (!user) {
      const newUser = await User.create({
        noIdentifier: identifier,
      });
      return res.status(200).json({
        data: newUser,
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { handleLogin, authorize, handleGetUser };
