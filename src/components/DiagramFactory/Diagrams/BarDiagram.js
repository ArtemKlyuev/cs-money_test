import React, { useState, useEffect, Fragment } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { generateColor } from '../../../utils';

const BarDiagram = (props) => {
    const [barCollors, setBarCollors] = useState([]);
    const { data, title } = props;
    const colors = [];

    const filtredData = data.map((element) => {
        const color = generateColor(Math.random(), 0.3, 0.8);
        colors.push(color);

        const { name, average_rating } = element;
        return { name, average_rating: Number(average_rating) };
    });

    useEffect(() => {
        if (barCollors.length !== data.length) {
            setBarCollors([...barCollors, ...colors]);
        }
    }, [colors]);

    return (
        <Fragment>
            <p style={{ textAlign: 'center' }}>{title}</p>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    width={1200}
                    height={300}
                    data={filtredData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                        dataKey="average_rating"
                        fill={generateColor(Math.random(), 0.3, 0.8)}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Fragment>
    );
};

export { BarDiagram };
