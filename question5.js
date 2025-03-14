const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

const sequelize = new Sequelize('test_db', 'user', '12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'users'
});

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    await sequelize.sync({ force: false });
    console.log('Models synchronized with database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.listen(port, async () => {
  await testConnection();
  console.log(`Server running at http://localhost:${port}`);
});

app.post('/users', async (req, res) => {
    try {
      // Extract user data from request body
      const { name, email, status } = req.body;
      
      // Validate required fields
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
      
      // Create a new user
      const newUser = await User.create({
        name,
        email,
        status: status || 'active' // Use provided status or default to 'active'
      });
      
      // Return the created user with 201 Created status
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      
      // Handle validation errors specifically
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: error.errors.map(e => e.message)
        });
      }
      
      res.status(500).json({ error: 'Failed to create user' });
    }
  });