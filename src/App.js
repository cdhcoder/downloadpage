import React, { useState } from 'react';
import './App.css';
import TopNav from './TopNav';
import Notice from './Notice';
import ReleaseNote from './ReleaseNote';
import Utility from './Utility';
import UsefulLinks from './UsefulLinks';
import Download from './Download';
import Manual from './Manual';
import Counter from './Counter';
import logo from './resources/os_logo.png'
import axios from 'axios';

function  Header( {number} ){

  return (
      <div className="header">
          <img src={logo} width="400" height="100"/>
          {/* <h3>TmaxOS Download Page</h3> */}
          <Counter />
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

  const [number, setNumber] = useState(0);

  const onIncrease = () => {
      setNumber(number + 1);

      fetch("http://192.168.1.211:8080/api/count", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(number),
      })
        .then((res) => res.json())
        .then((json) =>{
          console.log(json);
          
        });
  };

  return (
    <div className="App">
      <Header number={number}/>
      <TopNav />
      <div className="row">
        <div className="leftcolumn">
          <Notice />
          <ReleaseNote />
          <Utility />
          <UsefulLinks />
        </div>
        <div className="rightcolumn">
          <Download onIncrease={onIncrease}/>
          <Manual />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
