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

const getMinMax = (graphList) => {
    if (typeof graphList !== 'undefined' && graphList.length > 0) {
        const mins = graphList.map(({ graphName, graphData }) => parseFloat(graphData[0].x));
        const maxes = graphList.map(({ graphName, graphData }) => parseFloat(graphData[graphData.length - 1].x));

        return [Math.min(...mins), Math.max(...maxes)]
    }

    return [0, 0]
}

export const ProcessGraph = ({ graphList }) => {
    const classes = useStyles();

    return (
        <FlexibleXYPlot xDomain={getMinMax(graphList)}>
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
                    key={graphName}
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