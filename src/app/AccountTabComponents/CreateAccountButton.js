import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

var CreateAccountButton = React.createClass({
    render() {
        return (
            <RaisedButton label="Create Account" secondary={true} style={{marginTop: 30, marginLeft: 20}} onTouchTap={this.props.createAccount}/>
        )
    }
});

export default CreateAccountButton;