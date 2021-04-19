import { Router } from 'express';

// Export module for registering router in express app
const router: Router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export default router;
