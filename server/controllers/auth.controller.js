const User = require("../models/Users");

module.exports = {
	signup(req, res) {
		console.log("INSIDE SIGNUP")
		if(req.body.email && req.body.password && req.body.lastname && req.body.firstname &&
			req.body.email.length>0 && req.body.password.length>0 && req.body.lastname.length>0 && req.body.firstname.length>0
		){
			User.findOne({
				where: {
					email: req.body.email
				}
			})
			.then(user => {
				if (user)
					res.send({ error: true, message: "Email already registered !" });
				else {
					User.create(req.body)
					.then(insertedQuery => {
						console.log("Inserted Query");
						console.log(insertedQuery.dataValues);
					})
					.then(res.send({ error: false, message: "Successfully registered" }));
					//we should send user in this res to auto login
				}
			});
		}
		else{
			res.status(500).send({error:true, message:"Could Not Sign Up!"});
		}
	},

	signin(req, res) {
		User.findOne({
			where: {
				email: req.body.email
			}
		})
		.then(async user => {
			// console.log(user);
			if (!user)
				return res
				.status(404)
				.send({ error: true, message: "Wrong username or password" });
			let password = req.body.password;
			if(!await user.validPassword(password)){
				return res.status(404).send({
					error: true,
					message: "Wrong username or password"
				});
			}
			else {
				const { user_id, firstname, lastname, email} = user;
				const jwt = require("jsonwebtoken");
				const token = jwt.sign(
				{ id: user_id, name: firstname },
				process.env.TOKEN_SECRET
				);
				let data = {
					success: true,
					message: "Successfully Signed In!",
					token,
					user_id,
					firstname,
					lastname,
					email,
				};
				res.json(data);
			}
		});
	}
};
