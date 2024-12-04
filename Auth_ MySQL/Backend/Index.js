


  import express from 'express';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import cookieParser from 'cookie-parser';
  import bodyParser from 'body-parser';
  import authRoute from './routes/authRoutes.js'; // Correct path
  // import config from './config/config.js'; // Correct path to the config file
  import { swaggerUi, swaggerDocs } from "./configuration/swagger.js";  // Import Swagger setup

// import express from 'express';/
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoute from './routes/authRoutes.js'
import protectedRoute from './routes/protectedRoute.js'
import config from './config.js';
// import { swaggerUi, swaggerDocs } from "./configuration/swagger.js";  // Import Swagger setup
  
  dotenv.config();
  const app = express();
  
  // Middleware se
  // app.use(cors());
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(bodyParser.json());
  
  // Root route
  app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });
  
  // Swagger UI setup
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
  // Mount authentication routes
  app.use('/auth', authRoute);
  app.use('/auth/v1', protectedRoute);
  
  // Middleware to log requests
  app.use((req, res, next) => {
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
  });
  
  // Server setup
  const PORT = config.port;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  