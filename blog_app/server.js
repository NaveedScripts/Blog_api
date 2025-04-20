const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


app.get('/', (req, res) => res.send('Simple Blog API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
