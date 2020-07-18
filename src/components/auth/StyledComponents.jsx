import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;

export const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius: 0;
  width: 100%;
  max-width: 350px;
`;
export const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
  &:link {
    margin-left: 523px;
  }
`;
export const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

export const Form = styled(Box)`
  padding: 1rem;
  padding-bottom: 30px;
  margin-bottom: 15px;
  width: 100%;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(last-child) {
        margin-bottom: 10px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
