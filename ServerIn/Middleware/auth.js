// const { tryCatcher } = require("../Utility/errorHandler");

// // Simple authentication middleware
// const authMiddleware = tryCatcher(async(req,res,next)=>{
//   const apiKey = req.headers['x-api-key'];
  
//   // For demo purposes, accept any API key or no API key
//   if (!apiKey) {
//     console.log('Warning: No API key provided');
//   } else {
//     console.log(`API key provided: ${apiKey}`);
//   }
  
//   // For this demo, we'll always proceed
//   next();
// })

//   module.export={authMiddleware}