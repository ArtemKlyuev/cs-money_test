import React, { useState, useEffect } from 'react';
import { formatTime } from '../../utils';
import classes from './DataTable.module.css';

const DataList = (props) => {
    const [data, setData] = useState([]);
    const [sortDirection, setSortDirection] = useState({
        increase: null
    });
    const [whichHeaderClicked, setWhichHeaderClicked] = useState('');

    const { fetchedData } = props;

    const associations = {
        online: true,
        offline: false,
        id: 'id',
        Имя: 'name',
        Статус: 'status',
        Рейтинг: 'average_rating',
        'Количество обращений': 'tickets_count',
        'Среднее время ответа': 'average_response_time'
    };

    const sortData = () => {
        let newData = null;
        let dataProperty = associations[whichHeaderClicked];

        if (sortDirection.increase) {
            newData = [...data];

            newData.sort((a, b) => {
                if (dataProperty === 'status') {
                    return (
                        associations[a[dataProperty]] -
                        associations[b[dataProperty]]
                    );
                }
                return a[dataProperty] - b[dataProperty];
            });

            setData(newData);
        } else {
            newData = [...data];

            newData.sort((a, b) => {
                if (dataProperty === 'status') {
                    return (
                        associations[b[dataProperty]] -
                        associations[a[dataProperty]]
                    );
                }
                return b[dataProperty] - a[dataProperty];
            });

            setData(newData);
        }
    };

    useEffect(() => {
        sortData();
    }, [sortDirection]);

    useEffect(() => {
        if (data.length === 0) {
            setData(fetchedData);
        }
    }, [fetchedData, data]);

    const handleHeaderClick = (e, header) => {
        const { increase } = sortDirection;

        if (increase === null) {
            setSortDirection({ increase: true });
            setWhichHeaderClicked(header);
            return;
        }
        setSortDirection({ increase: !increase });
        setWhichHeaderClicked(header);
    };

    const bodyData = data.map((elem) => {
        const {
            id,
            name,
            avatar,
            status,
            average_rating,
            tickets_count,
            average_response_time
        } = elem;

        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{avatar}</td>
                <td>{status}</td>
                <td>{tickets_count}</td>
                <td>{average_rating}</td>
                <td>{formatTime(average_response_time)}</td>
            </tr>
        );
    });

    let headers = [
        'id',
        'Имя',
        'Аватар',
        'Статус',
        'Количество обращений',
        'Рейтинг',
        'Среднее время ответа'
    ];

    headers = headers.map((header) => {
        if (header === 'Статус' || header === 'Среднее время ответа') {
            return (
                <th key={header} onClick={(e) => handleHeaderClick(e, header)}>
                    {header}
                </th>
            );
        }

        return <th key={header}>{header}</th>;
    });

    return (
        <table className={classes.table}>
            <thead className={classes.tableHead}>
                <tr>{headers}</tr>
            </thead>
            <tbody className={classes.body}>{bodyData}</tbody>
        </table>
    );
};

export default DataList;
