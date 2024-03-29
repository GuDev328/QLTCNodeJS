const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./services/dbServices");
const { defaultsErrorHandler } = require("./utils/errorHandler");
const userRouter = require("./routers/userRouter");
const walletRouter = require("./routers/walletRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const spendingRouter = require("./routers/spendingRouter");
const { config } = require("dotenv");
config();
const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(express.json());
app.use(cors({ origin: "*" }));

db.connect();
app.use("/api/user", userRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/spending", spendingRouter);

app.use(defaultsErrorHandler);
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server quản lý tài chính đang chạy ở cổng  ${port}`);
});
