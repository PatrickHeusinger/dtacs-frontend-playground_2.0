import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    LabelList
} from "recharts";
import { Box } from "@mantine/core";
import React from "react";
const series = [
    {
        name: "Customer 1",
        stroke: "#05164D",
        data: [
            { category: "Jan 2022", value: 1900 },
            { category: "Feb 2022", value: 1400 },
            { category: "Mar 2022", value: 1600 },
            { category: "Apr 2022", value: 1900 },
            { category: "May 2022", value: 1700 },

        ]
    },
    {
        name: "Customer 2",
        stroke: "#FFAD00",
        data: [
            { category: "Jan 2022", value: 2300 },
            { category: "Feb 2022", value: 2100 },
            { category: "Mar 2022", value: 1900 },
            { category: "Apr 2022", value: 2300 },
            { category: "May 2022", value: 2400 },

        ]
    },
    {
        name: "Customer 3",
        stroke: "#A9DADB",
        data: [
            { category: "Jan 2022", value: 2500 },
            { category: "Feb 2022", value: 2450 },
            { category: "Mar 2022", value: 2300 },
            { category: "Apr 2022", value: 2400 },
            { category: "May 2022", value: 2400 },

        ]
    }
];

const CustomizedLabel = (props) => {
    const { x, y, stroke, value } = props;
    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
            {value}
        </text>
    );
};

export default function Chart() {
    return (
        <Box sx={{display:'flex', justifyContent:'center', height: '100%' }}>
            <Box sx={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                <LineChart width={800} height={400}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="category"
                        type="category"
                        allowDuplicatedCategory={false}
                    />
                    <YAxis dataKey="value" />
                    {/*<Tooltip />*/}
                    <Legend />

                    {series.map((s) => (
                        <Line dataKey="value" data={s.data} name={s.name} key={s.name} stroke={s.stroke} >
                            <LabelList content={<CustomizedLabel />} />
                        </Line>
                    ))}
                </LineChart>
            </Box>
        </Box>
    );
}

