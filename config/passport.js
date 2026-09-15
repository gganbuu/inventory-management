import bcrypt from "bcryptjs";
import LocalStrategy from "passport-local";
import * as userdb from "../db/userQueries.js";

const INVALID_CREDENTIALS = "Incorrect username or password";

// Used when the username doesn't exist, so a wrong username takes as long as a wrong password.
// The 10 must match the cost you found above.
const DUMMY_HASH = bcrypt.hashSync("dummy-password-never-matches", 10);

export default function configurePassport(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await userdb.findUserByUsernameWithHash(username);
        const match = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);

        if (!user || !match) {
          return done(null, false, { message: INVALID_CREDENTIALS });
        }

        const { password: _hash, ...safeUser } = user;   // drop the hash before it goes any further
        return done(null, safeUser);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      done(null, await userdb.getUserId(id));   // null → treated as logged out, not a 500
    } catch (err) {
      done(err);
    }
  });
}
