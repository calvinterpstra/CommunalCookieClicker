import React, {Component} from 'react';
import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

import MainAppBar from './MainAppBar';
import LeftNav from './LeftNav';
import UserNav from './UserNav';
import TheCookiePage from './TheCookiePage';
import AccountTab from './AccountTab';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: Colors.red600,
        primary2Color: Colors.red600,
        primary3Color: Colors.red600,
        accent1Color: Colors.amber600,
        accent2Color: Colors.amber600,
        accent3Color: Colors.amber600,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
        pickerHeaderColor: Colors.cyan500,
        clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
        shadowColor: Colors.fullBlack,
    },
    zIndex: {
        appBar: 1350
    },
});

var Main = React.createClass({
    getInitialState: function () {
        return {
            localCount: 0,
            globalCount: 0,
            navOpen: false,
            userNavOpen: false,
            messagesOpen: false,
            currentTab: "theCookie",
            user: {
                username: "",
                email: "",
                count: 0,
            },
            signedIn: false,
            user2: "",
            users: [],
        }
    },

    handleNavOpenChange: function (navOpen) {
        this.scrollWindow();
        var newState = this.state;
        newState.navOpen = navOpen;
        this.setState(newState);
    },
    handleUserNavOpenChange: function (navOpen) {
        this.scrollWindow();
        var newState = this.state;
        newState.userNavOpen = navOpen;
        this.setState(newState);
    },
    handlePageChange: function (page) {
        this.scrollWindow();
        var newState = this.state;
        newState.currentTab = page;
        this.setState(newState);
    },
    scrollWindow: function () {
        window.scrollTo(0, 0);
    },
    handleCookieClick: function () {
        if (this.state.signedIn) {
            var newState = this.state;
            newState.localCount++;
            newState.user.count++;
            this.setState(newState);
            this.updateGlobalCountData();
            this.updateUserCount(this.state.user);
            this.updateUsersData();
        }
        else {
            this.sendMessage("Can't click without signing in!");
        }
    },
    sendMessage: function (message) {
        var newState = this.state;
        newState.messagesOpen = true;
        newState.message = message;
        this.setState(newState);
    },
    handleMessagesClose: function () {
        var newState = this.state;
        newState.messagesOpen = false;
        this.setState(newState);
    },

    // update global count database
    checkConnection: function () {
        var connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", function (snap) {
            if (snap.val() === true) {
                this.sendMessage("Connected to database");
            } else {
                this.sendMessage("Offline");
            }
        }, this);
    },
    updateGlobalCountState: function () {
        var globalCountRef = firebase.database().ref('globalCount/');
        globalCountRef.on('value', function (snapshot) {
            const globalCount = snapshot.val();
            var newState = this.state;
            newState.globalCount = globalCount;
            newState.localCount = 0;
            this.setState(newState);
        }, this);
    },
    updateGlobalCountData: function () {
        const stateCount = this.state.globalCount + this.state.localCount;
        if (stateCount != null && stateCount != undefined) {
            this.setGlobalCountData(stateCount);
        }
    },
    setGlobalCountData: function (stateCount) {
        firebase.database().ref('globalCount/').set(stateCount);
    },

    // Authentication
    createAccount: function (email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            this.sendMessage("Created Account");
            this.signIn(email, password)
        }, function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var message = "";
            if (errorMessage == "The email address is badly formatted.") {
                message = "The email address is badly formatted."
            }
            else if (errorMessage == "The password must be 6 characters long or more.") {
                message = "Password must be at least 6 characters long";
            }
            else if (errorMessage == "The email address is already in use by another account.") {
                message = "Failed: Email is already in use.";
            }
            else {
                message = "Can not connect to database";
            }
            this.sendMessage(message);
        }, this);
    },
    signIn: function (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            this.getCurrentUserData();
        }, function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var message = "";
            if (errorMessage == "The password is invalid or the user does not have a password.") {
                message = "The password is invalid."
            }
            else if (errorMessage == "The email address is badly formatted.") {
                message = "The email address is badly formatted.";
            }
            else if (errorMessage == "There is no user record corresponding to this identifier. The user may have been deleted.") {
                message = "This user does not exist.";
            }
            else {
                message = "Can not connect to database";
            }
            this.sendMessage(message);
        }, this);
    },
    signOut: function () {
        firebase.auth().signOut().then(function () {
            this.sendMessage("Signed out");
            var newState = this.state;
            newState.signedIn = false;
            this.setState(newState);
        }, function (error) {
            console.error('Sign Out Error', error);
        }, this);
    },
    getCurrentUserData: function () {
        var user = firebase.auth().currentUser;
        var name, email, uid;
        if (user != null) {
            var newState = this.state;
            newState.signedIn = true;
            newState.user.email = user.email;
            this.setState(newState);
            this.sendMessage("Signed In as " + email);
        }
        else {
            var newState = this.state;
            newState.signedIn = false;
            this.setState(newState);
        }
    },
    setUsername: function (username) {
        console.log("username");
        console.log(username);
        var newState = this.state;
        newState.user.username = username;
        this.setState(newState);
    },

    // Users
    setUsers: function (users) {
        var newState = this.state;
        newState.users = users;
        this.setState(newState);
    },
    addUser: function (username, email) {
        var users = this.state.users;
        var isIn = false;
        users.map(function (user, i) {
            if (user.email == email) {
                isIn = true;
            }
        });
        if (!isIn) {
            const user = {
                username: username,
                email: email,
                count: 0,
            }
            users.push(user);
        }
        var newState = this.state;
        newState.users = users;
        this.setState(newState);
    },
    updateUserCount: function (thisUser) {
        var users = this.state.users;
        var isIn = false;
        var laterCount;
        users.map(function (user, i) {
            if (user.email == thisUser.email) {
                if (user.count > thisUser.count) {
                    thisUser.count = user.count;
                }
                else {
                    user.count = thisUser.count;
                }
            }
        });
        var newState = this.state;
        newState.users = users;
        newState.user = thisUser;
        this.setState(newState);
    },
    getUniqueUsers: function (users1, users2) {
        var newUsers = users2;
        var laterUser;
        users1.map(function (user1, i) {
            var isIn = false;
            users2.map(function (user2, i) {
                if (user1.email == user2.email) {
                    if (user1.count < user2.count) {
                        user1.count = user2.count;
                    }
                    else {
                        user2.count = user1.count;
                    }
                    isIn = true;
                }
            });
            if (!isIn) {
                newUsers.push(user1)
            }
        });
        return newUsers;
    },
    setUsersData: function () {
        firebase.database().ref('users/').set(this.state.users);
    },
    updateUsersState: function () {
        var usersRef = firebase.database().ref('users/');
        usersRef.on('value', function (snapshot) {
            const usersData = snapshot.val();
            const stateUsers = this.state.users;
            if (usersData != null && stateUsers == null) {
                this.setUsers(usersData);
                this.sendMessage("Updated users!");
            }
            else if (usersData != null && stateUsers != null) {
                var combined = this.getUniqueUsers(usersData, stateUsers);
                this.setUsers(combined);
                this.sendMessage("Updated users!");
            }
            else if (usersData == null && stateUsers != null) {
                this.setUsersData(stateUsers);
                this.sendMessage("Updated users!");
            }
        }, this);
    },
    updateUsersData: function () {
        const stateUsers = this.state.users;
        if (stateUsers != null) {
            this.setUsersData(stateUsers);
        }
    },


    componentWillMount: function () {
        this.checkConnection();
        this.updateGlobalCountState();
        this.updateUsersState();
    },
    render() {
        switch (this.state.currentTab) {
            case "theCookie":
                return (
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <div style={{ textAlign: 'center' }}>
                            <MainAppBar navOpen={this.state.navOpen} handleNavOpenChange={this.handleNavOpenChange} handleUserNavOpenChange={this.handleUserNavOpenChange}
                                userNavOpen={this.state.userNavOpen}/>
                            <LeftNav navOpen={this.state.navOpen} handleNavOpenChange={this.handleNavOpenChange} handlePageChange={this.handlePageChange}/>
                            <UserNav userNavOpen={this.state.userNavOpen} handleUserNavOpenChange={this.handleUserNavOpenChange} users={this.state.users}/>

                            <TheCookiePage globalCount={this.state.globalCount} localCount={this.state.localCount} handleCookieClick={this.handleCookieClick}/>

                            <Snackbar open={this.state.messagesOpen} message={this.state.message} autoHideDuration={4000} onRequestClose={this.handleMessagesClose}/>
                        </div>
                    </MuiThemeProvider>
                );
            case "profile":
                return (
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <div style={{ textAlign: 'center' }}>
                            <MainAppBar navOpen={this.state.navOpen} handleNavOpenChange={this.handleNavOpenChange} handleUserNavOpenChange={this.handleUserNavOpenChange}
                                userNavOpen={this.state.userNavOpen}/>
                            <LeftNav navOpen={this.state.navOpen} handleNavOpenChange={this.handleNavOpenChange} handlePageChange={this.handlePageChange}/>
                            <UserNav userNavOpen={this.state.userNavOpen} handleUserNavOpenChange={this.handleUserNavOpenChange} users={this.state.users}/>

                            <AccountTab signIn={this.signIn} createAccount={this.createAccount} sendMessage={this.sendMessage} setUsername={this.setUsername}
                                signedIn={this.state.signedIn} user={this.state.user} signOut={this.signOut} addUser={this.addUser}/>

                            <Snackbar open={this.state.messagesOpen} message={this.state.message} autoHideDuration={4000} onRequestClose={this.handleMessagesClose} />

                        </div>
                    </MuiThemeProvider>
                );
        }
    }

});

export default Main;