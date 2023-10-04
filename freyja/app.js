const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port =  5000;


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));  
app.use('css', express.static(__dirname+'public/css'));
app.use('js', express.static(__dirname+'public/js'));
app.use('media', express.static(__dirname+'public/media'));

//Swagger API configuration

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Data Collections',
        version: '1.0.0',
        description: 'API documentation for Your API',
      },
      basePath: 'localhost:3000/',
    },
    apis: ['./routes/*.js'] // Path to your API routes
  };
  
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//routes
const homeRouter = require('./routes/home');
const mainRouter = require('./routes/main');
const adminRouter = require('./routes/admin');
const testSwaggerRouter = require('./routes/testSwagger');

app.use('/', homeRouter);
app.use('/main', mainRouter);
app.use('/admin', adminRouter);
app.use('/test', testSwaggerRouter);



app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});