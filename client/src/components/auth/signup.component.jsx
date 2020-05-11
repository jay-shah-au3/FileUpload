import React from 'react';
import {withRouter} from 'react-router-dom';
import './signup.styles.css';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            email : '',
            password : '',
            confirmPassword : '',
            error:''
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]:value, error:''});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {firstname, lastname, email, password, confirmPassword} = this.state;
        if(password!==confirmPassword){
            this.setState({error:"Passwords do not match"});
        }
        else{
            const data={firstname,lastname, email, password};
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(data)
            });
            const result = await response.json();
            if(result.error)
                this.setState({error:result.message})
            else{
                this.props.history.push('/login')
            }
        }
    }

    render(){
        const {firstname, lastname, email, password, confirmPassword, error} = this.state;
        return(
            <div className="signup-form">
                <form onSubmit = {(e)=>this.handleSubmit(e)}>
                    <h2>Sign Up</h2>
                    <p>Please fill in this form to create an account!</p>
                    <hr/>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                            <input onChange={(e)=>this.handleChange(e)} type="text" className="form-control" name="firstname" placeholder="First Name" maxLength="50" value={firstname} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                            <input onChange={(e)=>this.handleChange(e)} type="text" className="form-control" name="lastname" placeholder="Last Name" maxLength="50" value={lastname} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-paper-plane"></i></span>
                            <input onChange={(e)=>this.handleChange(e)} type="email" className="form-control" name="email" placeholder="Email Address" maxLength="50" value={email} required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                            <input onChange={(e)=>this.handleChange(e)} type="text" className="form-control" name="password" placeholder="Password" value={password} maxLength="50" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-lock"></i>
                                <i className="fa fa-check"></i>
                            </span>
                            <input onChange={(e)=>this.handleChange(e)} type="text" className="form-control" name="confirmPassword" maxLength="50" placeholder="Confirm Password" value={confirmPassword} required/>
                        </div>
                    </div>
                    {error.length>0 ? <div style={{ marginBottom:"10px" ,display:"block", fontSize:"0.9em", color:"tomato"}}><p>{error}</p></div> : null}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Signup);