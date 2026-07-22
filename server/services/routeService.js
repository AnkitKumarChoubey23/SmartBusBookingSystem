const Route = require("../models/Route");

exports.createRoute = (data) => Route.create(data);

exports.getAllRoutes = () => Route.find();

exports.getRouteById = (id) => Route.findById(id);

exports.updateRoute = (id, data) =>
  Route.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

exports.deleteRoute = (id) =>
  Route.findByIdAndDelete(id);