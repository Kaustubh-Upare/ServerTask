# Mini Data Query Simulation Engine

## 🚀 Project Overview
This is a lightweight backend service that simulates an AI-powered data query system. It allows non-technical users to ask natural language questions and receive structured database insights, eliminating the need for a dedicated data team.

---
## 🎯 Features
- **Natural Language Query Processing**: Converts user queries into structured pseudo-SQL queries.
- **Mock Database Connection**: Uses in-memory storage to simulate a database.
- **Query Breakdown Explanation**: Returns a breakdown of how the query is interpreted.
- **Query Validation**: Checks if the query is valid before execution.
- **Lightweight Authentication**: Implements basic authentication.
- **Error Handling**: Ensures stability with structured error responses.

---
## 📌 API Endpoints
### **1️⃣ Process Query**
- **Endpoint:** `POST /api/query`
- **Description:** Accepts a natural language query and returns a pseudo-SQL translation.
- **Request Example:**
  ```json
  {
    "query": "How many sales were made last month?"
  }
  ```
- **Response Example:**
  ```json
  {
    "success": true,
    "data": {
      "originalQuery": "How many sales were made last month?",
      "sqlQuery": "SELECT COUNT(*) FROM sales WHERE date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)",
      "results": []
    }
  }
  ```

### **2️⃣ Explain Query**
- **Endpoint:** `POST /api/explain`
- **Description:** Returns a breakdown of how the query is interpreted.
- **Response Example:**
  ```json
  {
    "query": "Show me the top 10 products",
    "explanation": "Retrieves the 10 most sold products from the database."
  }
  ```

### **3️⃣ Validate Query**
- **Endpoint:** `POST /api/validate`
- **Description:** Checks query feasibility before execution.
- **Response Example:**
  ```json
  {
    "query": "Show me all employees",
    "valid": true
  }
  ```

---
## 🗃 Mock Database Structure
### **Sales Table**
| id | product_id | customer_id | amount | date |
|----|-----------|-------------|--------|------------|
| 1  | 101       | 201         | 199.99 | 2023-03-15 |
| 2  | 102       | 202         | 99.50  | 2023-03-16 |
| ... | ...       | ...         | ...    | ...        |

### **Customers Table**
| id  | name        | email            | age | status  | created_at |
|-----|------------|------------------|-----|---------|------------|
| 201 | John Doe   | john@example.com | 35  | active  | 2023-01-15 |
| 202 | Jane Smith | jane@example.com | 28  | active  | 2023-01-20 |
| ... | ...        | ...              | ... | ...     | ...        |

### **Products Table**
| id  | product_name       | category        | price   | sales_count |
|-----|--------------------|----------------|---------|-------------|
| 101 | Laptop Pro        | Electronics     | 1299.99 | 145         |
| 102 | Wireless Earbuds  | Electronics     | 99.50   | 320         |
| ... | ...               | ...            | ...     | ...         |

---
## 🛠 Tech Stack
- **Language:** Node.js (Express.js)
- **Database:** SQLite (Mocked with in-memory storage)
- **Hosting Platform:** Render
---
## 📖 Setup Instructions
### **1️⃣ Clone the Repository**
```sh
  git clone https://github.com/Kaustubh-Upare/ServerTask.git
  cd ServerIn
```

### **2️⃣ Install Dependencies**
```sh
  npm install
```

### **3️⃣ Start the Server**
```sh
  npm run dev
```

---
## 🌍 Deployment
### **1️⃣ Deploy on Render**
1. Push your code to **GitHub**
2. Go to **Render.com** → New Web Service → Connect GitHub Repo
3. Set **Root Directory:** `ServerIn`
4. Click **Deploy`

---
## 🔥 Testing with Postman
Import the provided **Postman Collection** or use cURL:
```sh
curl -X POST https://internshalaassignmenr.onrender.com/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "How many active customers?"}'
```

---
## 🤖 Future Improvements
- Improve NLP query translation
- Implement real database integration
- Enhance authentication security

---
## 📜 License
This project is licensed under the **MIT License**.

---
## 👨‍💻 Author
Developed by **[Your Name]** 🚀. Connect with me on [LinkedIn](https://linkedin.com/in/yourprofile).

