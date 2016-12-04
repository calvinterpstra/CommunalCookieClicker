import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

var LoginButton = React.createClass({
    render() {
        return (
            <RaisedButton label="Sign in" primary={true} style={{marginTop: 30}} onTouchTap={this.props.signIn}/>
        )
    }
});

export default LoginButton;