import React,{Component} from 'react';
import { connect } from 'react-redux';

const withAuthentication = (WrappedComponent) => {
    class AuthenticateHOC extends Component {
        authenticateUser() {
            const {isAuthenticated, history} = this.props;
            if(!isAuthenticated){
                history.push('/');
            }
        }
        componentDidMount(){
            this.authenticateUser();
        }
        componentDidUpdate(){
            this.authenticateUser();
        }

        render(){
            return this.props.isAuthenticated ?  <WrappedComponent {...this.props}/> : null
        }
    }
    const mapStateToProps = (state) => ({
        isAuthenticated : state.auth.isAuthenticated
    })    
    return connect(mapStateToProps)(AuthenticateHOC);
}

export default withAuthentication
