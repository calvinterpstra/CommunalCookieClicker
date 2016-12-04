import React from 'react';
import SignOutButton from './SignOutButton';

var AccountInfo = React.createClass({
    render() {
        return (
            <div>
                <p> Username: {this.props.user.username} <br/> Email: {this.props.user.email} </p>
                <br/>
                <SignOutButton signOut={this.props.signOut}/>
            </div>
        )
    }
});

export default AccountInfo;