# 🏫 School Management API

A RESTful API built with **Node.js**, **Express**, and **MySQL** that allows you to add schools and retrieve them sorted by proximity using the **Haversine formula**.

🚀 **Live API:** [https://educase-assignment-mxah.onrender.com](https://educase-assignment-mxah.onrender.com)

---

## 📦 Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Runtime    | Node.js            |
| Framework  | Express.js v5      |
| Database   | MySQL (Clever Cloud)|
| Deployment | Render             |
| ORM/Driver | mysql2             |

---

## 📁 Project Structure

```
school-api/
├── config/
│   └── db.js               # MySQL connection setup
├── controllers/
│   └── schoolController.js # Business logic
├── routes/
│   └── schoolRoutes.js     # API route definitions
├── utils/
│   └── distance.js         # Haversine distance calculator
├── .env                    # Environment variables (not committed)
├── .gitignore
├── package.json
└── server.js               # Entry point
```

---

## 🔧 Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/rakeshkumar1506/EduCase-Assignment.git
cd EduCase-Assignment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_db_adv
DB_PORT=3306
PORT=8000
```

### 4. Create the MySQL table
```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

### 5. Start the server
```bash
# Development
npx nodemon server.js

# Production
npm start
```

---

## 🌐 API Endpoints

### ➕ Add School

**POST** `/addSchool`

**Request Body (JSON):**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Noida",
  "latitude": 28.5355,
  "longitude": 77.3910
}
```

**Success Response `201`:**
```json
{
  "success": true,
  "message": "School added successfully"
}
```

**Error Response `400`:**
```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

### 📍 List Schools (Sorted by Distance)

**GET** `/listSchools?latitude=28.5355&longitude=77.3910`

**Query Parameters:**

| Parameter   | Type   | Required | Description              |
|-------------|--------|----------|--------------------------|
| `latitude`  | Float  | ✅ Yes   | User's current latitude  |
| `longitude` | Float  | ✅ Yes   | User's current longitude |

**Success Response `200`:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Sector 45, Noida",
      "latitude": 28.5355,
      "longitude": 77.391,
      "distance": "0.00"
    },
    {
      "id": 2,
      "name": "Ryan International School",
      "address": "Sector 31, Noida",
      "latitude": 28.5706,
      "longitude": 77.3219,
      "distance": "7.43"
    }
  ]
}
```

> 📏 Distance is calculated using the **Haversine formula** and returned in **kilometers**.

---

## 🧮 Haversine Formula

The API uses the Haversine formula to calculate the great-circle distance between two points on Earth given their latitude and longitude.

```
a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)
c = 2 × atan2(√a, √(1−a))
d = R × c   (R = 6371 km)
```

---

## ☁️ Deployment (Render + Clever Cloud)

Set the following environment variables in your **Render dashboard**:

| Key           | Value                          |
|---------------|--------------------------------|
| `DB_HOST`     | Your Clever Cloud MySQL host   |
| `DB_USER`     | Your Clever Cloud MySQL user   |
| `DB_PASSWORD` | Your Clever Cloud MySQL password |
| `DB_NAME`     | Your Clever Cloud database name |
| `DB_PORT`     | `3306`                         |

---

## 👨‍💻 Author

**Rakesh Kumar**
- GitHub: [@rakeshkumar1506](https://github.com/rakeshkumar1506)
