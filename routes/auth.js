
import bcrypt from 'bcrypt';
import db from '../routes/db.js';
import session from 'express-session';
import { Router } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';

const router = Router();
router.use(passport.initialize());
router.use(passport.session());

const saltRounds = 10;


router.get('/register', (req, res) => {
    res.render('sign-up', { user: req.user });
});
router.get("/login", (req, res) => {
    res.render("login", { user: req.user })
}
);
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        // Redirect to the home page after logging out
        res.redirect('/');
    });
});
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
);

router.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);

        if (checkResult.rows.length > 0) {
            res.redirect("/login");
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err);
                } else {
                    const result = await db.query(
                        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
                        [email, hash]
                    );
                    const user = result.rows[0];
                    req.login(user, (err) => {
                        console.log("success");
                        res.redirect("/");
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
});


// middlewares/auth.js
export function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    }
    return res.status(401).json({ error: 'Unauthorized: Please log in.' }); // User is not authenticated
}


passport.use(
    new Strategy(async function verify(username, password, cb) {
        try {
            const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
                username,
            ]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                const storedHashedPassword = user.password;
                bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                    if (err) {
                        //Error with password check
                        console.error("Error comparing passwords:", err);
                        return cb(err);
                    } else {
                        if (valid) {
                            //Passed password check
                            return cb(null, user);
                        } else {
                            //Did not pass password check
                            return cb(null, false);
                        }
                    }
                });
            } else {
                return cb("User not found");
            }
        } catch (err) {
            console.log(err);
        }
    })
);


passport.serializeUser((user, cb) => {
    cb(null, user); // Store user object in session
});

passport.deserializeUser((user, cb) => {
    cb(null, user); // Retrieve user object from session
});

export default router;