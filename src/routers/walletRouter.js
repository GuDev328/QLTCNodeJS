const walletController = require("../controllers/walletController");
const { isLoggedIn } = require("../middlewares/userMiddlewares");
const { catchError } = require("../utils/errorHandler");
const { Router } = require("express");

const router = Router();

router.post("/create", isLoggedIn, catchError(walletController.createWallet));
router.post("/update", isLoggedIn, catchError(walletController.updateWallet));
router.post("/delete", isLoggedIn, catchError(walletController.deleteWallet));
router.get("/get-all", isLoggedIn, catchError(walletController.getAllWallet));

module.exports = router;
