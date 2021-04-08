import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsefulLinks() {

    const [links, setLinks] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchLinks = async () => {
            try {
                setError(null);
                setLinks(null);
                
                setLoading(true);
                const response = await axios.get('http://192.168.1.211:8080/api/usefulLinks');
                setLinks(response.data.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchLinks();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;
    if (!links) return null;

    return (
        <div className="card">
            <h2 id="Links"><font color="#0066ff">&#9483; </font>UsefulLinks</h2>
            <table>
                <tbody>
                    {links.map(link => (
                        <tr key={link.name}>
                            <td>
                                <strong>{link.name}</strong>
                            </td>
                            <td>
                                <a class="url1" href={link.url} target="_blank">{link.url}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsefulLinks;