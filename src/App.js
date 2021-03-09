import React from 'react';
import './App.css';

function  Header(){
  return (
      <div class="header">
          <img src="http://192.168.1.211/os_logo.png" width="400" height="100"/>
          <h3>TmaxOS Download Page</h3>
      </div>
  );
}

const left_navi = [
  {
    id: 1,
    name: "Notice",
    date: "Aug 1, 2019",
    data: ["TmaxOS 5.0.17 업데이트", "TmaxOS 4.0.1 업데이트"]
  },
  {
    id: 2,
    name: "Release",
    date: "March 5, 2021",
    data: ["TmaxOS_3.5.0", "ToOffice_3.5.0"]
  },
  {
    id: 5,
    name: "Utility",
    data: ["한글2014", "Rufus 2.11"]
  },
  {
    id: 6,
    name: "Links",
    data: ["PDF 변환", "이미지 편집", "압축 풀기"]
  }
];

const right_navi = [
  {
    id: 3,
    name: "Download",
    data: ["TmaxOS 5.0.17", "TmaxOS 4.0.1"]
  },
  {
    id: 4,
    name: "Manual",
    data: ["Installer 생성 가이드", "사용자 안내서 (User Guide)", "프린트 설정 안내서", "Multibooting Guide"]
  },
];

function Topnav({ name }){

  return (
      <a href={`#${name}`}>{name}</a>
  );
}

function Card({ name, date, data }){
 
  return (
    <div className="card">
      <h2 id={name}><font color="#0066ff">&#9483; </font>{name}</h2>
      <h5>{date}</h5>
      <table>
        {data.map(trs => (
          <tr>
            <td class="row-title">
              <strong>&#x2611; {trs}</strong>
            </td>
            { name === "Release" ?
              <td class="row-click">
              <a class="n1" href={`/release_note/${trs}_release-note.pdf`} target="_blank">Click</a>
            </td> : <td></td>
            }
          </tr>
        ))}
      </table>
    </div>
  );
}

function Footer(){
  return (
    <div className="footer">
      <h5>2021 OSQA Team, TmaxOS. All rights reserved.</h5>
    </div>
  );
}

function App() {
  const navigator = [
    ...left_navi,
    ...right_navi
  ];

  return (
    <div className="App">
      <Header />
      <div className="topnav">
        {navigator.map(nav => (
          <Topnav name={nav.name} />
        ))}
      </div>
      <div className="row">
        <div className="leftcolumn">
          {left_navi.map(nav => (
            <Card id={nav.id} name={nav.name} date={nav.date} data={nav.data} />
          ))}
        </div>
        <div className="rightcolumn">
          {right_navi.map(nav => (
            <Card id={nav.id} name={nav.name} date={nav.date} data={nav.data} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
