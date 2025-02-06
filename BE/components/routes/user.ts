import { Router } from "express";
import { changePassword } from "../controller/user/changePassword";
import { changeInformation } from "../controller/user/changeInformation";
import { getInforUser } from "../controller/user/getInforUser";
import { changeInformationValidation } from "../../middleware/user/changeInformationValidation";
import { handleErrors } from "../../middleware/handleErrors";
import { changePasswordValidation } from "../../middleware/user/changePasswordValidation";
import { getHistoryOrder } from "../controller/user/getHistoryOrder";
import { getOrderDetail } from "../controller/user/getOrderDetail";
import { getOrderDetailValidation } from "../../middleware/user/getOrderDetailValidation";


const router = Router();

router.get("/", (req, res) => {
    res.send("Router user is running");
})

router.post('/changePassword', changePasswordValidation, handleErrors, changePassword);
router.post('/changeInformation', changeInformationValidation, handleErrors, changeInformation);
router.get('/getHistoryorder', getHistoryOrder);
router.get('/getOrderDetail',getOrderDetailValidation, handleErrors, getOrderDetail);
router.get('/getInforUser', getInforUser);

export default router;