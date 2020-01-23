import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable/DataTable';
import DiagramFactory from './components/DiagramFactory/DiagramFactory';
import axios from 'axios';
import classes from './App.module.css';
const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (data.length === 0) {
            axios
                .get('data/data.json')
                .then((res) => {
                    const response = res.data.data;
                    setData(response);
                })
                .catch((err) => console.error(err));
        }
    });

    return (
        <div className={classes.container}>
            <div className={classes.table}>
                <DataTable fetchedData={data} />
            </div>

            <div className={classes.diagrams}>
                <DiagramFactory
                    data={data}
                    type={'round'}
                    title={'Данные по количеству обращений'}
                />
                <DiagramFactory
                    data={data}
                    type={'bar'}
                    title={'Данные по рейтингу'}
                />
            </div>
        </div>
    );
};

export default App;
