import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Select from '@material-ui/core/Select';

const styles = theme => ({
  appBar: {
    position: "relative",
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.grey["100"]}`,
    backgroundColor: "white"
  },
  inline: {
    display: "inline"
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  productLogo: {
    display: "inline-block",
    borderLeft: `1px solid ${theme.palette.grey["A100"]}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up("md")]: {
      paddingTop: "1.5em"
    }
  },
  tagline: {
    display: "inline-block",
    marginLeft: 10,
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em"
    }
  },
  iconContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  iconButton: {
    float: "right"
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: "auto"
  }
});

class Topbar extends Component {
  state = {
    value: 0,
    menuDrawer: false,
    countrySel:""
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  mobileMenuOpen = event => {
    this.setState({ menuDrawer: true });
  };

  mobileMenuClose = event => {
    this.setState({ menuDrawer: false });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ countrySel: localStorage.getItem('countrySel') });
  }

  current = () => {
    if (this.props.currentPath === "/home") {
      return 0;
    }
    if (this.props.currentPath === "/dashboard") {
      return 1;
    }
    if (this.props.currentPath === "/signup") {
      return 2;
    }
    if (this.props.currentPath === "/wizard") {
      return 3;
    }
    if (this.props.currentPath === "/cards") {
      return 4;
    }
  };

  
  handleChangeSel = (e) => {
  
    this.setState({ countrySel: e.target.value });
    localStorage.setItem('countrySel', e.target.value);
    window.location.reload();
 } 
  render() {
    const { classes } = this.props;
    const {countrySel} = this.state;
    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={10} alignItems="baseline">
            <Grid item xs={12} className={classes.flex}>
              <div className={classes.inline}>
                <Typography variant="h6" color="inherit" noWrap>
                  <Link to="/" className={classes.link}>
                    <span className={classes.tagline}> Corona Stats &nbsp;&nbsp;&nbsp; </span>
                  </Link>
                  <Link to="/" className={classes.link}>
                  <Select
                        native
                        value={countrySel}
                        onChange={this.handleChangeSel}
                        inputProps={{
                          name: 'country',
                          id: 'country-native-simple',
                        }}
                      >
                    <option aria-label="Global" value="Global">Global</option>
                    <option value="IND">India</option>
                    <option value="USA">USA</option>
                    <option value="ITA">Italy</option>
                    <option value="CHN">China</option>
                    <option value="ESP">Spain</option>
                    <option value="DEU">Germany</option>
                    <option value="IRN">Iran</option>
                    <option value="FRA">France</option>
                    <option value="GBR">UK</option>
                    <option value="CHE">Switzerland</option>
                    <option value="NLD">Netherlands</option>
                    <option value="KOR">S. Korea</option>
                    <option value="BEL">Belgium</option>
                    </Select>
                  </Link>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(Topbar));
