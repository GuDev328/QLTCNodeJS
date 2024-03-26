const spendingController = require("../controllers/spendingController");
const { isLoggedIn } = require("../middlewares/userMiddlewares");
const { catchError } = require("../utils/errorHandler");
const { Router } = require("express");

const router = Router();

router.post(
    "/create",
    isLoggedIn,
    catchError(spendingController.createSpending)
);

router.get(
    "/get-all",
    isLoggedIn,
    catchError(spendingController.getAllSpending)
);

module.exports = router;
