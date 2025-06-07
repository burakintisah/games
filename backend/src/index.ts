import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Games Platform Backend API' });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});