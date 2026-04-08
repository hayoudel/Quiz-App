const express = require("express");
const router = express.Router();

const userController = require ( "../controllers/userController")


router.post("/", userController.create);
router.post("/auth",userController.auth)
router.get("/users", userController.getAllUsers);
router.get("/user/:id",userController.getUserById);
router.put("/update/user/:id",userController.update);
router.delete("/delete/user/:id",userController.deleteUser);


module.exports = router;