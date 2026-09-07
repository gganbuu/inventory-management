import { body, validationResult, matchedData } from 'express-validator';

export async function homePageGet(req,res) {
    res.render("index");
}

export async function categoriesPageGet(req,res) {
    res.render("categories")
}

export async function productsPageGet(req,res) {
    res.render("products")
}

export async function errorPageGet(req,res) {
    res.render("404");
}