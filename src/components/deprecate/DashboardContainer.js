import React, { useCallback, useState, useEffect } from "react";
import DashboardPresention from "./DashboardPresention";

const DashboardContainer = () => {
  const [activeMenu, setActiveMenu] = useState(1);

  // 메뉴 클릭
  const onClickMenuIcon = useCallback((menuNum) => {
    setActiveMenu(menuNum);
  }, []);

  // 로그아웃
  const onLogout = useCallback(() => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      // insert query
    }
  }, []);

  // 알림 클릭
  const onClickAlertItem = useCallback((userId, logId) => {
    // insert query
  }, []);

  useEffect(() => {
    // insert query
  }, []);

  return (
    <DashboardPresention
      userInfo={userInfo}
      loadedWeekPostCount={loadedWeekPostCount}
      loadedWeekFollowCount={loadedWeekFollowCount}
      activeMenu={activeMenu}
      isShowAddPgmUi={isShowAddPgmUi}
      isShowUpdatePgmUi={isShowUpdatePgmUi}
      isShowAddContentUi={isShowAddContentUi}
      isShowUpdateContentUi={isShowUpdateContentUi}
      isShowAddPostUi={isShowAddPostUi}
      isShowUpdatePostUi={isShowUpdatePostUi}
      isShowSearchPgmUi={isShowSearchPgmUi}
      isShowSearchCastUi={isShowSearchCastUi}
      isShowPostCommentUi={isShowPostCommentUi}
      isShowYoutubeUploadUi={isShowYoutubeUploadUi}
      onClickMenuIcon={onClickMenuIcon}
      onClickAlertItem={onClickAlertItem}
      onLogout={onLogout}
    />
  );
};

export default DashboardContainer;
