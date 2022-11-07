const { List, Todo } = require("../models");

const handleGetListById = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const list = await List.findOne({
      where: {
        id,
        userId,
      },
      include: [
        {
          model: Todo,
        },
      ],
    });

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    return res.status(200).json({
      message: "List successfully fetched",
      data: list,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetList = async (req, res) => {
  try {
    const { id } = req.user;
    const lists = await List.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: Todo,
        },
      ],
    });
    return res.status(200).json({
      message: "List successfully fetched",
      data: lists,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const handleCreateList = async (req, res) => {
  try {
    const { id } = req.user;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title must be filled",
      });
    }

    const newList = await List.create({
      userId: id,
      title,
    });

    return res.status(201).json({
      message: "List has been created",
      data: newList,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const handleUpdateList = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const { title } = req.body;

    const list = await List.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    if (!title) {
      return res.status(400).json({
        message: "Title must be filled",
      });
    }

    const updatedList = await list.update({
      title,
    });

    return res.status(200).json({
      message: "List successfully updated",
      updatedList,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const handleDeleteList = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const list = await List.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    list.destroy();

    return res.status(200).json({
      message: "List successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { handleCreateList, handleUpdateList, handleGetList, handleDeleteList, handleGetListById };
