import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { ProgressBar } from "react-bootstrap";
import Section from "../common/Section";
import Input from "../common/Input";
import Button from "../common/Button";
import Loader from "../common/Loader";
import Video from "../common/Video";
import { Upload } from "../icon";

const UploadWrapper = styled.div`
  ${props => props.theme.whiteBox};
  background: ${props => props.theme.bgColor};
  width: 100%;
  height: 50px;
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TextArea = styled.textarea`
  ${props => props.theme.whiteBox};
  width: 100%;
  height: 200px;
  resize: none;
  font-size: 14px;
  padding: 15px;
  background: ${props => props.theme.bgColor};
  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  ${props => props.theme.whiteBox};
  display: block;
  width: 100%;
  height: 35px;
  &:focus {
    outline: none;
  }
`;

export default ({
  data,
  loading,
  title,
  description,
  status,
  progress,
  fileEl,
  onClickUpload,
  onChangeTitle,
  onChangeDescription,
  onChangeStatus,
  onChangeFile,
  onSubmit
}) => (
  <Section>
    <Helmet>
      <title>포스트 {data ? "수정" : "등록"}</title>
    </Helmet>
    {loading && <Loader />}

    {data ? (
      <Video src={data.getPost.video.url} />
    ) : (
      <UploadWrapper onClick={onClickUpload}>
        {progress > 0 && (
          <div style={{ width: "100%" }}>
            <ProgressBar now={progress} label={`${progress}%`} />
          </div>
        )}
        {progress === 0 && <Upload style={{ width: 30, height: 30 }} />}

        <input
          type="file"
          onChange={onChangeFile}
          ref={fileEl}
          hidden
          accept="video/*"
        />
      </UploadWrapper>
    )}

    <form onSubmit={onSubmit}>
      <div>
        <Label>제목</Label>
        <Input
          placeholder={"제목을 입력하세요."}
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <div>
        <Label>내용</Label>
        <TextArea
          placeholder={"내용을 입력하세요."}
          value={description}
          onChange={onChangeDescription}
        />
      </div>
      <div>
        <Label>공개설정</Label>
        <Select value={status} onChange={onChangeStatus}>
          <option value="PUBLIC">공개</option>
          <option value="PRIVATE">비공개</option>
        </Select>
      </div>

      <div style={{ marginTop: 30 }}>
        <Button text={data ? "수정" : "등록"} />
      </div>
    </form>
  </Section>
);
