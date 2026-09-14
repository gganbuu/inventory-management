import {body, validationResult, matchedData } from 'express-validator'
import * as userdb from '../db/userQueries.js'
import * as itemdb from '../db/itemQueries.js'
import passport from "passport";
import bcrypt from "bcryptjs";
import { ExpressValidator } from 'express-validator';

const validateCreatePost = [ 
    body("name").trim().notEmpty().withMessage('Name must not be empty'),
    body("devices").trim().notEmpty().withMessage('Devices must not be empty'),
    body("price").trim().toFloat().notEmpty().withMessage('Price must not be empty')
                 .isFloat({min: 0}).withMessage('Price must not be negative and/or must be a floating point decimal'),
    body("stock").trim().notEmpty().withMessage('Stock must not be empty')
                 .isInt({min:0}).withMessage('Stock must not be negative and/or must be an integer'),
    body("colour").trim().notEmpty().withMessage("Colour must not be empty")
                  .isAlpha().withMessage("Colour must only contain letters"),
    body("brand").trim().notEmpty().withMessage("Brand must not be empty")
                 .isAlphanumeric().withMessage("Brand must only contain numbers or letters")
                 .custom(value => value[0] === value[0].toUpperCase()).withMessage("First letter of brand must be capitalised"),
    body("description").trim().notEmpty().withMessage("Description must not be empty")
]

export async function loginGet(req,res) {
    const messages = req.session.messages || [];
    const message = messages.at(-1);
    req.session.messages = [];  
    res.render("login", { message });
}


export const loginPost = passport.authenticate("local", {
        successRedirect: "/create",
        failureRedirect: "/login",
        failureMessage: true,
    });

export function unauthorisedGet(req, res) {
    res.render("unauthorised")
}

export const createPagePost = [
    validateCreatePost,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const pastValues = { 
                name: req.body.name, 
                devices: req.body.devices,
                price: req.body.price,
                stock: req.body.stock,
                colour: req.body.colour,
                brand: req.body.brand,
                description: req.body.description
            };
            return res.render("create", {
                errors: errors.array(),
                pastValues: pastValues
            });
        }
        const {name, devices, price, stock, colour, brand, description} = matchedData(req);
        await itemdb.createItem({name, devices, price, stock, colour, brand, description});
        res.redirect("/editdelete")
    }

] 

export function createPageGet(req, res) {
    res.render("create")
}

export async function editDeletePageGet(req, res) {
    const products = await itemdb.productsPageGet()
    console.log(products)
    res.render("editdelete", {products: products})
}

export function isAuthorised(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("unauthorised")
    }
}

export async function logoutGet(req,res) {
    req.logout((err) => {
    if (err) { 
      return next(err); 
    }})
    res.redirect("/");
}


// export async function signUpGet(req,res) {
//     res.render('signup')
// }

// export async function signUpPost(req,res) {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password,10)
//         await db.signUpPost(req.body.username, hashedPassword)
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// }
