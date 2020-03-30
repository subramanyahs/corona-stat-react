import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Topbar from "./Topbar";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import LinearProgress from '@material-ui/core/LinearProgress';

import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title
  } from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';


const backgroundShape = require("../images/shape.svg");


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },
  loanAvatar: {
    display: "inline-block",
    verticalAlign: "center",
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: "inline-block",
    verticalAlign: "center",
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  mainBadge: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
});

class Dashboard extends Component {
  state = {
    loading: true,
    dates: [],
    cdata: [],
    chartData: []
  };

  loadFromAPI(countrySel) {

    var url = "https://covidapi.info/api/v1/global/count";
    if (countrySel && countrySel !== "Global" && countrySel != ""){
        url = "https://covidapi.info/api/v1/country/"+countrySel;
    }
    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        this.parseJSONFormat(json);
      });
  }

  parseJSONFormat(jsonObj) {
    var res = jsonObj.result;

    var dates = Object.keys(res).reverse();
    var cdata = Object.values(res).reverse();

    var chartData = [];
    for (var i = 0; i < 10; i++) {
      var d = new Date(dates[i]);
      var eachBar = {
        date: d.getDate()+'/'+(d.getMonth()+1),
        confirmed: cdata[i].confirmed,
        deaths: cdata[i].deaths
      }
      chartData.push(eachBar);
    }
   
    this.setState({
      dates: dates,
      cdata: cdata,
      chartData: chartData.reverse(),
      loading:false
    })
  }

  componentDidMount() {
    var countrySel = localStorage.getItem('countrySel');
    this.loadFromAPI(countrySel);
  }

  render() {
    const { classes } = this.props;
    const {
      chartData, dates, cdata,loading
    } = this.state;
    const currentPath = this.props.location.pathname;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={10}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
            <Grid container spacing={4} justify="center">
              {loading ? 
               <Grid item xs={12} md={12}>
                 <Paper
                    className={classes.paper}
                    style={{ position: "relative" }}
                  ><LinearProgress /></Paper>
               </Grid>
              :null}
             
                <Grid item xs={12} md={6}>
                  <Paper
                    className={classes.paper}
                    style={{ position: "relative" }}
                  >
                    <Chart
                      data={chartData}
                    >
                       <ArgumentAxis />
                      <ValueAxis />
                      

                      <BarSeries
                        name="Confirmed"
                        valueField="confirmed"
                        argumentField="date"
                        color="#ffd700"
                      />
                  
                      <Animation />

                      <Title text="Total Cases" />
                      <Stack />
                    </Chart>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    className={classes.paper}
                    style={{ position: "relative" }}
                  >
                    <Chart
                      data={chartData}
                    >
                      <ArgumentAxis />
                      <ValueAxis />
                      <BarSeries
                        name="Deaths"
                        valueField="deaths"
                        argumentField="date"
                        color="#cd7f32"
                      />

                      <Animation />

                      <Title text="Total Deaths" />
                      <Stack />
                    </Chart>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={4} justify="center">
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <TableContainer className={classes.container}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Date
                                  </TableCell>
                            <TableCell>
                              Confirmed
                                  </TableCell>
                            <TableCell>
                              Deaths
                                  </TableCell>
                                  <TableCell>
                              Recovered
                                  </TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dates.map((value, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell>
                                  {value}
                                </TableCell>
                                <TableCell>
                                  {cdata[index].confirmed}
                                </TableCell>
                                <TableCell>
                                  {cdata[index].deaths}
                                </TableCell>
                                <TableCell>
                                  {cdata[index].recovered}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Dashboard));
