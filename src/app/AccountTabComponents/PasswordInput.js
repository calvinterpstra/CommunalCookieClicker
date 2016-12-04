import React from 'react';
import TextField from 'material-ui/TextField';

var PasswordInput = React.createClass({
    onChange: function (event) {
        this.props.handleChangePassword(event.target.value);
    },
    onReChange: function (event) {
        this.props.handleChangeRePassword(event.target.value);
    },
    render() {
        return (
            <div>
                <TextField hintText="Enter your password"
                    floatingLabelText="Password"
                    name="Password"
                    onChange={this.onChange}
                    type="Password"
                    /> <br/>
                <TextField hintText="Re-enter your password"
                    floatingLabelText="Re-enter password (if new account)"
                    name="Re-enter password"
                    onChange={this.onReChange}
                    type="Password"
                    />
            </div>
        );
    }
});

export default PasswordInput;