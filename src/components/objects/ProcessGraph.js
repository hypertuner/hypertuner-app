import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  makeVisFlexible,
  Crosshair
} from "react-vis";

const useStyles = makeStyles(theme => ({
  graph: {
    paddingLeft: "5px",
    paddingRight: "5px"
  }
}));

const FlexibleXYPlot = makeVisFlexible(XYPlot);

const getMinMax = graphList => {
  if (typeof graphList !== "undefined" && graphList.length > 0) {
    const mins = graphList.map(({ graphName, graphData }) =>
      parseFloat(graphData[0].x)
    );
    const maxes = graphList.map(({ graphName, graphData }) =>
      parseFloat(graphData[graphData.length - 1].x)
    );

    return [Math.min(...mins), Math.max(...maxes)];
  }

  return [0, 0];
};

export const ProcessGraph = ({ graphList }) => {
  const classes = useStyles();

  const [value, setValue] = useState([{ y: {}, x: "" }]);

  // const lineSeriesProps = {
  //     animation: true,
  //     className: 'mark-series-example',
  //     opacityType: 'literal',
  //     data,
  //     onNearestX: d => setValue(d)
  // };

  function setYVal(gName, d) {
    if (value) {
      let valCopy = Object.assign([], value);
      valCopy[0].x = d.x;
      valCopy[0].y[gName] = d.y;
      // valCopy["y1"] = "10";

      setValue(valCopy);
    } else {
      setValue([{ y: {}, x: "" }]);
    }
  }

  console.log(value);

  return (
    <FlexibleXYPlot
      onMouseLeave={() => setValue(false)}
      className={classes.graph}
      xDomain={getMinMax(graphList)}
    >
      <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
      {/* <VerticalGridLines style={{ stroke: '#B7E9ED' }} /> */}
      <XAxis
        attr="x"
        attrAxis="y"
        orientation="bottom"
        tickTotal={5}
        title="Frames"
        style={{
          line: { stroke: "#ADDDE1" },
          ticks: { stroke: "#ADDDE1" },
          text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
        }}
      />
      <YAxis
        attr="y"
        attrAxis="x"
        orientation="left"
        tickTotal={5}
        title="Loss"
      />
      {value && (
        <Crosshair values={value}>
          <div
            style={{
              background: "rgb(58,58,71)",
              width: "250%",
              height: "120%",
              borderRadius: "5%"
            }}
          >
            <div
              style={{
                margin: "10%",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontSize: "130%"
              }}
            >
              <h4>Frame: {value[0].x}</h4>
              {Object.entries(value[0].y).map(([gName, y]) => {
                return (
                  <div>
                    <p style={{ margin: "2%" }}>
                      {gName}: {parseFloat(y).toFixed(3)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Crosshair>
      )}
      {graphList.map(({ graphName, graphData }) => (
        <LineSeries
          key={graphName}
          className={graphName}
          data={graphData}
          style={{
            strokeLinejoin: "round",
            strokeWidth: 4
          }}
          onNearestX={d => setYVal(graphName, d)}
        />
      ))}
    </FlexibleXYPlot>
  );
};
