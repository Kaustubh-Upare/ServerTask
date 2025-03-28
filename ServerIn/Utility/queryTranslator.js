// Simple natural language to SQL translator
export const translateToSQL = (query) => {
    const lowerQuery = query.toLowerCase();
    let sqlQuery = '';
    
    // Very basic translation logic - in a real system this would be much more sophisticated
    if (lowerQuery.includes('how many')) {
      // Count query
      if (lowerQuery.includes('sales')) {
        sqlQuery = 'SELECT COUNT(*) FROM sales';
        
        // Add conditions
        if (lowerQuery.includes('last month')) {
          sqlQuery += " WHERE date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
        } else if (lowerQuery.includes('this year')) {
          sqlQuery += " WHERE YEAR(date) = YEAR(CURDATE())";
        }
      } else if (lowerQuery.includes('customers')) {
        sqlQuery = 'SELECT COUNT(*) FROM customers';
        
        // Add conditions
        if (lowerQuery.includes('active')) {
          sqlQuery += " WHERE status = 'active'";
        }
      }
    } else if (lowerQuery.includes('average') || lowerQuery.includes('avg')) {
      // Average query
      if (lowerQuery.includes('sales')) {
        sqlQuery = 'SELECT AVG(amount) FROM sales';
        
        // Add conditions
        if (lowerQuery.includes('last month')) {
          sqlQuery += " WHERE date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
        }
      } else if (lowerQuery.includes('age') && lowerQuery.includes('customers')) {
        sqlQuery = 'SELECT AVG(age) FROM customers';
      }
    } else if (lowerQuery.includes('list') || lowerQuery.includes('show me')) {
      // Select query
      if (lowerQuery.includes('top') && lowerQuery.includes('products')) {
        sqlQuery = 'SELECT product_name, sales_count FROM products ORDER BY sales_count DESC LIMIT 10';
      } else if (lowerQuery.includes('customers')) {
        sqlQuery = 'SELECT * FROM customers';
        
        // Add conditions
        if (lowerQuery.includes('new')) {
          sqlQuery += " WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
        }
      }
    } else {
      // Default to a simple select
      sqlQuery = 'SELECT * FROM ';
      
      if (lowerQuery.includes('sales')) {
        sqlQuery += 'sales';
      } else if (lowerQuery.includes('customers')) {
        sqlQuery += 'customers';
      } else if (lowerQuery.includes('products')) {
        sqlQuery += 'products';
      } else {
        sqlQuery += 'unknown_table';
      }
      
      sqlQuery += ' LIMIT 10';
    }
    
    return sqlQuery;
  };
  