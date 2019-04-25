const User = require("./models").User;
const bcrypt = require("bcryptjs");
const Collaborator = require("./models").Collaborator;

module.exports = {

    createUser(newUser, cb) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
            name: newUser.name,
            email: newUser.email,
            password: hashedPassword
        })
        .then((user) => {
            cb(null, user);
        })
        .catch((err) => {
            cb(err);
        });
    },
    
    getUser(id, cb) {
        let result = {};
        
        User.findById(id)
        .then((user) => {
            if(!user) {
                
                cb(404);
                
            } else {
                
                result["user"] = user;
                
                Collaborator.scope({ method: ["userCollaboratorsFor", id] }).all()
                .then((collaborations) => {
                    result["collaborations"] = collaborations;
                    callback(null, result);
                })
                .catch((err) => {
                    callback(err);
                })
            }
         });
     },
    
      upgradeUser(id, callback){
            return User.findById(id)
            .then((user) => {
                if(!user) {
                    return callback(404);
                } else {
                    return user.updateAttributes({ role: 'premium' });
                }
            })
            .catch((err) => {
                callback(err);
            })
        },

        downgradeUser(id, callback){
            return User.findById(id)
            .then((user) => {
                if(!user){
                    return callback(404);
                } else {
                    return user.updateAttributes({ role: 'standard' });
                }
            })
            .catch((err) => {
                callback(err);
            })
        }
    
    
}