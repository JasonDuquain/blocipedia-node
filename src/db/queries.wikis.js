const Wiki = require("./models").Wiki;
const Authorizer = require("../policies/application");
const User = require("./models").User;
const Collaborator = require("./models").Collaborators;


module.exports = {

    getAllWikis(callback) {
        return Wiki.all()
        .then((wikis) => {
            callback(null, wikis);
        })
        .catch((err) =>{
            callback(err);
        })
    }, 
    addWiki(newWiki, callback) {
        return Wiki.create(newWiki)
        .then((wiki) => {
            callback(null, wiki)
        })
        .catch((err) => {
            callback(err);
        })
    }, 
    getWiki(id, callback) {    
        return Wiki.findById(id)
        .then((wiki) => {
            callback(null, wiki);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deleteWiki(id, callback) {
        
        //cannot delete wikis - TROUBLESHOOT
        //not passing in req so cannot find req.params.id??
        
        return Wiki.findById(req.params.id)
      .then((wiki) => {
        const authorized = new Authorizer(req.user, wiki).destroy();

        if (authorized) {
          wiki.destroy()
          .then((deletedRecordsCount) => {
            callback(null, deletedRecordsCount);
          });
        } else {
          req.flash("notice", "You are not authorized to delete this wiki");
          callback(401);
        }
      })
      .catch(err => {
        callback(err);
      });
    }, 
    updateWiki(req, updatedWiki, callback) {
        return Wiki.findById(req.params.id)
        .then((wiki) => {
          if (!wiki) {
            return callback(404);
          } else {
            wiki.update(updatedWiki, {
                fields: Object.keys(updatedWiki)
                })
                .then(() => {
                callback(null, wiki);
                })
            }
        })
        .catch(err => {
            callback(err);
        });
    },
    makePrivate(id) {
        return Wiki.all()
        .then((wikis) => {
          wikis.forEach(wiki => {
            if (wiki.userId == id && wiki.private == true) {
              wiki.update({ private: false })
            }
          })
        })
        .catch(err => {
          console.log(err);
        })
  }
    
    
}