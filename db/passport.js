import { pool } from './pool.js';
import bcrypt from 'bcryptjs';
import passport from "passport";
import LocalStrategy from 'passport-local';
import * as db from './userQueries.js'

const strategy = new LocalStrategy((async (username, password, done) => {
        try {
            const user = await db.getUserUsername(username) 
        if (!user) {
          return done(null, false, { message: "Incorrect username or password"});
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return done(null, false, { message: "Incorrect username or password" });
        }
        return done(null, user);
        } catch(err) {
            return done(err);
        }
    }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserId(id)
    done(null, user);
  } catch(err) {
    done(err);
  }
});

passport.use(strategy)