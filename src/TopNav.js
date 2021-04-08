import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopNav() {

    const [navis, setNavis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchNavis = async () => {
            try {
                setError(null);
                setNavis(null);
                
                setLoading(true);
                const response = await axios.get('http://192.168.1.211:8080/api/navigator');
                setNavis(response.data.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchNavis();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;
    if (!navis) return null;

    return (
        <div className="topnav">
            {navis.map(navi => (
                <a href={`#${navi.name}`} key={navi.name}>{navi.name}</a>   
            ))}
        </div>
    );

}

export default TopNav;