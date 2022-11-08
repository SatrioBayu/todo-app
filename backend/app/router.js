const express = require("express");
const router = express.Router();
const userController = require("./controller/userController");
const listController = require("./controller/listController");
const todoController = require("./controller/todoController");

// Init
router.get("/", (req, res) => {
  res.send({
    message: "Server is running",
  });
});

// User
router.get("/profile", userController.authorize, userController.handleGetUser);
router.post("/login", userController.handleLogin);

// List
router.get("/list", userController.authorize, listController.handleGetList);
router.post("/list", userController.authorize, listController.handleCreateList);
router.get("/list/:id", userController.authorize, listController.handleGetListById);
router.put("/list/:id", userController.authorize, listController.handleUpdateList);
router.delete("/list/:id", userController.authorize, listController.handleDeleteList);

// Todo
router.post("/todo", userController.authorize, todoController.handleCreateTodo);
router.put("/todo/:id", userController.authorize, todoController.handleUpdateTodo);
router.delete("/todo/:id", userController.authorize, todoController.handleDeleteTodo);

module.exports = router;
