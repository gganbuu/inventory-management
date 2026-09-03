import { body, validationResult, matchedData } from 'express-validator';

export async function homePageGet(req,res) {
    res.render("index");
}
