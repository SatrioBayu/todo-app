const express = require("express");
const router = express.Router();
const userController = require("./controller/userController");
const listController = require("./controller/listController");

router.get("/", (req, res) => {
  res.send({
    message: "Server is running",
  });
});

router.get("/profile", userController.authorize, userController.handleGetUser);
router.post("/login", userController.handleLogin);

router.get("/list", userController.authorize, listController.handleGetList);
router.post("/list", userController.authorize, listController.handleCreateList);
router.put("/list/:id", userController.authorize, listController.handleUpdateList);
router.delete("/list/:id", userController.authorize, listController.handleDeleteList);

module.exports = router;
