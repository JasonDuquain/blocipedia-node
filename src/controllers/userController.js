
const userQueries = require("../db/queries.users.js");
const passport = require("passport");


module.exports = {
    
  signup(req, res, next) {
    res.render("users/signup");
  },
    
  create(req, res, next) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordconf
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err) {
        console.log('error in userController')
        console.log(err)
        req.flash("error", err);
        res.redirect("/users/signup");

      } else {
          const sgMail = require('@sendgrid/mail'); // had to move this here as it could not go with other requires or as the 1st line inside module.exports
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: user.email,
          from: 'jduquain@gmail.com',
          subject: "Thank you for joining Blocipedia!",
          text: 'Login and start collaborating on wikis!'
        };
        sgMail.send(msg);
          
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed up!");
          res.redirect("/");
        })
      }
    });
  },
    
   signInForm(req, res, next) {
    res.render('users/sign_in');
  },
    
   signIn(req, res, next){
       
    passport.authenticate("local")(req, res, function () {
        
      if(!req.user){
          
        req.flash("notice", "Login failed. Please try again.")
        res.redirect("/users/sign_in");
      } else {         
          
        req.flash("notice", "You are successfully signed in!");
        res.redirect("/");
      }
    })
  },
    
   signOut(req, res, next) {
    req.logout();
    req.flash('notice', "You have successfully signed out!");
    res.redirect('/');
  } 

}