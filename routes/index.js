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
router.get('/feedback', (req, res) => {
    req.db.query("SELECT * FROM comments", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("DB error");
        }
        res.render('feedback', { comments: results });
    });
});

/* GET order online page */
router.get('/order_online', function(req, res, next){
  res.render('order_online');
});

/* POST route to add a new menu item (optional) */
router.post('/feedback/send', function(req, res, next){
  const { first_name, last_name, rating, comment } = req.body;

  const query = `
    INSERT INTO comments (first_name, last_name, rating, comment)
    VALUES (?, ?, ?, ?);
  `;

  req.db.query(query, [first_name, last_name, rating, comment], (err, results) => {
    if (err) {
      console.error('Error adding comment:', err);
      return res.status(500).send('Error adding comment');
    }
    console.log('Comment added successfully:', results);
    res.redirect('/feedback'); // Redirect to menu page after adding
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
