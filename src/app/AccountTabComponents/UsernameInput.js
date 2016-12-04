import React from 'react';
import TextField from 'material-ui/TextField';

var UsernameInput = React.createClass({
    onChange: function (event) {
        this.props.handleChangeUsername(event.target.value);
    },
    render() {
        return (
            <TextField hintText="Enter your Username"
                floatingLabelText="Username"
                name="Username"
                onChange={this.onChange}
                
                />
        )
    }
});

export default UsernameInput;