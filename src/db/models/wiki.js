'use strict';


module.exports = (sequelize, DataTypes) => {
    
    var Wiki = sequelize.define('Wiki', {
        title: DataTypes.STRING,
        body: DataTypes.STRING,
        private: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
    
    Wiki.associate = function (models) {
        // associations can be defined here
        Wiki.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
        
        Wiki.hasMany(models.Collaborator, {
            foreignKey: 'userId',
            as: 'collaborators'
        });
    };
    
    return Wiki;
    
};
