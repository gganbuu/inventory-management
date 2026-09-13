import * as db from '../db/userQueries.js'
import passport from "passport";
import bcrypt from "bcryptjs";

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

export function createPageGet(req, res) {
    res.render("create")
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
