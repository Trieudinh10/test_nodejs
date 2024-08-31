const express = require("express");
const router = express.Router(); // Thay vì sử dụng `app`, sử dụng `router`

const authCtrl = require("../controllers/auth");

router.get("/sign-in", authCtrl.getSignIn);
router.get("/sign-up", authCtrl.getSignUp);
router.get("/sign-out", authCtrl.getSignOut);

router.post("/sign-in", authCtrl.postSignIn);
router.post("/sign-up", authCtrl.postSignUp);

module.exports = router; // Xuất router thay vì app
