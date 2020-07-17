import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "../common/Section";
import Input from "../common/Input";
import Button from "../common/Button";
import Avatar from "../common/Avatar";
import { Carousel } from "react-bootstrap";
import CarouselContainer, {
  CarouselColumn,
  CarouselItem
} from "../common/Carousel";

const Wrapper = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;

  & > div {
    border-bottom: ${(props) => props.theme.boxBorder};
  }
`;

const Header = styled.div`
  height: 80px;
  width: 100%;
`;

const MessageItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const Body = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.03);

  ${MessageItem} {
    margin-bottom: 5px;
  }
`;

const UserName = styled.div`
  ${(props) => props.theme.flexCenter};
  padding: 10px;
  height: 30px;
`;

const Content = styled(UserName)`
  flex: 1;
  height: auto;
  padding: 10px;
  display: flex;
  justify-content: flex-start;

  & > div {
    background: rgba(0, 0, 0, 0.03);
  }
`;

const MyContent = styled(Content)`
  justify-content: flex-end;

  & > div {
    background: ${(props) => props.theme.blueColor};
    color: white;
  }
`;

const Message = styled.div`
  padding: 1rem;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 4px;
  width: 50%;
`;

const Footer = styled.div`
  padding: 1rem;
  display: flex;
`;

const InputWrapper = styled.div`
  flex: 1;
  ${(props) => props.theme.flexCenter};
`;

const ButtonWrapper = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 150px;
  height: 100%;
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
      {/* <Header>
        <CarouselContainer>
          {getMessageRoom.participants
            .reduce((store, participant, index) => {
              const max = 4;
              const columnIndex = Math.floor(index / max);
              if (!store[columnIndex]) {
                store[columnIndex] = [];
              }
              store[columnIndex] = [...store[columnIndex], participant];
              return store;
            }, [])
            .map((v, idx) => (
              <Carousel.Item key={`carouselWrap${idx}`}>
                <CarouselColumn>
                  {v.map((participant, idx2) => (
                    <CarouselItem key={`carouselItem${idx2}`}>
                      <Avatar
                        size="40"
                        src={
                          participant.avatar
                            ? participant.avatar.url
                            : `${process.env.S3_IMAGE_PATH}${process.env.DEFAULT_AVATAR}`
                        }
                      />
                    </CarouselItem>
                  ))}
                </CarouselColumn>
              </Carousel.Item>
            ))}
        </CarouselContainer>
      </Header> */}
      <Body ref={bodyEl}>
        {messages.map(({ id, from, content }) => (
          <MessageItem key={id}>
            {from.id == profile.id ? (
              <MyContent>
                <Message>{content}</Message>
              </MyContent>
            ) : (
              <>
                <Avatar
                  size="30"
                  src={
                    from.avatar
                      ? from.avatar.url
                      : `${process.env.S3_IMAGE_PATH}${process.env.DEFAULT_AVATAR}`
                  }
                />
                <UserName>{from.nickname}</UserName>
                <Content>
                  <Message>{content}</Message>
                </Content>
              </>
            )}
          </MessageItem>
        ))}
      </Body>
      <Footer>
        <InputWrapper>
          <Input
            placeholder="메시지를 입력하세요."
            value={message}
            onChange={onChangeMessage}
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button text="입력" onClick={onSubmit} />
        </ButtonWrapper>
      </Footer>
    </Wrapper>
  </Section>
);
