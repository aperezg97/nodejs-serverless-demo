import express, { Application, Request, Response } from "express";
import serverless from "serverless-http";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.router";
import usersRouter from "./routes/users.router";

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get(
    "/test",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello World!",
        });
    }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err: any, req: Request, res: Response, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error.message}`);
}

// module.exports = (app);
module.exports.handler = serverless(app);
