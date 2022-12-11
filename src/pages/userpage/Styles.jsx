import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Profile = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 120px;
  background-color: #000000;
  position: relative;
  z-index: 1;
  img {
    width: 88px;
    height: 88px;
    object-fit: cover;
    border: 4px solid #1746c7;
    border-radius: 50px;
    margin-top: -90px;
  }
  div {
    margin-top: -50px;
    margin-left: 90px;
    font-size: 20px;
    font-weight: 700;
    color: #fefefe;
  }
  p:first-child {
    text-align: right;
  }
  p:last-child {
    font-size: 32px;
    margin-top: -5px;
    margin-left: -35px;
    text-align: right;
    span {
      font-size: 20px;
      margin-left: 10px;
    }
  }
`;

export const PointBox = styled.div`
  width: 75%;
  height: 119px;
  border-radius: 8px;
  background-color: #1746c7;
  position: relative;
  z-index: 2;
  top: -60px;
  color: #fefefe;

  div:first-child {
    margin: 18px 0 0 20px;
  }

  div:last-child {
    display: flex;
    justify-content: flex-end;
    margin-right: 13px;

    h1 {
      text-align: right;
      margin-right: 10px;
      margin-top: 18px;
    }
    p {
      color: #49e7a5;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 35px;
      border-radius: 40px;
      font-size: 20px;
      font-weight: 700;
      background-color: black;
    }
  }
`;

export const MenuBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 360px;
  height: 360px;
  margin-top: -40px;
  padding: auto;
  padding-bottom: 70px;
  img {
    width: 170px;
    height: 170px;
    margin: auto;
    cursor: pointer;
  }
`;
