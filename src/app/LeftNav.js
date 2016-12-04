import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

var LeftNav = React.createClass({

    handleTheCookie: function() {
        this.scrollWindow();
        this.props.handlePageChange("theCookie");
        this.props.handleNavOpenChange(false);
    },
    handleProfile: function() {
        this.scrollWindow();
        this.props.handlePageChange("profile");
        this.props.handleNavOpenChange(false);
    },
    scrollWindow: function() {
        window.scrollTo(0,0);
    },
    render() {
        let forceNavDown = {'top': '58px'}
        return (
            <Drawer
                zDepth={2}
                containerStyle={forceNavDown}
                style={{textAlign: 'left'}}
                docked={false}
                width={150}
                open={this.props.navOpen}
                onRequestChange={(open) => this.props.handleNavOpenChange(open)}
                >
                <MenuItem onTouchTap={this.handleTheCookie}> The Cookie </MenuItem>
                <MenuItem onTouchTap={this.handleProfile}> Profile </MenuItem>
                
            </Drawer>
        );
    }
});

export default LeftNav;