import createError from 'http-errors';
import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './config/database.config';
import todoRouter from './routes/product';
import usersRouter from './routes/users';
import homepage from './routes/page'

const app = express();

//DB Connection
db.sync().then(()=>{
  console.log('Database connected successfully')
}).catch(error=>{
  console.log(error)
})



// view engine setup

// Specify the directory where EJS templates are located (optional)
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', todoRouter);
app.use('/', usersRouter);
app.use('/', homepage);

// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// Error handling middleware
app.use(function(err:createError.HttpError, req:Request, res:Response, next:NextFunction) {
  res.status(err.status || 500); // Set the HTTP status code for the error

  // Render the error view with the error message
  res.render('error', {
    message: err.message,
    error: err // Pass the error object if needed
  });
});


export default app;
