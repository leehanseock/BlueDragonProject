import React from "react";
import './MainCss/Sidebar.css'

const Sidebar_ = ({ cafeName, memberCount, menuItems }) => {
    return (
        <aside className="sidebar1">
            <div className="cafe-info1">
                <h3 className="cafe-name1">{cafeName}</h3>
                <p className="member-count1">회원수 {memberCount}명</p>
            </div>
            <ul className="menu-list1">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        {item.name} <span>{item.count}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

const Sidebar = () => {
    const menuItems = [
        { name: '전체게시판', count: 1000 },
        { name: '공지사항', count: 12 },
        { name: '자유게시판', count: 2345 },
        { name: '질문과답변', count: 890 },
        { name: '갤러리', count: 567 },
        { name: '정보공유', count: 234 },
        { name: '동영상', count: 123 }
    ];

    return (
        <div className={"test"}>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Sidebar_
                cafeName="청룡인 커뮤니티"
                memberCount={23456}
                menuItems={menuItems}
            />
            {/* 다른 컴포넌트들 */}
        </div>
    );
};

export default Sidebar;