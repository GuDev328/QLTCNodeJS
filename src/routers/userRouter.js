const userController = require("../controllers/userController");
const { isLoggedIn, isAdmin } = require("../middlewares/userMiddlewares");
const { catchError } = require("../utils/errorHandler");
const { Router } = require("express");

const router = Router();

router.post("/register", catchError(userController.register));
router.post("/login", catchError(userController.login));
router.post("/logout", isLoggedIn, catchError(userController.logout));
router.post(
    "/update-profile",
    isLoggedIn,
    catchError(userController.updateProfile)
);
router.post("/forgot-password", catchError(userController.forgotPassword));
router.post("/reset-password", catchError(userController.resetPassword));
router.get("/login-google", catchError(userController.loginGoogle));
router.get(
    "get-all-user",
    isLoggedIn,
    isAdmin,
    catchError(userController.getAllUser)
);

router.get("/get-list-province", catchError(userController.getListProvince));
router.get("/get-list-icon", catchError(userController.getListIcon));

module.exports = router;
