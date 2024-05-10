import app from './app.ts';
import '../knexfile.ts'
import { errorHandler } from './middleware/errorHandler.ts';

const PORT = process.env.PORT || 5000;

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});