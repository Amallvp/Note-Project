const Note = require("../model/notes");
const constant = require("../config/constants");
const { isValid, validString } = require("../validations/validations");

const createNote = async (req, res) => {
  try {
    const { userId } = req.query;
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ success: false, message: constant.INPUTMISSING });
    }

    if (title) {
      if (!isValid(title) && !validString(title)) {
        return res.status(constant.BAD_REQUEST).json({
          success: false,
          message: constant.INPUTMISSING,
        });
      }
    }

    if (description) {
      if (!isValid(description) && !validString(description)) {
        return res.status(constant.BAD_REQUEST).json({
          success: false,
          message: constant.INPUTMISSING,
        });
      }
    }

    const folder = req.uploadFolder;
    let imagePaths = [];

    if (Array.isArray(req.files) && req.files.length > 0 && folder) {
      imagePaths = req.files.map(
        (file) => `/uploads/${folder}/${file.filename}`
      );
    }

    const note = new Note({
      title,
      description,
      images: imagePaths,
      createdBy: userId,
    });
    await note.save();

    return res.status(constant.DATA_CREATE_CODE).json({
      success: true,
      message: constant.SUCCESSCREATE,
      data: note,
    });
  } catch (error) {
    return res.status(constant.ERR_CODE).json({
      success: false,
      message: `${constant.SERVERERROR}- ${error.message}`,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    if (!noteId) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ success: false, message: constant.MISSINGMANDATS });
    }
    const { userId } = req.query;

    const note = await Note.findOne({ _id: noteId, isActive: true });

    if (!note) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ success: false, message: constant.NODATA });
    }

    if (note.createdBy.toString() !== userId.toString()) {
      return res
        .status(constant.AUTH_CODE)
        .json({ success: false, message: constant.UNAUTHORIZED });
    }

    const { title, description } = req.body;

    if (title) {
      if (!isValid(title) && !validString(title)) {
        return res.status(constant.BAD_REQUEST).json({
          success: false,
          message: constant.INPUTMISSING,
        });
      }
    }

    if (description) {
      if (!isValid(description) && !validString(description)) {
        return res.status(constant.BAD_REQUEST).json({
          success: false,
          message: constant.INPUTMISSING,
        });
      }
    }

    const folder = req.uploadFolder;

    const newImagePaths =
      Array.isArray(req.files) && req.files.length > 0 && folder
        ? req.files.map((file) => `/uploads/${folder}/${file.filename}`)
        : [];

    note.images = newImagePaths.length > 0 ? newImagePaths : note.images;

    note.title = title || note.title;
    note.description = description || note.description;

    await note.save();

    return res.status(constant.SUCCESS_CODE).json({
      success: true,
      message: constant.UPDATEDSUCCESS,
      data: note,
    });
  } catch (error) {
    return res.status(constant.ERR_CODE).json({
      success: false,
      message: `${constant.SERVERERROR}- ${error.message}`,
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;

    if (!noteId) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ success: false, message: constant.MISSINGMANDATS });
    }

    const note = await Note.findOne({ _id: noteId, isActive: true });

    if (!note) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ success: false, message: constant.NODATA });
    }

    return res.status(constant.SUCCESS_CODE).json({
      success: true,
      message: constant.FETCHSUCCESS,
      data: note,
    });
  } catch (error) {
    return res.status(constant.ERR_CODE).json({
      success: false,
      message: `${constant.SERVERERROR}- ${error.message}`,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const userId = req.user._id;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    //filter
    const filter = { isActive: true };
    if (req.user) {
      filter.createdBy = userId;
    }

    const [notes, total] = await Promise.all([
      Note.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Note.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      totalNotes: total,
      currentPage: page,
      totalPages,
      notes,
    });
  } catch (error) {
    return res.status(constant.ERR_CODE).json({
      success: false,
      message: `${constant.SERVERERROR}- ${error.message}`,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    if (!noteId) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ success: false, message: constant.MISSINGMANDATS });
    }
    const userId = req.user._id;

    const note = await Note.findOne({ _id: noteId, isActive: true });

    if (!note) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ success: false, message: constant.NODATA });
    }

    if (note.createdBy.toString() !== userId.toString()) {
      return res
        .status(constant.AUTH_CODE)
        .json({ success: false, message: constant.UNAUTHORIZED });
    }

    note.isActive = false;
    await note.save();

    return res.status(constant.SUCCESS_CODE).json({
      success: true,
      message: constant.DELETESUCCESS,
    });
  } catch (error) {
    return res.status(constant.ERR_CODE).json({
      success: false,
      message: `${constant.SERVERERROR}- ${error.message}`,
    });
  }
};

module.exports = {
  createNote,
  updateNote,
  getNoteById,
  getAllNotes,
  deleteNote,
};
