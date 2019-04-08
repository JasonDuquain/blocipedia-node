module.exports = {
    
    validateUsers(req, res, next) {
        if (req.method === "POST") {
            req.checkBody("email", "email must be valid").isEmail();
            req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
            
            if (req.path === '/users/signup') { // only run this check when a user signs up
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
    },
    
    validateWikis(req, res, next) {
        if (req.method === "POST") {
            req.checkBody('title', 'title must be at least 3 characters in length').isLength({min: 3});
            req.checkBody('description', 'body must be at least 6 characters in length').isLength({min: 6});
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


