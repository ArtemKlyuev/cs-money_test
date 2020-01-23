import React, { useState, useEffect, Fragment } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { generateColor } from '../../../utils';

const RoundDiagram = (props) => {
    const [cellColors, setCellColors] = useState([]);
    const { data, title } = props;
    const colors = [];

    const filtredData = data.map((element) => {
        const color = generateColor(Math.random(), 0.3, 0.8);
        colors.push(color);
        const { name, tickets_count } = element;
        return { name, value: tickets_count };
    });

    useEffect(() => {
        if (cellColors.length !== data.length) {
            setCellColors([...cellColors, ...colors]);
        }
    }, [data]);

    const coloredCells = filtredData.map((data, index) => (
        <Cell fill={cellColors[index]} key={data.name} />
    ));

    return (
        <Fragment>
            <p style={{ textAlign: 'center' }}>{title}</p>
            <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                    <Pie
                        isAnimationActive={true}
                        data={filtredData}
                        cy={200}
                        outerRadius={120}
                        fill="#8884d8"
                        label
                    >
                        {coloredCells}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Fragment>
    );
};

export { RoundDiagram };
