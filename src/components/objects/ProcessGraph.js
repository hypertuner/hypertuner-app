import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  makeVisFlexible
} from "react-vis";

const useStyles = makeStyles(theme => ({}));

const FlexibleXYPlot = makeVisFlexible(XYPlot);

export const ProcessGraph = ({ graphList }) => {
  const classes = useStyles();

  return (
    <FlexibleXYPlot>
      <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
      <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
      <XAxis
        title="X Axis"
        style={{
          line: { stroke: "#ADDDE1" },
          ticks: { stroke: "#ADDDE1" },
          text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
        }}
      />
      <YAxis title="Y Axis" />

      {/* <LineSeries
          data={[{x: -100, y: -100}, {x: 100, y: 100}]}
          style={{
            strokeLinejoin: "round",
            strokeWidth: 1
          }}
        /> */}

      {graphList.map(({graphName, graphData}) => (
        <LineSeries
          key={graphName}
          data={graphData}
          style={{
            strokeLinejoin: "round",
            strokeWidth: 4
          }}
        />
      ))}

      {/* <LineSeries
                    className="first-series"
                    data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}]}
                    style={{
                        line: { stroke: '#ADDDE1' },
                        ticks: { stroke: '#ADDDE1' },
                        text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                    }}
                />
                <YAxis title="Y Axis" />
                {graphData.map(({name, data}) =>
                    <LineSeries
                        className={name}
                        data={data}
                        style={{
                            strokeLinejoin: 'round',
                            strokeWidth: 4
                        }}
                    />
                )}
            </FlexibleXYPlot>
        </div>
    )
}