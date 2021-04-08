import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notice() {

    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchNotes = async () => {
            try {
                setError(null);
                setNotes(null);
                
                setLoading(true);
                const response = await axios.get('http://192.168.1.211:8080/api/releaseNotes');
                setNotes(response.data.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchNotes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;
    if (!notes) return null;

    return (
        <div class="card">
            <h2 id="Release Notes"><font color="#0066ff">&#9483; </font>Release Notes</h2>
            <table>
                <tbody>
                    {notes.map(note => (
                        <tr>
                            <td class="row-title">
                                <strong>&#x2611; {note.version}</strong>
                            </td>
                            <td class="row-click">
                                <a class="n1" href={note.file_name} target="_blank">Click</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Notice;