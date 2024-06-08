const express = require('express');
const { getAllReviews, createReview }
 = require('../Controllers/reviewController.js');

const { authenticate,restrict } = require('../auth/verifyToken.js'); // Import the restrict function

const router = express.Router({mergeParams:true });


router.route('/')
.get(getAllReviews)
.post(authenticate, restrict(['patient']), createReview);

module.exports = router;
