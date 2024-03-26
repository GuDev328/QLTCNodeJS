const categoriesController = require("../controllers/categoriesController");
const uploadImageMiddleware = require("../middlewares/fileMiddlewares");
const { isLoggedIn } = require("../middlewares/userMiddlewares");
const { catchError } = require("../utils/errorHandler");
const { Router } = require("express");

const router = Router();

router.post(
    "/create",
    isLoggedIn,
    catchError(categoriesController.createCategory)
);

router.post(
    "/create-global",
    isLoggedIn,
    uploadImageMiddleware,
    catchError(categoriesController.createGlobalCategory)
);

router.get(
    "/get-all",
    isLoggedIn,
    catchError(categoriesController.getAllCategories)
);
router.post(
    "/delete",
    isLoggedIn,
    catchError(categoriesController.deleteCategory)
);

module.exports = router;
