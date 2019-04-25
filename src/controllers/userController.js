
const userQueries = require("../db/queries.users.js");
const wikiQueries = require('../db/queries.wikis.js');
const passport = require("passport");
const secretKey = process.env.STRIPE_SECRET_KEY;
const publicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe = require('stripe')(secretKey);

module.exports = {
    
  signup(req, res, next) {
    res.render("users/signup");
  },
    
  create(req, res, next) {
    let newUser = {
      name: req.body.name,
      username: (req.body.username).toLowerCase(),
      email: (req.body.email).toLowerCase(),
      password: req.body.password,
      passwordConfirmation: req.body.passwordconf
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err) {
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
    
       //CHECK SYNTAX BELOW - it is working but a comma might be needed after ('local)
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
  },
   
    show(req, res, next) {
        res.render("users/show");
    },
    
    upgradeForm(req, res, next){
    res.render('users/upgrade');
  },

  upgrade(req, res, next){
      stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
        .then((customer) => {
          stripe.charges.create({
            amount: 1500,
            currency: "usd",
            customer: customer.id,
            description: "Premium membership"
          })
        })
        .then((charge) => {
          userQueries.upgradeUser(req.user.dataValues.id);
          res.render("users/upgrade_success");
        })
  },

  upgraded(req, res, next){
    res.render('users/upgrade_success');
  },

  downgrade(req, res, next) {
    userQueries.downgradeUser(req.user.dataValues.id);
      wikiQueries.makePrivate(req.user.dataValues.id);
    req.flash("notice", "You have successfully downgraded your account!");
    res.redirect("/");
  },
    
  showCollaborations(req, res, next) {
     userQueries.getUser(req.user.id, (err, result) => {
         
       user = result["user"];
       collaborations = result["collaborations"];
         
       if (err || user == null) {
         res.redirect(404, "/");
       } else {
         res.render("users/collaborations", { user, collaborations });
       }
         
     });
  }
    

}