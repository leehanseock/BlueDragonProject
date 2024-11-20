import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logo({name,loc,className}) {
    const navigate = useNavigate();  // useNavigate 훅을 사용하여 navigate 함수 얻기

    function handleLogoClick() {
        navigate(loc);  // 클릭 시 해당 경로로 이동
    }

    return (
        <div className={className} onClick={handleLogoClick}>
            {name}
        </div>
    );
}

export default Logo;