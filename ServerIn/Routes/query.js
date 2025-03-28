const express=require('express')
const router = express.Router();
const {processQuery,explainQuery,validateQuery}=require('../Controller/queryController.js');


router.post('/query', processQuery);
router.post('/explain', explainQuery);
router.post('/validate', validateQuery);

module.exports=router
