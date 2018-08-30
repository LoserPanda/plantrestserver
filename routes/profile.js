const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};
 
router.get('/', authCheck, (req, res) => {
    res.send('Heippa hei profiili! ID on: ' +  req.user.userID + " ja googleID on: " + req.user.googleID);
});

module.exports = router;