const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};
 
router.get('/', authCheck, (req, res) => {
    res.send('heippa hei profiili');
});

module.exports = router;