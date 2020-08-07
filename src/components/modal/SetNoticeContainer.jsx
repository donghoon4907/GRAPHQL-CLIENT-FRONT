import React, { useCallback } from "react";
import { useQuery, useApolloClient } from "react-apollo-hooks";
import { IS_SHOW_NOTICE } from "../../query/modal";
import SetNoticePresenter from "./SetNoticePresenter";

export default () => {
  const client = useApolloClient();

  const {
    data: { isShowNoticeModal }
  } = useQuery(IS_SHOW_NOTICE);

  const handleClose = useCallback(() => {
    client.writeData({
      data: {
        isShowNoticeModal: false
      }
    });
  }, []);

  return (
    <SetNoticePresenter isShow={isShowNoticeModal} onClose={handleClose} />
  );
};
