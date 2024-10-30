import React, { useEffect, useState } from 'react';
import { getAllConferences } from './api';
import { Link } from 'react-router-dom';

const ConferenceList = () => {
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        const fetchConferences = async () => {
            const data = await getAllConferences();
            setConferences(data);
        };
        fetchConferences();
    }, []);

    return (
        <div>
            <h2>All Conferences</h2>
            <ul>
                {conferences.map((conference) => (
                    <li key={conference.id}>
                        <Link to={`/conference/${conference.id}`}>{conference.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConferenceList;
