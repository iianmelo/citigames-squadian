'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import GameControllerOff from "../../assets/GameControllerOff.png";
import GameControllerOn from "../../assets/GameControllerOn.png";
import UserOff from "../../assets/UserOff.png";
import UserOn from "../../assets/UserOn.png";
import  CITi_logo  from "../../assets/CITi_white_logo.png";

export default function Sidebar() {
  const [ExploreMatchesSelected, setExploreMatchesSelected] = useState(false);
  const [ProfileSelected, setProfileSelected] = useState(false);

function handleClick(option: number){
  if (option === 1){
    setExploreMatchesSelected(true);
    setProfileSelected(false);
  } else if (option == 2){
    setExploreMatchesSelected(false);
    setProfileSelected(true);
  } else {
    setExploreMatchesSelected(false);
    setProfileSelected(false);
  }
}

return (
  <div style={{display: 'flex', backgroundColor: '#58CBFB', alignItems: 'center', height: '100vh', width: '280px', padding: '20px', position: 'fixed', top: '0', left: '0', flexDirection: 'column', justifyContent: 'flex-start'}}>

    <div style={{justifyContent: 'center', alignItems: 'center', width: '100%', display: 'flex', marginTop: '40px'}}>
      <Image src={CITi_logo} alt="Logo citi" width={100} height={300} />
    </div>

    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '40px'}}>
      <button className="custom-button" onClick={() => handleClick(1)}>
        <Image src={ExploreMatchesSelected ? GameControllerOn : GameControllerOff} alt="Explore Matches" width={30} height={30}/>
        <p style={{ color: 'white' }}>Explorar Partidas</p>
      </button>

      <button className="custom-button" onClick={() => handleClick(2)}>
        <Image src={ProfileSelected ? UserOn : UserOff} alt="Profile" width={30} height={30}/>
        <p style={{color: 'white'}}>Perfil</p>
      </button>
    </div>

    <div style={{justifyContent: 'center', display: 'flex', alignItems: 'center', marginTop: 'auto'}}>
      <p className="text-white text-base">
        Made with <strong>&lt; &#x0002F; &gt;</strong> and{" "}
        <strong>&hearts;</strong> by CITi
      </p>
    </div>

  </div>
);
}