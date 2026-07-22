const Schedule = require("../models/Schedule");
const Bus = require("../models/Bus");
const generateSeats = require("../utils/generateSeats");

exports.createSchedule = async (data) => {
  const bus = await Bus.findById(data.bus);

  if (!bus) {
    throw new Error("Bus not found");
  }

  data.availableSeats = bus.totalSeats;

  data.seats = generateSeats(bus.totalSeats);

  return await Schedule.create(data);
};

exports.getAllSchedules = () =>
  Schedule.find()
    .populate("bus")
    .populate("route");

exports.getScheduleById = (id) =>
  Schedule.findById(id)
    .populate("bus")
    .populate("route");

exports.updateSchedule = (id, data) =>
  Schedule.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

exports.deleteSchedule = (id) =>
  Schedule.findByIdAndDelete(id);