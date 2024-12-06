import React from 'react';
import { useNavigate } from 'react-router-dom';
import postFirst from "../postFirst/postFirst";

function postLogo({name,post_id}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();  // useNavigate 훅을 사용하여 navigate 함수 얻기
    function handleLogoClick() {
        navigate('/postFirst');  // 클릭 시 해당 경로로 이동
    }

    return (
        <div onClick={handleLogoClick}>
            {name}
        </div>
    );
}

export default postLogo;