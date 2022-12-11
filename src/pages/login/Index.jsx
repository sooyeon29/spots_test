import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { LoginAPI } from "../../tools/instance";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from "./OAuth";
import TapBar from "../../components/TapBar";
import useToggle from "../../hooks/useToggle";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import Swal from "sweetalert2";
import {
  FindButs,
  GoogleBtn,
  InputWrap,
  InputWrapLower,
  KakaoBtn,
  LoginBtn,
  Logo,
  SocialLogin,
  Stinput,
  StWraps,
} from "./Styles";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });
  const [showPw, setShowPw, showPwHandler] = useToggle();

  const idAndPassword = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    LoginAPI.login({ loginId: loginInfo.id, password: loginInfo.password })
      .then((res) => {
        // console.log("로그인성공 response", res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("nickname", res.data.nickname);
          navigate("/");
        } else if (res.status === 202) {
          Swal.fire({
            text: "휴면계정입니다. 계정을 활성화하시겠습니까?",
            width: "350px",
            showCancelButton: true,
            confirmButtonColor: "#40d295",
            cancelButtonColor: "#FF00B4",
            confirmButtonText: "계정 활성화하러 가기",
            cancelButtonText: "취소",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem("token", res.data.accessToken);
              navigate("/switchaccount", { state: loginInfo.id });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          Swal.fire({
            text: "이미 로그인된 상태입니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        } else if (err.response.status === 412) {
          Swal.fire({
            text: "아이디 또는 패스워드를 확인해주세요",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
      });
  };

  return (
    <>
      <Layout>
        <Header />
        <StWraps>
          <form onSubmit={loginHandler}>
            <InputWrap>
              <Logo>
                <img alt="" src="/spotslogo.png" />
              </Logo>
              <InputWrapLower>
                <BsFillPersonFill size={24} color={"#949494"} />
                <Stinput
                  placeholder="아이디를 입력해주세요"
                  type="text"
                  required
                  name="id"
                  onChange={idAndPassword}
                  autoComplete="off"
                />
              </InputWrapLower>
              <InputWrapLower>
                <IoIosLock size={24} color={"#949494"} />
                <Stinput
                  placeholder="비밀번호를 입력해주세요"
                  type={showPw ? "text" : "password"}
                  required
                  name="password"
                  value={loginInfo.password}
                  onChange={idAndPassword}
                />

                <button type="button" onClick={showPwHandler}>
                  <BsEyeSlash size={23} color={"#949494"} />
                </button>
              </InputWrapLower>
            </InputWrap>
            <LoginBtn>로그인</LoginBtn>
          </form>

          <SocialLogin>
            <a href={KAKAO_AUTH_URL}>
              <KakaoBtn>
                <img alt="" src="/kakao.png" width={25} />
                카카오 로그인
              </KakaoBtn>
            </a>
            <a href={GOOGLE_AUTH_URL}>
              <GoogleBtn>
                <img alt="" src="/google.png" width={27} />
                구글 로그인
              </GoogleBtn>
            </a>
          </SocialLogin>

          <FindButs>
            <button onClick={() => navigate(`/findid`)}>아이디찾기</button>
            <button onClick={() => navigate(`/findpw`)}>비밀번호찾기</button>
            <button onClick={() => navigate(`/signup`)}>회원가입</button>
          </FindButs>
        </StWraps>
        <TapBar />
      </Layout>
    </>
  );
};
export default Login;
