import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Manual() {

    const [mans, setMans] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchMans = async () => {
            try {
                setError(null);
                setMans(null);
                
                setLoading(true);
                const response = await axios.get('http://192.168.1.211:8080/api/manual');
                setMans(response.data.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchMans();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;
    if (!mans) return null;

    return (
        <div className="card">
            <h2 id="Manual"><font color="#0066ff">&#9483; </font>Manual</h2>
            <div class='fakeimg'>
                <table>
                    <tbody>
                        {mans.map((man, index) => (
                            
                            <tr key={index}>
                            {index === 0 &&
                                <td rowSpan="4" class="row-man_product">
                                    {man.product}
                                </td>
                            }    
                                <td class="row-man_file">
                                    {man.name}
                                </td>
                                <td class="row-man_button">
                                    <a class="m1" href={man.url} target="_blank">Read</a>
                                </td>
                                <td class="row-man_button">
                                    <a class="m2" href={man.url} target="_blank">Download</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Manual;