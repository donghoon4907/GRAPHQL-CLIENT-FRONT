import React, { useState, useCallback, useEffect, useRef } from "react";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import MessageRoomPresenter from "./MessageRoomPresenter";
import { GET_MYPROFILE } from "../../query/auth";
import { GET_MESSAGEROOM, ADD_MESSAGE, SYNC_MESSAGE } from "../../query/user";
import Loader from "../common/Loader";

export default ({ location: { pathname } }) => {
  const [_, __, roomId] = pathname.split("/");

  const { data, loading } = useQuery(GET_MESSAGEROOM, {
    variables: {
      roomId
    }
  });

  const { data: profiles } = useQuery(GET_MYPROFILE);

  const [addMessageMutation, { loading: addMessageLoading }] = useMutation(
    ADD_MESSAGE,
    {
      variables: {
        roomId
      }
    }
  );

  const bodyEl = useRef(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const { data: newMessage } = useSubscription(SYNC_MESSAGE, {
    variables: {
      roomId
    }
  });

  const handleChangeMessage = useCallback(e => {
    setMessage(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (addMessageLoading) return;
      const {
        data: { addMessage }
      } = await addMessageMutation({
        variables: { content: message, roomId }
      });
      if (addMessage) {
        setMessage("");
      }
    },
    [message, addMessageLoading]
  );

  useEffect(() => {
    if (newMessage) {
      setMessages(prevState => [...prevState, newMessage.syncMessage]);
    }
  }, [newMessage]);

  useEffect(() => {
    if (data) {
      setMessages(data.getMessageRoom.messages);
    }
  }, [data, bodyEl]);

  useEffect(() => {
    if (messages.length > 0) {
      bodyEl.current.scrollTop = bodyEl.current.scrollHeight;
    }
  }, [messages, bodyEl]);

  if ((loading && !data) || !profiles) {
    return <Loader />;
  }

  return (
    <MessageRoomPresenter
      data={data}
      profile={profiles.getMyProfile}
      message={message}
      messages={messages}
      bodyEl={bodyEl}
      onChangeMessage={handleChangeMessage}
      onSubmit={handleSubmit}
    />
  );
};
