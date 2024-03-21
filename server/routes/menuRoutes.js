

const { getMenuItems, addMenuItem, removeMenuItem, updateMenuItem, deleteMenuItem } = require("../controllers/MenuController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();
// MENU ITEM ROUTES
router.get("/get-menu-items", getMenuItems);
router.post("/add-menu-item", verifyToken, addMenuItem);
router.delete("/remove-menu-item/:id", verifyToken, removeMenuItem);
router.put("/update-menu-item/:id", verifyToken, updateMenuItem);
router.delete("/delete-menu-item/:id", verifyToken, deleteMenuItem);

module.exports = router;
