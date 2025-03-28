// Simple authentication middleware
export const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    // For demo purposes, accept any API key or no API key
    if (!apiKey) {
      console.log('Warning: No API key provided');
    } else {
      console.log(`API key provided: ${apiKey}`);
    }
    
    // For this demo, we'll always proceed
    next();
  };
  