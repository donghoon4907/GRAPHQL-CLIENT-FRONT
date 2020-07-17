import React, { useState, useCallback, useEffect, useRef } from "react";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import MessageRoomPresenter from "./MessageRoomPresenter";
import { GET_MYPROFILE } from "../../query/auth";
import { GET_MESSAGEROOM, ADD_MESSAGE, SYNC_MESSAGE } from "../../query/user";

export default ({ location: { pathname } }) => {
  const [_, __, roomId] = pathname.split("/");

  const { data } = useQuery(GET_MESSAGEROOM, {
    variables: {
      roomId
    },
    suspend: true
  });

  const {
    data: { getMyProfile }
  } = useQuery(GET_MYPROFILE, {
    suspend: true
  });

  const [addMessageMutation, { loading }] = useMutation(ADD_MESSAGE, {
    variables: {
      roomId
    },
    suspend: true
  });

  const bodyEl = useRef(null);
  const [messages, setMessages] = useState(data.getMessageRoom.messages || []);
  const [message, setMessage] = useState("");

  const { data: newMessage } = useSubscription(SYNC_MESSAGE, {
    variables: {
      roomId
    }
  });

  const handleChangeMessage = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (loading) return;
    const {
      data: { addMessage }
    } = await addMessageMutation({
      variables: { content: message, roomId }
    });
    if (addMessage) {
      setMessage("");
    }
  }, [message, loading]);

  useEffect(() => {
    bodyEl.current.scrollTop = bodyEl.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (newMessage) {
      setMessages((prevState) => [...prevState, newMessage.syncMessage]);
    }
  }, [newMessage]);

  return (
    <MessageRoomPresenter
      data={data}
      profile={getMyProfile}
      message={message}
      messages={messages}
      bodyEl={bodyEl}
      onChangeMessage={handleChangeMessage}
      onSubmit={handleSubmit}
    />
  );
};
