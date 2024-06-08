const express = require("express");
const {
    updateDoctor,
    deleteDoctor,
    getAllDoctor,
    getSingleDoctor,
    getDoctorProfile
  } = require("../Controllers/doctorController.js");
  const {authenticate,restrict} = require("../auth/verifyToken.js");
  //  prajya
  const reviewRouter = require("./review.js")
const router = express.Router();
// @route   GET api/users
router.use("/:doctorId/reviews",reviewRouter);
router.get('/:id',getSingleDoctor)
router.get('/',getAllDoctor)
router.put('/:id',authenticate,restrict(["doctor"]),updateDoctor)
router.delete('/:id',authenticate,restrict(["doctor"]),deleteDoctor)
router.get('/profile/me',authenticate,restrict(["doctor"]),getDoctorProfile)
module.exports = router;