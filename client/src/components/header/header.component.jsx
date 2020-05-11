import React, {Fragment} from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {    
        NavbarContainer, UnOrderedListContainer, ButtonContainer
    } from './header.styles.js';
import { OAuthSignOut } from '../../redux/auth/auth.actions';

class Header extends React.Component{

    handleLogoutClick = () => {
        this.props.logout();
    }

    render(){
        const {title, isAuthenticated, history } = this.props;
        let path = history.location.pathname;
        return(
            <NavbarContainer className="navbar navbar-expand-lg navbar-default">
                <Link className="navbar-brand" to="/">
                    {/* <ImageContainer src={logo}/> */}
                    {title}
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <UnOrderedListContainer className="navbar-nav ml-auto mt-2 mt-lg-0">
                    {
                            isAuthenticated ?
                            <Fragment> 
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${path==='/upload' ? 'active':''}`} to="/upload">Upload</NavLink>
                                </li>    
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${path==='/dashboard' ? 'active':''}`} to="/dashboard">Dashboard</NavLink>
                                </li>    
                                <li className="nav-item">
                                    <ButtonContainer onClick={this.handleLogoutClick}>Logout</ButtonContainer>
                                    {/* <NavLink className={`nav-link ${path==='/logout' ? 'active':''}`} to="/file">Logout</NavLink> */}
                                </li>    
                            </Fragment>
                            :
                            <Fragment> 
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${path==='/login' ? 'active':''}`} to="/login">Login<span className="sr-only">(current)</span></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${path==='/signup' ? 'active':''}`} to="/signup">Signup</NavLink>
                                </li>    
                            </Fragment>
                        }
                    </UnOrderedListContainer>
                </div>
            </NavbarContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
    logout : () => dispatch(OAuthSignOut())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));