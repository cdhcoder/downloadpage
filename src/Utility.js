import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Utility() {

    const [utils, setUtils] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchUtils = async () => {
            try {
                setError(null);
                setUtils(null);
                
                setLoading(true);
                const response = await axios.get('http://192.168.1.211:8080/api/utility');
                setUtils(response.data.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchUtils();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;
    if (!utils) return null;

    return (
        <div className="card">
            <h2 id="Utilities"><font color="#0066ff">&#9483; </font>Utility</h2>
            <table>
                <tbody>
                    {utils.map(util => (
                        <tr key={util.name}>
                            <td>
                                <strong>{util.name}</strong>
                            </td>
                            {util.file_name !== '-' ? 
                                <td>
                                    <a className="m1" href={util.file_name} target="_blank">Download</a>
                                </td>
                                : <td>{util.file_name}</td>
                            }
                            {util.guide !== '-' ? 
                                <td>
                                    <a className="m2" href={util.guide} target="_blank">설치/실행 가이드</a>
                                </td>
                                : <td>{util.guide}</td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Utility;