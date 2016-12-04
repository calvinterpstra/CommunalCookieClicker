import React from 'react';
import TextField from 'material-ui/TextField';

var EmailInput = React.createClass({
    onChange: function (event) {
        this.props.handleChangeEmail(event.target.value);
    },
    render() {
        return (
            <TextField hintText="Enter your email"
                floatingLabelText="Email"
                name="Email"
                onChange={this.onChange}
                type="email"
                />
        )
    }
});

export default EmailInput;