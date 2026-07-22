const Bus = require("../models/Bus");

exports.createBus = async (busData) => {
  return await Bus.create(busData);
};

exports.getAllBuses = async () => {
  return await Bus.find().sort({ createdAt: -1 });
};

exports.getBusById = async (id) => {
  return await Bus.findById(id);
};

exports.updateBus = async (id, data) => {
  return await Bus.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

exports.deleteBus = async (id) => {
  return await Bus.findByIdAndDelete(id);
};