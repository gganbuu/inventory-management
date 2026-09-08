import { body, validationResult, matchedData } from 'express-validator';
import * as db from '../db/queries.js'

const toArray = (v) => (v === undefined ? [] : [].concat(v))

export async function homePageGet(req,res) {
    res.render("index");
}

export async function categoriesPageGet(req,res) {
    res.render("categories")
}

export async function productsPageGet(req,res) {
    const devices = toArray(req.query.devices);
    const brand = toArray(req.query.brand);
    // need to perform some validation on priceFrom and priceTo
    const priceFrom = req.query.priceFrom ?? "";
    const priceTo = req.query.priceTo ?? "";

    const search = {devices, brand, priceFrom, priceTo}
    console.log({...search})

    
    const products = await db.productsPageGet({...search})
    
    
    res.render("products", { products: products, search: {...search}})
}

export async function itemPageGet(req, res) {
    let name = req.query.name;
    const item = await db.itemPageGet(name)
    res.render("item", {item: item})
}

export async function errorPageGet(req,res) {
    res.render("404");
}