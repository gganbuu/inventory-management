
import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import session from "express-session";
import passport from "passport";
import configurePassport from "./config/passport.js";

import connectPgSimple from 'connect-pg-simple';
import { pool } from './db/pool.js';

//routes 
import itemsRouter from './routes/itemsRouter.js'
import adminRouter from './routes/adminRouter.js'

const PORT = process.env.APP_PORT || 3000;
const app = express();

// setting views root path.  
app.set("views", path.join(import.meta.dirname, "views"));

// setting assets path for styles
const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

// parses data into the form via request body 
app.use(express.urlencoded({ extended: true }));

// setting views engine.
app.set("view engine", "ejs");

// create pgsimple session
const PgSession = connectPgSimple(session);

// create new session
app.use(session({
  store: new PgSession({ pool, createTableIfMissing: true }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


app.use("/", adminRouter)

app.use("/", itemsRouter)


app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`My first Express app - listening on port ${PORT}!`);
});

