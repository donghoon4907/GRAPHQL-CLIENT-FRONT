import React, { Fragment } from "react";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import Input from "../common/Input";
import { Label } from "../auth/StyledComponents";

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  ${props => props.theme.whiteBox};
  width: 100%;
  height: 300px;
  resize: none;
  font-size: 12px;
  overflow: auto;
  background: ${props => props.theme.bgColor};
  padding: 15px;
  &:focus {
    outline: none;
  }
`;

const ReadOnlyDescription = styled.div`
  ${props => props.theme.whiteBox};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  overflow: auto;
  background: white;
  padding: 15px;
`;

const PreviewWrap = styled(ReadOnlyDescription)`
  z-index: 10;

  & > span {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
`;

export default ({
  action,
  isMaster,
  title,
  description,
  mdDescription,
  preview,
  onShowEdit,
  onPreview,
  onRefreshPreview,
  onClose,
  onDelete,
  onSubmit
}) => (
  <Modal onHide={onClose} animation={true} show>
    <Modal.Header closeButton>
      <Modal.Title>
        {action.code === "readonly" || action.code === "modifiable"
          ? title.value
          : `공지사항 ${action.modalTitle}`}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <InputWrapper>
        {(action.code === "add" || action.code === "modify") && (
          <Fragment>
            <Label htmlFor="title" val={title.value}>
              제목을 입력하세요.
            </Label>
            <Input placeholder="제목을 입력하세요." name="title" {...title} />
          </Fragment>
        )}
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="description" val={description.value}>
          내용을 입력하세요.
        </Label>
        <TextArea
          placeholder="내용을 입력하세요."
          name="description"
          {...description}
        />
        {(action.code === "readonly" || action.code === "modifiable") && (
          <ReadOnlyDescription
            dangerouslySetInnerHTML={{ __html: mdDescription }}
            className="markdown-body"
          ></ReadOnlyDescription>
        )}
        {preview && (
          <PreviewWrap>
            <div
              dangerouslySetInnerHTML={{ __html: preview }}
              className="markdown-body"
            ></div>
            <span aria-hidden="true" onClick={onRefreshPreview}>
              ×
            </span>
          </PreviewWrap>
        )}
      </InputWrapper>
    </Modal.Body>
    <Modal.Footer>
      {(action.code === "readonly" || action.code === "modifiable") && (
        <Fragment>
          {isMaster && (
            <Button variant="danger" onClick={onDelete}>
              삭제
            </Button>
          )}
          <Button variant="info" onClick={isMaster ? onShowEdit : onClose}>
            {isMaster ? "수정" : "확인"}
          </Button>
        </Fragment>
      )}
      {(action.code === "modify" || action.code === "add") && (
        <Fragment>
          <Button
            variant="info"
            onClick={preview ? onRefreshPreview : onPreview}
          >
            {preview ? "미리보기 취소" : "미리보기"}
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            {action.code === "add" ? "등록" : "수정"}
          </Button>
        </Fragment>
      )}
    </Modal.Footer>
  </Modal>
);
