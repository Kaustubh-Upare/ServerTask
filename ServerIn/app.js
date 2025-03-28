const express=require('express');
const cors=require('cors');
const queryRoutes=require('./Routes/query.js');
const {ErrorMiddleware}=require('./Utility/errorHandler.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(ErrorMiddleware);

app.use('/api',queryRoutes);


app.get('/',(req, res) => {
    res.json({
      message: 'Api Internshala Assignment',
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