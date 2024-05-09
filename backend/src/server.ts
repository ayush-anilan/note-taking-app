import app from './app';
import '../knexfile'
import { errorHandler } from './middleware/errorHandler';

const PORT = process.env.PORT || 5000;

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});