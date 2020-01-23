import React from 'react';
import { BarDiagram, RoundDiagram } from './Diagrams';

const DiagramFactory = (props) => {
    const { data, type, title } = props;

    switch (type) {
        case 'round':
            return <RoundDiagram data={data} title={title} />;
        case 'bar':
            return <BarDiagram data={data} title={title} />;
        default:
            return <div>Невозможно отобразить диаграмму</div>;
    }
};

export default DiagramFactory;
