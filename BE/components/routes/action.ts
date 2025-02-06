import { Router } from "express";
import { addCompare } from "../controller/action/addCompare";
import { deleteCompare } from "../controller/action/deleteCompare";
import { deleteWishlist } from "../controller/action/deleteWishlist";
import { addWishlist } from "../controller/action/addWishlist";
import { getDataUserByCookie } from "../controller/action/getDataUserByCookie";
import { logout } from "../controller/action/logout";
import { addCart } from "../controller/action/addCart";
import { deleteCart } from "../controller/action/deleteCart";
import { checkout } from "../controller/action/checkout";
import { comment } from "../controller/action/comment";
import { commentValidation } from "../../middleware/action/commentValidation";
import { handleErrors } from "../../middleware/handleErrors";
import { addCompareValidation } from "../../middleware/action/addCompareValidation";
import { addCartValidation } from "../../middleware/action/addCartValidation";
import { addWishlistValidation } from "../../middleware/action/addWishlistValidation";
import { checkoutValidation } from "../../middleware/action/checkoutValidation";
import { deleteCompareValidation } from "../../middleware/action/deleteCompareValidation";
import { deleteWishlistValidation } from "../../middleware/action/deleteWishlistValidation";
import { deleteCartValidation } from "../../middleware/action/deleteCartValidation";


const router = Router();

router.get("/", (req, res) => {
    res.send("Router action is running");
})

router.post("/addCompare", addCompareValidation, handleErrors, addCompare);
router.post("/deleteCompare", deleteCompareValidation, handleErrors, deleteCompare);
router.post("/addWishlist", addWishlistValidation, handleErrors, addWishlist);
router.post("/deleteWishlist", deleteWishlistValidation, handleErrors, deleteWishlist);
router.post("/addCart", addCartValidation, handleErrors, addCart);
router.post("/deleteCart", deleteCartValidation, handleErrors, deleteCart);
router.post("/checkout", checkoutValidation, handleErrors, checkout);
router.post("/comment", commentValidation, handleErrors, comment)
router.get("/getDataUserByCookie", getDataUserByCookie);
router.get("/logout", logout);

export default router;