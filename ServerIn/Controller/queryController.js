const {translateToSQL}=require('../Utility/queryTranslator.js')
const {executeQuery}=require('../database/inMemoryDb.js')
const { ErrorHandler, tryCatcher }=require('../Utility/errorHandler.js');


// Process natural language query
const processQuery=tryCatcher(async(req,res,next)=>{
    const { query } = req.body;
    
    if(!query){
        return next(new ErrorHandler('Query is required',404))
    }
    const sqlQuery = translateToSQL(query);
    const results = executeQuery(sqlQuery);

    res.status(200).json({success: true,
        data: {
          originalQuery: query,
          sqlQuery,
          results
        }
    })
})


const explainQuery=tryCatcher(async(req,res,next)=>{

    const { query } = req.body;
    if(!query){
        return next(new ErrorHandler('Query is required',404))
    }
    const sqlQuery = translateToSQL(query);

    const explanation = {
        steps: [
          { step: 1, description: 'Parse natural language query', details: `Received: "${query}"` },
          { step: 2, description: 'Identify query intent', details: detectQueryIntent(query) },
          { step: 3, description: 'Extract entities and parameters', details: extractEntities(query) },
          { step: 4, description: 'Generate SQL query', details: sqlQuery },
          { step: 5, description: 'Execute against database', details: 'Query would be executed against relevant tables' }
        ],
        estimatedComplexity: calculateComplexity(query)
      };
      
      res.status(200).json({
        success: true,
        data: explanation
      });
})

const validateQuery=tryCatcher(async(req,res,next)=>{

    const { query } = req.body;
    if(!query){
        return next(new ErrorHandler('Query is required',404))
    }
    const validation = validateQueryFeasibility(query);
    
    res.status(200).json({
      success: true,
      data: validation
    });
})
// Helper functions
function detectQueryIntent(query) {
  // Simple intent detection based on keywords
  if (query.toLowerCase().includes('how many')) {
    return 'COUNT query';
  } else if (query.toLowerCase().includes('average') || query.toLowerCase().includes('avg')) {
    return 'AGGREGATE query (AVG)';
  } else if (query.toLowerCase().includes('maximum') || query.toLowerCase().includes('max')) {
    return 'AGGREGATE query (MAX)';
  } else if (query.toLowerCase().includes('minimum') || query.toLowerCase().includes('min')) {
    return 'AGGREGATE query (MIN)';
  } else if (query.toLowerCase().includes('list') || query.toLowerCase().includes('show me')) {
    return 'SELECT query';
  } else {
    return 'GENERAL query';
  }
}

function extractEntities(query) {
  // Simple entity extraction
  const entities = {
    tables: [],
    conditions: [],
    timeframe: null
  };
  
  // Mock entity extraction logic
  if (query.toLowerCase().includes('sales')) {
    entities.tables.push('sales');
  }
  if (query.toLowerCase().includes('customers')) {
    entities.tables.push('customers');
  }
  if (query.toLowerCase().includes('products')) {
    entities.tables.push('products');
  }
  
  // Extract time-related entities
  if (query.toLowerCase().includes('last month')) {
    entities.timeframe = 'last month';
  } else if (query.toLowerCase().includes('this year')) {
    entities.timeframe = 'this year';
  } else if (query.toLowerCase().includes('yesterday')) {
    entities.timeframe = 'yesterday';
  }
  
  return entities;
}

function calculateComplexity(query) {

  const words = query.split(' ').length;
  const hasJoin = query.toLowerCase().includes('join') || 
                 (query.toLowerCase().includes('and') && 
                  extractEntities(query).tables.length > 1);
  const hasAggregation = query.toLowerCase().includes('average') || 
                         query.toLowerCase().includes('count') ||
                         query.toLowerCase().includes('sum');
  
  if (words > 15 && hasJoin && hasAggregation) {
    return 'High';
  } else if ((words > 10 && hasJoin) || hasAggregation) {
    return 'Medium';
  } else {
    return 'Low';
  }
}

function validateQueryFeasibility(query) {

  const entities = extractEntities(query);
  const intent = detectQueryIntent(query);
  
  // Check if we have enough information
  const hasTables = entities.tables.length > 0;
  const isQueryClear = query.length > 10;
  
  // Generate validation result
  return {
    isValid: hasTables && isQueryClear,
    confidence: hasTables && isQueryClear ? 'high' : 'low',
    missingElements: !hasTables ? ['No tables identified'] : [],
    suggestedRefinements: !hasTables ? ['Specify which data tables you want to query'] : [],
    supportedIntent: intent !== 'GENERAL query'
  };
}

module.exports={processQuery,explainQuery,validateQuery}