import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import moment from "moment";
import Section from "../common/Section";
import Input from "../common/Input";
import Avatar from "../common/Avatar";
import Timestamp from "../common/Timestamp";
import { Link } from "../auth/StyledComponents";

const Wrapper = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;

  & > div {
    border-bottom: ${props => props.theme.boxBorder};
  }
`;

const Header = styled.div`
  width: 100%;
  display flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 10px;
`;

const MessageItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Body = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.03);

  ${MessageItem} {
    margin-bottom: 5px;
  }
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 30px;
`;

const Content = styled(UserName)`
  flex: 1;
  height: auto;
  display: flex;
  justify-content: flex-start;

  & > div {
    background: rgba(0, 0, 0, 0.03);
  }
`;

const MyContent = styled(Content)`
  justify-content: flex-end;

  & > div {
    background: ${props => props.theme.blueColor};
    color: white;
  }
`;

const Message = styled.div`
  padding: 1rem;
  border: ${props => props.theme.boxBorder};
  border-radius: 4px;
  width: auto;
  max-width: 50%;
  position relative;


  ${props =>
    props.date &&
    `
  &:after {
    content: '${props.date}';
    position: absolute;
    bottom: 0;
    left: -150px;
    width: 140px;
    height: 15px;
    font-weight: 400;
    opacity: 0.5;
    font-size: 12px;
    color: black;
  }
`}
${props => props.theme.smallQuery`${!props.date && "max-width: 100%"}`}
`;

const Footer = styled.div`
  padding: 1rem;
  display: flex;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({
  data: { getMessageRoom },
  profile,
  message,
  messages,
  bodyEl,
  onChangeMessage,
  onSubmit
}) => (
  <Section>
    <Helmet>
      <title>대화방</title>
    </Helmet>
    <Wrapper>
      <Header>
        <Link onClick={() => history.back()}>뒤로가기</Link>
      </Header>
      <Body ref={bodyEl}>
        {messages.map(({ id, from, content, createdAt }) => (
          <MessageItem key={id}>
            {from.id == profile.id ? (
              <MyContent>
                <Message
                  datePosition="left"
                  date={moment(createdAt).format("YYYY년 MM월 DD일 HH:mm")}
                >
                  {content}
                </Message>
              </MyContent>
            ) : (
              <Fragment>
                <UserInfo>
                  <Avatar size="30" src={from.avatar.url} />
                  <UserName>{from.nickname}</UserName>
                  <Timestamp
                    text={moment(createdAt).format("YYYY년 MM월 DD일 HH:mm")}
                  />
                </UserInfo>
                <Content>
                  <Message>{content}</Message>
                </Content>
              </Fragment>
            )}
          </MessageItem>
        ))}
      </Body>
      <Footer>
        <Form onSubmit={onSubmit}>
          <Input
            placeholder="메시지를 입력하세요."
            value={message}
            onChange={onChangeMessage}
            required
          />
        </Form>
      </Footer>
    </Wrapper>
  </Section>
);
