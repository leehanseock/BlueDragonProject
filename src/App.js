
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import AllBulletinBoards from './AllBulletinBoards/ABB';
import Freetalk from './Freetalk/Freetalk';
import Login from './Login/Login';
import SignUp from './signUp/signUp';
import Notice from './Notice/Notice';
import WritingPage from "./writing/writing";
import AllNotice from "./allNotice/allNotice";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-bulletin-boards" element={<AllBulletinBoards />} />
          <Route path="/Notice" element={<Notice />} />
          <Route path="/freetalk" element={<Freetalk />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
            <Route path="/write" element={<WritingPage />} />
            <Route path="/allNotice" element={<AllNotice />} />
        </Routes>

      </Router>
  );
}

export default App;