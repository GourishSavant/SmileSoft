import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Authentication API',
      version: '1.0.0',
      description: 'User registration, login, and profile management',
    },
  },

  apis: ['./routes/authRoutes.js','./routes/protectedRoute.js','./routes/roleRoute.js','./routes/permissionRoute.js','./routes/staffRoute.js','./routes/permissionCheck.js'],  
};

// Generate Swagger docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Export Swagger UI setup
export { swaggerUi, swaggerDocs };
