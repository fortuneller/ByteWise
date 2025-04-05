// routes/folderRoutes.js

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const folderController = require("../controllers/folderController");

router.post("/", authenticate, folderController.createFolder);
router.get("/", folderController.getFolders); // all folders (for homepage)
router.get("/mine", authenticate, folderController.getMyFolders); // current user's folders

module.exports = router;
