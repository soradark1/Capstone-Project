import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import Annoation from "../common/Annoation";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";

import data from "../common/data.json";

var sample = require("./sample2.pdf");

const styles = theme => ({
  button: {
    textTransform: "inherit",
    margin: "0.6rem",
    fontSize: "1.2rem",
    backgroundColor: theme.palette.secondary.main
  },
  pdfMenu: {
    display: "inline-flex"
  },
  pageNumber: {
    margin: "auto"
  },
  loading: {
    marginTop: "45vh",
    marginLeft: "-25px",
    position: "absolute",
    top: 0
  },
  pdfAndAnnoation: {
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateAreas: '"pdf" "menu"',
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "auto auto",
      gridTemplateAreas: '"pdf menu" "bottom bottom"'
    }
  },
  pdfDisplay: {
    gridColumnStart: "pdf-start",
    gridRow: 1
  }
});

class GradeAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      pageWidth: 600,
      pageHeight: 750,
      isLoaded: false,
      annoations: data
    };

    this.updateAnnoations = this.updateAnnoations.bind(this);
  }

  updateAnnoations(updatedPage, index) {
    let { annoations } = this.state;
    /*updatedPage = {
      rectangles: [
        {
          x: 10,
          y: 350,
          width: 100,
          height: 100,
          fill: "rgba(0, 0, 255, 0.35)",
          name: "rect1",
          stroke: "rgba(0, 0, 255, 1)",
          strokeEnabled: false,
          comment: "Is this a comment? yes!"
        }
      ]
    };*/
    annoations.pages[index - 1] = updatedPage;

    this.setState({
      annoations
    });

    console.log("Grade State", this.state);
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  onDocumentLoadSuccess = doc => {
    const { numPages } = doc;
    this.setState({
      numPages,
      pageNumber: 1
      //isLoaded: true
    });
  };

  onPageLoadSuccess = page => {
    //console.log(page);
    this.setState({
      pageWidth: page.originalWidth,
      pageHeight: page.originalHeight,
      isLoaded: true
    });
  };

  changePage = offset =>
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + offset
    }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  //componentDidUpdate(old) {}

  //let pdfWidth = document.getElementById("foo").offsetWidth;

  render() {
    const {
      numPages,
      pageNumber,
      pageWidth,
      pageHeight,
      isLoaded
    } = this.state;
    const { classes } = this.props;
    const react_pdf = (
      <div>
        <div className={classNames(isLoaded ? classes.pdfMenu : "no-display")}>
          <Button
            variant="contained"
            disabled={pageNumber <= 1}
            onClick={this.previousPage}
            className={classNames(classes.button)}
          >
            <Icon className="fas fa-angle-left" />
          </Button>
          <div className={classNames(classes.pageNumber)}>
            {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>

          <Button
            variant="contained"
            disabled={pageNumber >= numPages}
            onClick={this.nextPage}
            className={classNames(classes.button)}
          >
            <Icon className="fas fa-angle-right" />
          </Button>
        </div>
        <Document
          file={sample}
          onLoadSuccess={this.onDocumentLoadSuccess}
          loading={
            <CircularProgress
              className={classNames(classes.loading)}
              color="secondary"
              size={50}
            />
          }
        >
          <div id="pdfpage">
            <Page
              pageNumber={pageNumber}
              renderInteractiveForms={true}
              renderMode="svg"
              className="pdfpage"
              scale={1}
              inputRef={ref => {
                this.myPage = ref;
              }}
              onLoadSuccess={this.onPageLoadSuccess}
            />
          </div>
        </Document>
      </div>
    );

    return (
      <div className={classNames(classes.pdfAndAnnoation)}>
        <div className={classNames(classes.pdfDisplay)}>{react_pdf}</div>

        <Annoation
          stageWidth={pageWidth}
          stageHeight={pageHeight}
          annoations={this.state.annoations.pages[pageNumber - 1]}
          finalComment={this.state.annoations.finalComment}
          grade={this.state.annoations.grade}
          updateAnnoations={this.updateAnnoations}
          pageNumber={pageNumber}
          isLoaded={isLoaded}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(GradeAssignment);
