//authentication
const withAuthn = (req, res, next)=>{
    //if the
    if(!req.session.logged_in){
        res.redirect('/login');
    }else{
        next();
    }
};

module.exports = withAuthn;