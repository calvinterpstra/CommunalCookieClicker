import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

const bodyStyle = {
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
    paddingTop: 90,
};
const headerStyle2 = {
    fontSize: 24,
    fontWeight: 400,
    paddingTop: 10,
    margin: 0,
};
const headerStyle = {
    fontSize: 24,
    fontWeight: 400,
    margin: 0,
};

var TheCookiePage = React.createClass({
    render() {
        return (
            <div style={bodyStyle}>
                <h2 style={headerStyle}> The Cookie </h2><br/>
                <h2 style={headerStyle2}> {this.props.globalCount + this.props.localCount} </h2><br/>
                <IconButton style={{ width: 150, height: 150, }} onTouchTap={this.props.handleCookieClick}> <img src="/theCookieImg.png" height="100" width="100"/> </IconButton>
            </div>
        );
    }
});

export default TheCookiePage;

                // <button style={{background: "transparent", border: "none", outline: "none"}}><img src="/theCookieImg.png" style={{width: 100, height: 100}}/></button>
