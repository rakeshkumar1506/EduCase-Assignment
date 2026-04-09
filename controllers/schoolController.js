const db = require("../config/db");
const getDistance = require("../utils/distance");

// ➤ Add School API
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({
      success: false,
      message: "Latitude & Longitude must be numbers"
    });
  }

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err
      });
    }

    res.status(201).json({
      success: true,
      message: "School added successfully"
    });
  });
};


// ➤ List Schools API
exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: "Latitude and Longitude are required"
    });
  }

  db.query("SELECT * FROM schools", (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err
      });
    }

    const schoolsWithDistance = results.map((school) => {
      const distance = getDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude
      );

      return {
        ...school,
        distance: distance.toFixed(2)
      };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      data: schoolsWithDistance
    });
  });
};