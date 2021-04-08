import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notice() {

    const [notis, setNotis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchNotis = async () => {
            try {
                setError(null);
                setNotis(null);
                
                setLoading(true);
                const response = await axios.get('http://192.168.1.211:8080/api/notice');
                setNotis(response.data.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchNotis();
        return () => setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;
    if (!notis) return null;

    return (
        <div className="card">
            <h2 id="Notice"><font color="#0066ff">&#9483; </font>Notice</h2>
            <table>
                <tbody>
                    {notis.map((noti, index) => (
                        <tr>
                            <td className="row-title" key={index}>
                                <strong>&#x2611; {noti.version}</strong>
                            </td>
                            <td>
                                {noti.date}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Notice;