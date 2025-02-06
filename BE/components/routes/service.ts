import { Router } from "express";
import { getNewProduct } from "../controller/service/getNewProduct";
import { getAllBlog } from "../controller/service/getAllBlog";
import { addContactUs } from "../controller/service/addContactUs";
import { getSingleProduct } from "../controller/service/getSingleProduct";
import { getProductShop } from "../controller/service/getProductShop";
import { getProductSpecial } from "../controller/service/getProductSpecial";
import { getProductCategory } from "../controller/service/getProductCategory";
import { getProductCategoryValidation } from "../../middleware/service/getProductCategoryValidation";
import { handleErrors } from "../../middleware/handleErrors";
import { getNewProductValidation } from "../../middleware/service/getNewProductValidation";
import { getSingleProductValidation } from "../../middleware/service/getSingleProductValidation";
import { addContactusValidation } from "../../middleware/service/addContactusValidation";

const router = Router();

router.get("/", (req, res) => {
    res.send("Router service is running");
})

router.get("/getNewProduct", getNewProductValidation, handleErrors, getNewProduct);
router.get("/getAllBlog", getAllBlog);
router.post("/addContactUs", addContactusValidation, handleErrors, addContactUs);
router.get("/getSingleProduct", getSingleProductValidation, handleErrors, getSingleProduct);
router.get("/getProductShop", getProductShop);
router.get("/getProductSpecial", getProductSpecial);
router.get("/getProductCategory", getProductCategoryValidation, handleErrors, getProductCategory);

export default router;