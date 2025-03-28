const express=require('express')
const router = express.Router();
const {processQuery,explainQuery,validateQuery}=require('../Controller/queryController.js');
const { authMiddleware } = require('../Middleware/auth.js');

router.use(authMiddleware)

router.post('/query', processQuery);
router.post('/explain', explainQuery);
router.post('/validate', validateQuery);

module.exports=router
