import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {OAuthSignIn} from '../../redux/auth/auth.actions';
import './signup.styles.css';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            error:'',
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]:value, error:''});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const data={email, password};
        this.props.OAuthLogin("http://localhost:5000/api/auth/login", data)
    }

    render(){
        let {email, password, error} = this.state;
        if(this.props.isAuthenticated)
            return <Redirect to='/upload'/>
        if(this.props.errorEP.length>0)
            error = "Invalid Username Or Password";

        return(
            <div className="signup-form">
                <form onSubmit = {(e)=>this.handleSubmit(e)}>
                    <h2>Login</h2>
                    <hr/>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-paper-plane"></i></span>
                            <input onChange={(e)=>this.handleChange(e)} type="email" className="form-control" name="email" placeholder="Email Address" maxLength="50" value={email} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                            <input onChange={(e)=>this.handleChange(e)} type="password" className="form-control" name="password" placeholder="Password" maxLength="50" value={password} required/>
                        </div>
                    </div>
                    {error.length>0 ?<div style={{ marginBottom:"10px" ,display:"block", fontSize:"0.9em", color:"tomato"}}><p>{error}</p></div>: null}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    errorEP: state.auth.error
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	OAuthLogin : (url, tokenId) => dispatch(OAuthSignIn(url, tokenId))
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);