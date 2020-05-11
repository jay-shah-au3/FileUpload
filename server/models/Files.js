const Sequelize = require("sequelize");
const db = require('../config/database')

const FileUploads = db.define(
	"fileuploads",
	{
		file_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement:true      
		},
		file_name:{
			type:Sequelize.STRING,
			allowNull: false
		},
		file_path:{
			type:Sequelize.STRING,
			allowNull: false
		},
		user_id: {
			type:Sequelize.INTEGER
		}
	},
	{
		freezeTableName: true
	}
);

module.exports = FileUploads;
