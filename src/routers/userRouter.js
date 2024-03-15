const userController = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/userMiddlewares");
const { catchError } = require("../utils/errorHandler");
const { Router } = require("express");

const router = Router();

router.post("/register", catchError(userController.register));
router.post("/login", catchError(userController.login));
router.post("/logout", isLoggedIn, catchError(userController.logout));

module.exports = router;
