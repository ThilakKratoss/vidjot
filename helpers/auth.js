module.exports =
{
    ensureAuthenticated: function(req,res,next){
      if(req.isAuthenticated()){
         return next(); 
      }
      req.flash('success_msg','Not Authorized');
      res.redirect('/users/login');
    }
}



/*function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
    
    return next(); }
  
    req.flash('success_msg','Not authorized');
    res.redirect('/users/login');
  }*/



