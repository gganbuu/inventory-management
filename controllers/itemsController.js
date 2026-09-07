import { body, validationResult, matchedData } from 'express-validator';
import * as db from '../db/queries.js'


export async function homePageGet(req,res) {
    res.render("index");
}

export async function categoriesPageGet(req,res) {
    res.render("categories")
}

export async function productsPageGet(req,res) {
    const products = await db.productsPageGet()
    res.render("products", { products: products })
}

export async function itemPageGet(req, res) {
    let name = req.query.name;
    const item = await db.itemPageGet(name)
    res.render("item", {item: item})
}

export async function errorPageGet(req,res) {
    res.render("404");
}