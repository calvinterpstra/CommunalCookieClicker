import React from 'react';
import LoginForm from './AccountTabComponents/LoginForm';
import AccountInfo from './AccountTabComponents/AccountInfo';

const headerStyle = {
    fontSize: 24,
    fontWeight: 400,
    paddingTop: 90,
    margin: 0,
};
const bodyStyle = {
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
};

var AccountTab = React.createClass({
    render() {
        if (this.props.signedIn) {
            return (
                <div style={bodyStyle}>
                    <h2 style={headerStyle}> Profile </h2> <br/>
                    <AccountInfo user={this.props.user} signOut={this.props.signOut}/>
                </div>
            );
        }
        else {
            return (
                <div style={bodyStyle}>
                    <h2 style={headerStyle}> Sign In </h2> <br/>
                    <LoginForm signIn={this.props.signIn} createAccount={this.props.createAccount} sendMessage={this.props.sendMessage} setUsername={this.props.setUsername} 
                        addUser={this.props.addUser}/>
                </div>
            );
        }
    }
});

export default AccountTab;