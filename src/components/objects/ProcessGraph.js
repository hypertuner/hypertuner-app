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
    console.log(graphList);
    return (
        <FlexibleXYPlot>
            <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
            <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
            <XAxis
                title="X Axis"
                style={{
                    line: { stroke: '#ADDDE1' },
                    ticks: { stroke: '#ADDDE1' },
                    text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }}
            />
            <YAxis title="Y Axis" />
            {graphList.map(({ graphName, graphData }) =>
                <LineSeries
                    className={graphName}
                    data={graphData}
                    style={{
                        strokeLinejoin: 'round',
                        strokeWidth: 4
                    }}
                />
            )}
        </FlexibleXYPlot>
    )
}