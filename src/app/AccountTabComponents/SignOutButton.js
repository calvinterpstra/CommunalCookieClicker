import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

var SignOutButton = React.createClass({
    render() {
        return (
            <RaisedButton label="Sign Out" primary={true} style={{marginTop: 30}} onTouchTap={this.props.signOut}/>
        )
    }
});

export default SignOutButton;