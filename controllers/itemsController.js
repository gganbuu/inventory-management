import { body, validationResult, matchedData } from 'express-validator';
import * as db from '../db/queries.js'


export async function homePageGet(req,res) {
    res.render("index");
}

export async function categoriesPageGet(req,res) {
    res.render("categories")
}

export async function productsPageGet(req,res) {
    let devices = req.query.devices
    let brand = req.query.brand
    // need to perform some validation on priceFrom and priceTo
    let priceFrom = req.query.priceFrom
    let priceTo = req.query.priceTo
    console.log({brand, devices, priceFrom, priceTo})
    const products = await db.productsPageGet({brand, devices, priceFrom, priceTo})
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