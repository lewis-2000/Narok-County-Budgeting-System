const express = require('express');
const router = express.Router();



//Swagger functions

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Get an example resource
 *     responses:
 *       200:
 *         description: Successfully retrieved the resource
 */


//Endpoint for the routes
router.get('/example', (req, res) => {
    res.json({ message: 'This is an example resource' });
  });


module.exports = router;