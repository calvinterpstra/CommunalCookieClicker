import React from 'react';
import EmailInput from './EmailInput';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';
import CreateAccountButton from './CreateAccountButton';

var LoginForm = React.createClass({
    getInitialState() {
        return {
            email: "",
            username: "",
            password: "",
            rePassword: "",
        };
    },
    handleChangeEmail: function (email) {
        this.setState({ email: email });
    },
    handleChangeUsername: function (username) {
        this.setState({ username: username });
    },
    handleChangePassword: function (password) {
        this.setState({ password: password });
    },
    handleChangeRePassword: function (password) {
        this.setState({ rePassword: password });
    },
    signIn: function () {
        this.props.setUsername(this.state.username);
        this.props.signIn(this.state.email, this.state.password);
        this.props.addUser(this.state.username, this.state.email);
    },
    createAccount: function () {
        if ((this.state.password == this.state.rePassword) && this.state.username != "") {
            this.props.setUsername(this.state.username);
            this.props.createAccount(this.state.email, this.state.password);
            this.props.addUser(this.state.username, this.state.email);
        }
        else {
            if (this.state.username != "") {
                this.props.sendMessage("You need a username.")
            }
            else {
                this.props.sendMessage("Passwords don't match.")
            }
        }
    },
    render() {
        return (
            <div>
                <UsernameInput handleChangeUsername={this.handleChangeUsername}/><br/>
                <EmailInput handleChangeEmail={this.handleChangeEmail}/><br/>
                <PasswordInput handleChangePassword={this.handleChangePassword} handleChangeRePassword={this.handleChangeRePassword}/>
                <br/>
                <LoginButton signIn={this.signIn}/>
                <CreateAccountButton createAccount={this.createAccount}/>
            </div>
        );
    }
});

export default LoginForm;