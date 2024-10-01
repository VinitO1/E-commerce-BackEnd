import { Router } from 'express';
import ejs from 'ejs';

const router = Router();

router.get('/', (req, res) => {
  console.log('User:', req.user);
  console.log('Session:', req.session); 
  res.render('home', { user: req.user });
});

export default router;
