const express=require('express');
const cors=require('cors');
const queryRoutes=require('./Routes/query.js');
const {authMiddleware}=require('./Middleware/auth.js')
const {ErrorMiddleware}=require('./Utility/errorHandler.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.use('/api',queryRoutes);


app.get('/', (req, res) => {
    res.json({
      message: 'Mini Data Query Simulation Engine API',
      endpoints: [
        '/api/query - Process natural language queries',
        '/api/explain - Get query breakdown',
        '/api/validate - Check query feasibility'
      ]
    });
  });

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})