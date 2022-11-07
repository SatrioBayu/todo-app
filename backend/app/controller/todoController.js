const { Todo, List } = require("../models");

const handleCreateTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { listId, step } = req.body;

    const list = await List.findOne({
      where: {
        id: listId,
        userId,
      },
    });

    if (!list) {
      return res.status(400).json({
        message: "List not found",
      });
    }

    if (!listId && !step) {
      return res.status(400).json({
        message: "Step can't be empty",
      });
    }

    const todo = await Todo.create({
      listId,
      step,
    });

    return res.status(200).json({
      message: "Step successfully created",
      data: todo,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const handleUpdateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const { listId, step } = req.body;

    if (!listId && !step) {
      return res.status(400).json({
        message: "List Id or Step can't be empty",
      });
    }

    const list = await List.findOne({
      where: {
        id: listId,
        userId,
      },
    });

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    const todo = await Todo.findOne({
      where: {
        id,
        listId,
      },
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    const updatedTodo = await todo.update({
      step,
    });

    return res.status(200).json({
      message: "Todo successfully updated",
      data: updatedTodo,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const handleDeleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const { listId } = req.body;

    if (!listId) {
      return res.status(400).json({
        message: "List Id can't be empty",
      });
    }

    const list = await List.findOne({
      where: {
        id: listId,
        userId,
      },
    });

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    const todo = await Todo.findOne({
      where: {
        id,
        listId,
      },
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    await todo.destroy();
    return res.status(200).json({
      message: "Todo successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { handleCreateTodo, handleUpdateTodo, handleDeleteTodo };
