import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import useToggle from "../../hooks/useToggle";
import { LoginAPI, SignUpAPI } from "../../tools/instance";
import {
  ContentWrap,
  FavSports,
  ForthPage,
  MySports,
  NextBtn,
  PageTitle,
  RecommendId,
  SecondPage,
  SportLabel,
  SportsBlock,
  StWrap,
  ThirdPage,
  GrayBorder,
  Logo,
  FootballInput,
  FootballDiv,
  TennisInput,
  TennisDiv,
  BadmintonInput,
  BadmintonDiv,
  SwimmingInput,
  SwimmingDiv,
  BaseballInput,
  BaseballDiv,
  BasketballInput,
  BasketballDiv,
  RunningInput,
  RunningDiv,
  GolfInput,
  GolfDiv,
  HealthInput,
  HealthDiv,
  RecommendTitle,
} from "./Styles";
import { LoginBtn } from "../login/Styles";

const SocialSignUp = () => {
  const [isCode, setIsCode] = useToggle();
  const [welcome, setwelcome, welcomeHandler] = useToggle();
  const [nickname, setNickname, nicknameHandler] = useToggle();
  const [phoneCode, setPhoneCode] = useToggle();
  const [codeSent, setCodeSent] = useToggle();
  const [addSport, setAddSport] = useToggle();
  const [nnConfirm, setNnConfirm] = useToggle();
  const [code, setCode] = useState("");
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });

  const navigate = useNavigate();

  const isMember = localStorage.getItem("loginId");
  const myImg = localStorage.getItem("profile");
  console.log(isMember);

  const onSubmit = async (data) => {
    SignUpAPI.socialSignUp({ ...data, loginId: isMember, profileImg: myImg })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          window.localStorage.removeItem("profile", "loginId");
          navigate(`/welcome`);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 412 && error.response.data.code === -4) {
          Swal.fire({
            text: "????????? ???????????????????????????",
            width: "300px",
            confirmButtonText: "??????",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
        if (error.response.status === 400) {
          Swal.fire({
            text: "??????????????? ?????? ???????????????",
            width: "300px",
            confirmButtonText: "??????",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
      });
  };

  // ????????? ?????? ??????
  const checkNn = () => {
    const nickname = getValues("nickname");
    if (!nickname || nickname.trim() === "") {
      Swal.fire({
        text: "???????????? ??????????????????",
        width: "300px",
        confirmButtonText: "??????",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    SignUpAPI.checkNickname({ nickname })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            text: "?????? ????????? ??????????????????",
            width: "300px",
            confirmButtonText: "??????",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
          setNnConfirm(true);
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 412) {
          Swal.fire({
            text: "?????? ?????? ?????? ??????????????????",
            width: "300px",
            confirmButtonText: "??????",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
      });
  };
  // ????????? ???????????? ??????

  const sendPhoneForCode = () => {
    const phone = getValues("phone");
    if (phone.length < 10) {
      Swal.fire({
        text: "10~11????????? ????????? ??????????????????",
        width: "300px",
        confirmButtonText: "??????",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
    } else {
      LoginAPI.postforVCode({ phone })
        .then((res) => {
          console.log(res);
          Swal.fire({
            text: "??????????????? ?????????????????????",
            width: "300px",
            confirmButtonText: "??????",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
          setIsCode(true);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 412) {
            Swal.fire({
              text: "?????? ????????? ????????? ???????????????",
              width: "300px",
              confirmButtonText: "??????",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
            return;
          } else {
            Swal.fire({
              text: "???????????? ?????? ????????? ???????????????",
              width: "300px",
              confirmButtonText: "??????",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
            return;
          }
        });
    }
  };
  const checkVCode = () => {
    const phone = getValues("phone");
    LoginAPI.postforCheckVCode({ code, phone })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            text: "????????? ?????????????????????",
            width: "300px",
            confirmButtonText: "??????",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
        setAddSport(true);
        setPhoneCode(false);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "?????? ????????? ?????? ???????????????",
          width: "300px",
          confirmButtonText: "??????",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
      });
  };
  return (
    <>
      <Layout>
        <Header />
        <StWrap>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!welcome ? (
              <ContentWrap>
                <div>
                  <img alt="" src="/spotslogo.png" />
                </div>
                <br />
                <div>
                  SPOTS ????????? ???????????????.
                  <br />
                  ????????? ????????? ?????? ?????? ????????? ???????????????.
                </div>
                <NextBtn
                  onClick={() => {
                    welcomeHandler();
                    setNickname(true);
                  }}
                >
                  ????????????
                </NextBtn>
                <LoginBtn
                  onClick={() => {
                    navigate(`/`);
                    window.localStorage.removeItem("loginId");
                  }}
                >
                  ????????? ????????????
                </LoginBtn>
              </ContentWrap>
            ) : null}
            {nickname ? (
              <ThirdPage>
                <Logo>
                  <img alt="" src="/spotslogo.png" />
                </Logo>
                <ContentWrap>
                  <GrayBorder>
                    <input
                      type="text"
                      {...register("nickname", {
                        required: true,
                        minLegnth: 1,
                      })}
                      placeholder="???????????? ??????????????????"
                      autoComplete="off"
                    />
                    <button
                      style={{
                        border: "none",
                        color: "#ff00b3",
                        fontWeight: "600",
                      }}
                      type="button"
                      onClick={checkNn}
                    >
                      ????????????
                    </button>
                  </GrayBorder>
                  {errors.nickname && errors.nickname.type === "required" && (
                    <p>???????????? ??????????????????</p>
                  )}
                  {errors.nickname && errors.nickname.type === "minLegnth" && (
                    <p>???????????? ??? ?????? ?????? ??????????????????</p>
                  )}

                  <div>
                    <input
                      style={{
                        width: "30px",
                      }}
                      checked="checked"
                      type="radio"
                      value="??????"
                      {...register("gender", { required: true })}
                    />
                    ??????
                    <input
                      style={{
                        width: "30px",
                      }}
                      type="radio"
                      value="??????"
                      {...register("gender", { required: true })}
                    />
                    ??????
                    {errors.gender && errors.gender.type === "required" && (
                      <p>????????? ??????????????????</p>
                    )}
                  </div>
                  <NextBtn
                    onClick={(e) => {
                      e.preventDefault();
                      if (!nickname) {
                        Swal.fire({
                          text: "???????????? ??????????????????",
                          width: "300px",
                          confirmButtonText: "??????",
                          confirmButtonColor: "#40d295",
                          showClass: { popup: "animated fadeInDown faster" },
                          hideClass: { popup: "animated fadeOutUp faster" },
                        });
                        return;
                      }
                      if (!nnConfirm) {
                        Swal.fire({
                          text: "???????????? ??????????????? ????????????",
                          width: "300px",
                          confirmButtonText: "??????",
                          confirmButtonColor: "#40d295",
                          showClass: { popup: "animated fadeInDown faster" },
                          hideClass: { popup: "animated fadeOutUp faster" },
                        });
                        return;
                      }
                      nicknameHandler();
                      setPhoneCode(true);
                    }}
                  >
                    ??????
                  </NextBtn>
                </ContentWrap>
              </ThirdPage>
            ) : null}
            {phoneCode ? (
              <SecondPage>
                <Logo>
                  <img alt="" src="/spotslogo.png" />
                </Logo>
                <ContentWrap>
                  <GrayBorder>
                    <input
                      type="text"
                      {...register("phone", {
                        required: true,
                        maxLegnth: 11,
                        pattern: /^[0-9]{3}[0-9]{3,4}[0-9]{4}/,
                      })}
                      maxLength={11}
                      placeholder="01012345678"
                      autoComplete="off"
                    />

                    {!codeSent ? (
                      <button
                        style={{
                          border: "none",
                          color: "#ff00b3",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                        type="button"
                        onClick={sendPhoneForCode}
                      >
                        ????????????
                      </button>
                    ) : (
                      <button
                        style={{
                          border: "none",
                          color: "#ff00b3",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                        type="button"
                        onClick={sendPhoneForCode}
                      >
                        ????????????
                      </button>
                    )}
                  </GrayBorder>
                  {errors.phone && errors.phone.type === "required" && (
                    <p>????????? ????????? ??????????????????</p>
                  )}
                  {errors.phone && errors.phone.type === "pattern" && (
                    <p>10~11????????? ????????? ??????????????????</p>
                  )}
                  {isCode && (
                    <GrayBorder>
                      <input
                        placeholder="??????????????? ???????????????"
                        type="text"
                        required
                        name="code"
                        autoComplete="off"
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </GrayBorder>
                  )}

                  <NextBtn
                    type="button"
                    onClick={() => {
                      checkVCode();
                      if (!isCode) {
                        Swal.fire({
                          text: "????????? ????????? ????????????",
                          width: "300px",
                          confirmButtonText: "??????",
                          confirmButtonColor: "#40d295",
                          showClass: { popup: "animated fadeInDown faster" },
                          hideClass: { popup: "animated fadeOutUp faster" },
                        });
                        return;
                      }
                    }}
                  >
                    ??????
                  </NextBtn>
                </ContentWrap>
              </SecondPage>
            ) : null}
            {addSport ? (
              <ForthPage>
                <PageTitle>?????? ????????? ?????????????</PageTitle>
                <SportsBlock>
                  <MySports>
                    <SportLabel>
                      <FootballInput
                        type="checkbox"
                        id="football"
                        value="football"
                        {...register("sports")}
                      />
                      <FootballDiv></FootballDiv>
                    </SportLabel>
                    <SportLabel>
                      <TennisInput
                        type="checkbox"
                        value="tennis"
                        {...register("sports")}
                      />
                      <TennisDiv />
                    </SportLabel>
                    <SportLabel>
                      <BadmintonInput
                        type="checkbox"
                        value="badminton"
                        {...register("sports")}
                      />
                      <BadmintonDiv></BadmintonDiv>
                    </SportLabel>
                  </MySports>
                  <PageTitle>?????? ????????? ???????????????????</PageTitle>
                  <FavSports>
                    <SportLabel>
                      <SwimmingInput
                        type="checkbox"
                        value="swim"
                        {...register("favSports")}
                      />
                      <SwimmingDiv />
                    </SportLabel>
                    <SportLabel>
                      <BaseballInput
                        type="checkbox"
                        value="baseball"
                        {...register("favSports")}
                      />
                      <BaseballDiv />
                    </SportLabel>
                    <SportLabel>
                      <BasketballInput
                        type="checkbox"
                        value="basketball"
                        {...register("favSports")}
                      />
                      <BasketballDiv />
                    </SportLabel>
                  </FavSports>{" "}
                  <FavSports>
                    <SportLabel>
                      <RunningInput
                        type="checkbox"
                        value="running"
                        {...register("favSports")}
                      />
                      <RunningDiv />
                    </SportLabel>
                    <SportLabel>
                      <GolfInput
                        type="checkbox"
                        value="golf"
                        {...register("favSports")}
                      />
                      <GolfDiv />
                    </SportLabel>
                    <SportLabel>
                      <HealthInput
                        type="checkbox"
                        value="health"
                        {...register("favSports")}
                      />
                      <HealthDiv />
                    </SportLabel>
                  </FavSports>
                  <RecommendTitle>????????? ID??? ??????????????????</RecommendTitle>
                  <GrayBorder>
                    <RecommendId
                      type="text"
                      {...register("recommendId", {})}
                      placeholder="5,000????????? ?????? ??????"
                      autoComplete="off"
                    />
                  </GrayBorder>
                  <NextBtn type="submit">????????????</NextBtn>
                </SportsBlock>
              </ForthPage>
            ) : null}
          </form>
        </StWrap>
        <TapBar />
      </Layout>
    </>
  );
};

export default SocialSignUp;
