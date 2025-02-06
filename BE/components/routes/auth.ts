import { Router } from "express";
import { register } from "../controller/auth/register";
import { login } from "../controller/auth/login";
import { loginGoogle } from "../controller/auth/loginGoogle";
import { loginValidation } from "../../middleware/auth/loginValidation";
import { handleErrors } from "../../middleware/handleErrors";
import { registerValidation } from "../../middleware/auth/registerValidation";


const router = Router();

router.get("/", (req, res) => {
    res.send("Router auth is running");
})

router.post("/register", registerValidation, handleErrors ,  register);
router.post("/login", loginValidation, handleErrors ,login);
router.post("/login-google", loginGoogle);

export default router;