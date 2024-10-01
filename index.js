import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import homeRoutes from './routes/home.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import session from 'express-session';
import passport from 'passport';
import checkoutRoutes from './routes/checkout.js';


dotenv.config();

const app = express();
const envPort = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', homeRoutes);
app.use('/', productRoutes);
app.use('/', authRoutes);
app.use('/', cartRoutes);
app.use('/', checkoutRoutes);

app.listen(envPort, () => {
  console.log(`Server is running on port ${envPort}`);
});
