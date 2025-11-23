var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next){
  res.render('index');
});

/* GET about page */
router.get('/about', function(req, res, next){
  res.render('about');
});

/* GET menu page */
router.get('/menu', function(req, res, next){
  req.db.query('SELECT * FROM menu', (err, results) => {
    if (err) {
      console.error('Error fetching menu:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Render the menu view and pass the results to Pug
    res.render('menu', { menu: results });
  });
});

/* GET feedback page */
router.get('/feedback', function(req, res, next){
  res.render('feedback');
});

/* GET order online page */
router.get('/order_online', function(req, res, next){
  res.render('order_online');
});

/* POST route to add a new menu item (optional) */
router.post('/menu/create', function(req, res, next){
  const { donutname, typenumber, typename, price, description } = req.body;

  const query = `
    INSERT INTO menu (donutname, typenumber, typename, price, description)
    VALUES (?, ?, ?, ?, ?);
  `;

  req.db.query(query, [donutname, typenumber, typename, price, description], (err, results) => {
    if (err) {
      console.error('Error adding menu item:', err);
      return res.status(500).send('Error adding menu item');
    }
    console.log('Menu item added successfully:', results);
    res.redirect('/menu'); // Redirect to menu page after adding
  });
});

/* POST route to delete a menu item (optional) */
router.post('/menu/delete', function(req, res, next){
  const { id } = req.body;

  req.db.query('DELETE FROM menu WHERE id = ?;', [id], (err, results) => {
    if (err) {
      console.error('Error deleting menu item:', err);
      return res.status(500).send('Error deleting menu item');
    }
    console.log('Menu item deleted successfully:', results);
    res.redirect('/menu'); // Redirect to menu page after deletion
  });
});

module.exports = router;
