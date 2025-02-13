// const UdhariModel = require('../models/Udhari');

const UdhariModel = require("../model/Udhari.model.js");

// Create a new Udhari record
const createUdhari = async (req, res) => {
  try {
    console.log("6666",req.body)
    const { customer, amount, description, dueDate, userID } = req.body;

    if (!customer || !amount || !dueDate || !userID) {
      return res.status(400).json({ status: false, message: "All required fields must be provided." });
    }

    const newUdhari = new UdhariModel({
      customer,
      amount,
      description,
      dueDate,
      userID,
    });

    await newUdhari.save();

   return res.status(201).json({ status: true, message: "Udhari record created successfully.", data: newUdhari });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Get all Udhari records for a specific user
const getUdhariByUser = async (req, res) => {
  try {
    const { userID } = req.params;

    const udhariRecords = await UdhariModel.find({ userID }).sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: udhariRecords });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


const getUdhari = async (req, res) => {
    try {
      const { userID } = req.body;
  
      const udhariRecords = await UdhariModel.find({ userID }).sort({ createdAt: -1 });
  
      res.status(200).json({ status: true, data: udhariRecords });
  
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  };

// Update an Udhari record by ID
const updateUdhari = async (req, res) => {
  try {
  
    console.log("req.body",req.body)
    const { id } = req.params;
    console.log("id",id)
    const { customer, amount, description, dueDate, status } = req.body;

    const updatedUdhari = await UdhariModel.findByIdAndUpdate(
      id,
      { customer, amount, description, dueDate, status },
      { new: true }
    );

    if (!updatedUdhari) {
      return res.status(404).json({ status: false, message: "Udhari record not found." });
    }

   return res.status(200).json({ status: true, message: "Udhari record updated successfully.", data: updatedUdhari });

  } catch (error) {
   return res.status(500).json({ status: false, message: error.message });
  }
};

// Delete an Udhari record by ID
const deleteUdhari = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUdhari = await UdhariModel.findByIdAndDelete(id);

    if (!deletedUdhari) {
      return res.status(404).json({ status: false, message: "Udhari record not found." });
    }

    res.status(200).json({ status: true, message: "Udhari record deleted successfully." });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  createUdhari,
  getUdhariByUser,
  updateUdhari,
  deleteUdhari,
  getUdhari
};
