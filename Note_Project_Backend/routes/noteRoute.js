const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const {
  createNote,
  updateNote,
  getNoteById,
  getAllNotes,
  deleteNote
} = require("../controllers/noteController");
const { protectUser } = require("../middleware/authMiddleWare");

router.route("/add").post(protectUser, upload.array("images", 5), createNote);
router.route("/all").get(protectUser, getAllNotes);
router.route("/update/:noteId").put(protectUser, upload.array("images", 5), updateNote);
router.route("/:noteId").get(protectUser, getNoteById);
router.route("/delete/:noteId").delete(protectUser,deleteNote);   

module.exports = router;
