import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import {
  createClass,
  enrollClass,
  dropClass,
  deleteClass
} from "../../actions/classesActions";

const styles = theme => ({
  button: {
    textTransform: "inherit",
    margin: "0.6rem",
    fontSize: "1.2rem",
    backgroundColor: theme.palette.secondary.main
  }
});

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      className: "",
      classCode: ""
    };

    this.createNewClass = this.createNewClass.bind(this);
    this.enrollInClass = this.enrollInClass.bind(this);
    this.dropAClass = this.dropAClass.bind(this);
    this.deleteAClass = this.deleteAClass.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  createNewClass() {
    const newClassData = {
      name: this.state.className
    };

    this.props.createClass(newClassData);
  }

  enrollInClass() {
    const newClassData = {
      code: this.state.classCode
    };

    this.props.enrollClass(newClassData);
  }

  dropAClass() {
    const newClassData = {
      code: this.state.classCode
    };

    this.props.dropClass(newClassData);
  }

  deleteAClass() {
    const newClassData = {
      code: this.state.classCode
    };

    this.props.deleteClass(newClassData);
  }

  handleInput(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          component={Link}
          to="/create-class"
          className={classNames(classes.button)}
          variant="contained"
          size="large"
        >
          Create Class
        </Button>
        <Button
          component={Link}
          to="/enroll-class"
          className={classNames(classes.button)}
          variant="contained"
          size="large"
        >
          Enroll Class
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    { createClass, enrollClass, dropClass, deleteClass }
  )
)(Dashboard);
