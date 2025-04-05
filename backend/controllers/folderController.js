// controllers/folderController.js

const Folder = require("../models/Folder");

exports.createFolder = async (req, res) => {
  try {
    const folder = new Folder({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.userId,
    });
    const saved = await folder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating folder", error: err.message });
  }
};

exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find().populate("createdBy", "email");
    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching folders", error: err.message });
  }
};

exports.getMyFolders = async (req, res) => {
  try {
    const myFolders = await Folder.find({ createdBy: req.user.userId });
    res.status(200).json(myFolders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your folders", error: err.message });
  }
};
