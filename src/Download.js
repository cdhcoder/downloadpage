import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Download({ onIncrease }) {

    const [dws, setDws] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchDws = async () => {
            try {
                setError(null);
                setDws(null);
                
                setLoading(true);
                const response = await axios.get('http://192.168.1.211:8080/api/download');
                setDws(response.data.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchDws();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;
    if (!dws) return null;


    return (
        <div className="card">
            <h2 id="Download"><font color="#0066ff">&#9483; </font>Download</h2>
            <h5>Mar 4, 2021</h5>
            <div className="fakeimg" style={{height:200+'px'}}>
                <table>
                    <tbody>
                        <tr>
                            <th className="row-proct">Product</th>
                            <th className="row-download">Download</th>
                            <th className="row-guide">Guide</th>
                        </tr>
                        {dws.map(dw => (
                            <tr key={dw.product}>
                                <td>
                                    <strong>{dw.product}</strong>
                                </td>
                                <td colSpan="2">
                                    <a className="d1" href={dw.file_name} target="_blank" onClick={onIncrease}>64bit</a>
                                </td>
                                <td>
                                    <strong>설치 가이드</strong>
                                    <span className="new-line">{`\n[Read] [Download]`}</span>
                                </td>
                                <td>
                                    <strong>업데이트 가이드</strong>
                                    <span className="new-line">{`\n[Read] [Download]`}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{lineHeight:0.1 + 'em'}}>
                    <h5>
                        <font color="red">Technet 접속 시 이용 권한이 없다는 메시지가 뜰 경우, TIMS로 로그인하시어 상단의 TECHNET 링크로 접속하시면 됩니다.</font>
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default Download;