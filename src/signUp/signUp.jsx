import React, {useState} from "react";
import './signUp.css';
import Logo from "../MainResource/NgHook";


function SingUp(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('남자');
    const [interests, setInterests] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        alert(`
        이름: ${name}
        이메일: ${email}
        성별: ${gender}
        관심사: ${interests}`)
    }

    const handleChange = (event) => {
        const {target} = event;
        switch (target.id) {
            case "text":
                setName(target.value);
                break;
            case "email":
                setEmail(target.value);
                break;
            case "password":
                setPassword(target.value);
                break;
            case "gender":
                setGender(target.value);
                break;
            case "interests":
                setInterests(target.value);
                break;
        }
    }



    return (
        <div className="signUp-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} className="signUp-form">
                <label className="signUp-label">
                    이름:
                    <input
                        id="text"
                        value={name}
                        onChange={handleChange}
                        required
                        className="signUp-input"
                    />
                </label>

                <label className="signUp-label">
                    이메일:
                    <input
                        id="email"
                        value={email}
                        onChange={handleChange}
                        required
                        className="signUp-input"
                    />
                </label>

                <label className="signUp-label">
                    비밀번호:
                    <input
                        id="password"
                        value={password}
                        onChange={handleChange}
                        required
                        className="signUp-input"
                    />
                </label>

                <label className="signUp-label">
                    성별:
                    <select id="gender" onChange={handleChange} className="signUp-select">
                        <option value="남자">남자</option>
                        <option value="여자">여자</option>
                        <option value="기타">기타</option>
                    </select>
                </label>

                <label className="signUp-label">
                    관심사:
                    <textarea
                        id="interests"
                        onChange={handleChange}
                        placeholder="관심사를 입력하세요"
                        className="signUp-textarea"
                    />
                </label>
                <Logo name={"취소"} className={"signUp-btn"} loc={"/"}/>
                <button type="submit" className="signUp-button">submit</button>
            </form>
        </div>
    );
}
export default SingUp;