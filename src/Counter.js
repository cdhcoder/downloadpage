import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Counter() {

    const [cnts, setCnts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchCnts = async () => {
            try {
                setError(null);
                setCnts(null);
                
                setLoading(true);
                const response = await axios.get('http://192.168.1.211:8080/api/counter');
                setCnts(response.data.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchCnts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;
    if (!cnts) return null;

    return (
        <h3> 누적 다운로드 수 &nbsp;
            {cnts.map(cnt => (
                cnt.cnt
            ))}
        </h3>
    );
}

export default Counter;