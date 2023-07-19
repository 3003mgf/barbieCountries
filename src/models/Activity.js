const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dificulty: {
            type: DataTypes.INTEGER,
            allowNull: false,   
            validate: { 
                max: 5,
                min: 1
            }        
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { 
                max: 24,
                min: 1
            }
        },
        seasons: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno' , 'Primavera'),
            allowNull: false,
        }
    });
};