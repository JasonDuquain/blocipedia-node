module.exports = {
    validateUsers(req, res, next) {
        if (req.method === "POST") {
            
            //console.log(req)
            
            req.checkBody("email", "email must be valid").isEmail();
            req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
            
            if (req.path === '/users/signup') { //ONLY DO THIS CHECK WHEN A USER SIGNS UP
                req.checkBody("passwordconf", "must match password provided").matches(req.body.password);
            }
            
        }
        
        
        const errors = req.validationErrors();
        if (errors) {
            
            req.flash("error", errors);
            return res.redirect(303, req.headers.referer);
        } else {
            
            return next();
        }
    }
}

