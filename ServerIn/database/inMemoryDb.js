// Mock database with sample data
const database = {
    sales: [
      { id: 1, product_id: 101, customer_id: 201, amount: 199.99, date: '2023-03-15' },
      { id: 2, product_id: 102, customer_id: 202, amount: 99.50, date: '2023-03-16' },
      { id: 3, product_id: 103, customer_id: 203, amount: 149.75, date: '2023-03-17' },
      { id: 4, product_id: 101, customer_id: 204, amount: 199.99, date: '2023-03-18' },
      { id: 5, product_id: 104, customer_id: 205, amount: 299.99, date: '2023-03-19' },
      { id: 6, product_id: 102, customer_id: 201, amount: 99.50, date: '2023-03-20' },
      { id: 7, product_id: 105, customer_id: 206, amount: 79.99, date: '2023-03-21' },
      { id: 8, product_id: 103, customer_id: 207, amount: 149.75, date: '2023-03-22' },
      { id: 9, product_id: 106, customer_id: 208, amount: 399.99, date: '2023-03-23' },
      { id: 10, product_id: 107, customer_id: 209, amount: 599.99, date: '2023-03-24' }
    ],
    
    customers: [
      { id: 201, name: 'John Doe', email: 'john@example.com', age: 35, status: 'active', created_at: '2023-01-15' },
      { id: 202, name: 'Jane Smith', email: 'jane@example.com', age: 28, status: 'active', created_at: '2023-01-20' },
      { id: 203, name: 'Bob Johnson', email: 'bob@example.com', age: 42, status: 'inactive', created_at: '2023-01-25' },
      { id: 204, name: 'Alice Brown', email: 'alice@example.com', age: 31, status: 'active', created_at: '2023-02-01' },
      { id: 205, name: 'Charlie Davis', email: 'charlie@example.com', age: 45, status: 'active', created_at: '2023-02-05' },
      { id: 206, name: 'Eva Wilson', email: 'eva@example.com', age: 29, status: 'active', created_at: '2023-02-10' },
      { id: 207, name: 'Frank Miller', email: 'frank@example.com', age: 38, status: 'inactive', created_at: '2023-02-15' },
      { id: 208, name: 'Grace Taylor', email: 'grace@example.com', age: 33, status: 'active', created_at: '2023-02-20' },
      { id: 209, name: 'Henry Clark', email: 'henry@example.com', age: 40, status: 'active', created_at: '2023-02-25' }
    ],
    
    products: [
      { id: 101, product_name: 'Laptop Pro', category: 'Electronics', price: 1299.99, sales_count: 145 },
      { id: 102, product_name: 'Wireless Earbuds', category: 'Electronics', price: 99.50, sales_count: 320 },
      { id: 103, product_name: 'Smart Watch', category: 'Electronics', price: 249.75, sales_count: 210 },
      { id: 104, product_name: 'Premium Coffee Maker', category: 'Home Appliances', price: 199.99, sales_count: 95 },
      { id: 105, product_name: 'Bluetooth Speaker', category: 'Electronics', price: 79.99, sales_count: 175 },
      { id: 106, product_name: 'Smartphone X', category: 'Electronics', price: 899.99, sales_count: 280 },
      { id: 107, product_name: 'Gaming Console', category: 'Electronics', price: 499.99, sales_count: 120 }
    ]
  };
  
  // Simple query execution function
const executeQuery = (sqlQuery) => {
    console.log(`Executing query: ${sqlQuery}`);
    
    // Very basic SQL parsing - in a real system this would use a proper SQL parser
    const lowerQuery = sqlQuery.toLowerCase();
    
    // Determine which table to query
    let tableName = '';
    if (lowerQuery.includes('from sales')) {
      tableName = 'sales';
    } else if (lowerQuery.includes('from customers')) {
      tableName = 'customers';
    } else if (lowerQuery.includes('from products')) {
      tableName = 'products';
    } else {
      return { error: 'Unknown table in query' };
    }
    
    // Get the data
    const tableData = database[tableName];
    
    // Handle COUNT queries
    if (lowerQuery.includes('count(*)')) {
      let filteredData = [...tableData];
      
      // Apply WHERE clause if present
      if (lowerQuery.includes('where')) {
        filteredData = applyWhereClause(filteredData, lowerQuery);
      }
      
      return { count: filteredData.length };
    }
    
    // Handle AVG queries
    if (lowerQuery.includes('avg(')) {
      const matches = lowerQuery.match(/avg$$([^)]+)$$/);
      if (matches && matches[1]) {
        const field = matches[1].trim();
        let filteredData = [...tableData];
        
        // Apply WHERE clause if present
        if (lowerQuery.includes('where')) {
          filteredData = applyWhereClause(filteredData, lowerQuery);
        }
        
        // Calculate average
        const sum = filteredData.reduce((acc, item) => acc + (item[field] || 0), 0);
        return { average: sum / filteredData.length };
      }
    }
    
    // Handle SELECT queries
    let filteredData = [...tableData];
    
    // Apply WHERE clause if present
    if (lowerQuery.includes('where')) {
      filteredData = applyWhereClause(filteredData, lowerQuery);
    }
    
    // Apply ORDER BY if present
    if (lowerQuery.includes('order by')) {
      filteredData = applyOrderBy(filteredData, lowerQuery);
    }
    
    // Apply LIMIT if present
    if (lowerQuery.includes('limit')) {
      const limitMatch = lowerQuery.match(/limit\s+(\d+)/i);
      if (limitMatch && limitMatch[1]) {
        const limit = parseInt(limitMatch[1]);
        filteredData = filteredData.slice(0, limit);
      }
    }
    
    return filteredData;
  };
  
  // Helper function to apply WHERE clause
  function applyWhereClause(data, query) {
    // This is a very simplified WHERE clause parser
    // In a real system, this would be much more sophisticated
    
    if (query.includes("status = 'active'")) {
      return data.filter(item => item.status === 'active');
    }
    
    if (query.includes('date >=')) {
      // Simplified date filtering - in reality would need proper date parsing
      if (query.includes('interval 1 month')) {
        // Filter for last month
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return data.filter(item => new Date(item.date) >= oneMonthAgo);
      }
    }
    
    if (query.includes('year(date) = year(curdate())')) {
      // Filter for current year
      const currentYear = new Date().getFullYear();
      return data.filter(item => new Date(item.date).getFullYear() === currentYear);
    }
    
    if (query.includes('created_at >=')) {
      // Filter for recently created
      if (query.includes('interval 1 month')) {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return data.filter(item => new Date(item.created_at) >= oneMonthAgo);
      }
    }
    
    return data;
  }
  
  // Helper function to apply ORDER BY
  function applyOrderBy(data, query) {
    if (query.includes('order by')) {
      const orderByMatch = query.match(/order by\s+([^\s]+)\s+(asc|desc)?/i);
      if (orderByMatch) {
        const field = orderByMatch[1];
        const direction = orderByMatch[2]?.toLowerCase() || 'asc';
        
        return [...data].sort((a, b) => {
          if (direction === 'desc') {
            return b[field] - a[field];
          } else {
            return a[field] - b[field];
          }
        });
      }
    }
    
    return data;
  }
  
module.exports={executeQuery}