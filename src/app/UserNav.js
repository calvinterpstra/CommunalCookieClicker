import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';

var UserNav = React.createClass({

    render() {
        let forceNavDown = { 'top': '58px' }
        var users = this.props.users;

        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        sortByKey(users, "count");
        users.reverse();

        var userList = users.map(function (user, i) {
            return <ListItem primaryText={
                <p style={{ paddingTop: 5, paddingBottom: 5, margin: 0 }}>
                    <span style={{fontWeight: 300, }}> {user.username} </span>,
                    <span style={{ fontWeight: 300, }}> {user.count} </span>
                </p>}
                key={i}/>;
        });
        return (
            <Drawer
                zDepth={2}
                containerStyle={forceNavDown}
                style={{ textAlign: 'left' }}
                docked={false}
                openSecondary={true}
                width={150}
                open={this.props.userNavOpen}
                onRequestChange={(open) => this.props.handleNavOpenChange(open) }
                >
                <List>{userList}</List>

            </Drawer>
        );
    }
});

export default UserNav;