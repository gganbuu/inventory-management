
import 'dotenv/config'
import { body, validationResult } from 'express-validator'
import express from 'express'
import path from 'node:path'

import itemsRouter from './routes/itemsRouter.js'

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

app.use("/", itemsRouter)


app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`My first Express app - listening on port ${PORT}!`);
});

