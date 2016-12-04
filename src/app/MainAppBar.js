import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar'
import * as Colors from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

var MainAppBar = React.createClass({

    leftNavToggle: function () {
        var newNavOpen = this.props.navOpen;
        newNavOpen = !this.props.navOpen;
        this.props.handleNavOpenChange(newNavOpen)
    },
    userNavToggle: function () {
        var newNavOpen = this.props.userNavOpen;
        newNavOpen = !this.props.userNavOpen;
        this.props.handleUserNavOpenChange(newNavOpen)
    },
    handleChangeCompetitionSelected: function () {
        this.props.handleOpenSelectCompetition();
    },

    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                <AppBar
                    style={{ position: 'fixed', height: 58 }}
                    zDepth={3}
                    title="Communal Cookie Clicker"
                    onLeftIconButtonTouchTap = {this.leftNavToggle}
                    iconElementRight={
                        <IconButton>
                            <MoreVertIcon color={Colors.white}/>
                        </IconButton>
                    }
                    onRightIconButtonTouchTap = {this.userNavToggle}
                    />
            </div>
        );
    }
});

export default MainAppBar;

// onTouchTap={this.handleChangeCompetitionSelected}