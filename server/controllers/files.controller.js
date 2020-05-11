const FileUploads = require("../models/Files");
const Users = require("../models/Users");
const path = require('path');
const fs = require('fs');
Users.hasMany(FileUploads, {
	foreignKey: "user_id"
});

// Files.belongsTo(Users);

module.exports = {
	async addFile(req, res) {
		const u_id = req.payload.id;
		const {name, data, size, mimetype, mv} = req.files.fileData;
		const reqPath = path.join(__dirname, `../uploads/${u_id}`);
		if(mimetype!== 'application/json'){
			res.status(415).json({error:"File type not supported!"})
		}
		if(size > 500000){
			res.status(413).json({error:"File size must be less than 500KB"})
		}
		if(fs.existsSync(`${reqPath}/${name}`)){
			res.status(409).json({error:"File Already Exists!"});
		}
		else{	
			if(!fs.existsSync(reqPath)){
				fs.mkdirSync(reqPath);			
			}
			mv(`${reqPath}/${name}`,(err)=>{
				if(err)
					res.status(412).json({error:"Could not find path!"});
				else{
					let full_path = `${reqPath}/${name}`
					const obj = {}
					obj["file_name"] = name;
					obj["file_path"] = full_path;
					obj["user_id"] = u_id;
					FileUploads.create(obj)										
					.then(insertedQuery => {
						console.log("Inserted Query");
					})
					.then(()=>{
						res.json({ message: "File Uploaded!" })
						// res.end();
					})
				}
			});
		}
	},

	getFile(req, res) {
		const user_id = req.payload.id;
		const {name} = req.params;
		const reqPath = path.join(__dirname, `../uploads/${user_id}/${name}`);
		if(!fs.existsSync(`${reqPath}`)){
			res.status(404).json({error:"File Not Found!"});
		}
		else{
			res.sendFile(reqPath);
		}
	},

	async getAllFiles(req, res) {
		const user_id = req.payload.id;
		try{
			const result = await FileUploads.findAll({
				where: {
					user_id: user_id
				}
			});
			res.json(result);
		}
		catch(error){
			res.status(500).json({error:"error"})
		}
	},
}