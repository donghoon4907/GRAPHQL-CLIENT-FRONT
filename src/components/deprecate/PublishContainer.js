import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PublishPresentaion from "./PublishPresentaion";
import {
  SHOW_ADDPROGRAMMODAL,
  SHOW_ADDCONTENTMODAL,
  SHOW_ADDPOSTMODAL
} from "../reducers/common";
import {
  GET_PROGRAMLIST_REQUEST,
  GET_AGEGRADELIST_REQUEST
} from "../reducers/program";
import { GET_GENRELIST_REQUEST } from "../reducers/genre";
import { GET_CHANNELLIST_REQUEST } from "../reducers/channel";
import { GET_CONTENTLIST_REQUEST } from "../reducers/content";
import { GET_POSTLIST_REQUEST } from "../reducers/post";
import { makeSortList } from "../module/query";

const PublishContainer = () => {
  const dispatch = useDispatch();

  const {
    loadedProgram,
    isGetListLoading: isLoadingPgm,
    isSuccessAddItem: isSuccessAddPgm
  } = useSelector(state => state.program);
  const {
    loadedContent,
    isGetListLoading: isLoadingContent,
    isSuccessAddItem: isSuccessAddContent
  } = useSelector(state => state.content);
  const {
    loadedPost,
    isGetListLoading: isLoadingPost,
    isSuccessAddItem: isSuccessAddPost
  } = useSelector(state => state.post);
  const { loadedChannel } = useSelector(state => state.channel);

  const [activeMenu, setActiveMenu] = useState(1); // 현재 선택된 메뉴
  const [pgmStartDate, setPgmStartDate] = useState(
    moment()
      .subtract(7, "d")
      .toDate()
  ); // 프로그램 시작일
  const [contentStartDate, setContentStartDate] = useState(
    moment()
      .subtract(7, "d")
      .toDate()
  ); // 컨텐츠 시작일
  const [postStartDate, setPostStartDate] = useState(
    moment()
      .subtract(7, "d")
      .toDate()
  ); // 포스트 시작일
  const [pgmEndDate, setPgmEndDate] = useState(new Date()); // 프로그램 마감일
  const [contentEndDate, setContentEndDate] = useState(new Date()); // 컨텐츠 마감일
  const [postEndDate, setPostEndDate] = useState(new Date()); // 포스트 마감일
  const [pgmSearchKeyword, setPgmSearchKeyword] = useState(""); // 프로그램 검색어
  const [contentSearchKeyword, setContentSearchKeyword] = useState(""); // 콘텐츠 검색어
  const [postSearchKeyword, setPostSearchKeyword] = useState(""); // 포스트 검색어
  const [pgmSort, setPgmSort] = useState("createdAt,DESC"); // 프로그램 정렬
  const [contentSort, setContentSort] = useState("createdAt,DESC"); // 콘텐츠 정렬
  const [postSort, setPostSort] = useState("createdAt,DESC"); // 포스트 정렬
  const [pgmChannel, setPgmChannel] = useState(""); // 프로그램 채널
  const [sortList, setSortList] = useState(
    makeSortList([
      { text: "등록일", isAsc: true },
      { text: "수정일", isAsc: true }
    ])
  ); // 정렬 설정

  const onChangePgmSearchKeyword = useCallback(e => {
    setPgmSearchKeyword(e.target.value);
  }, []);

  const onChangeContentSearchKeyword = useCallback(e => {
    setContentSearchKeyword(e.target.value);
  }, []);

  const onChangePostSearchKeyword = useCallback(e => {
    setPostSearchKeyword(e.target.value);
  }, []);

  const onChangePgmSort = useCallback(
    e => {
      if (isLoadingPgm) return;
      setPgmSort(e.target.value);
      dispatch({
        type: GET_PROGRAMLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          searchKeyword: pgmSearchKeyword,
          startDate: moment(pgmStartDate).format("YYYY-MM-DD"),
          endDate: moment(pgmEndDate).format("YYYY-MM-DD"),
          sort: e.target.value,
          channel: pgmChannel
        }
      });
    },
    [
      isLoadingPgm,
      pgmSearchKeyword,
      pgmStartDate,
      pgmEndDate,
      pgmChannel,
      dispatch
    ]
  );

  const onChangeContentSort = useCallback(
    e => {
      if (isLoadingContent) return;
      setContentSort(e.target.value);
      dispatch({
        type: GET_CONTENTLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          searchKeyword: contentSearchKeyword,
          startDate: moment(contentStartDate).format("YYYY-MM-DD"),
          endDate: moment(contentEndDate).format("YYYY-MM-DD"),
          sort: e.target.value
        }
      });
    },
    [
      isLoadingContent,
      contentSearchKeyword,
      contentStartDate,
      contentEndDate,
      dispatch
    ]
  );

  const onChangePostSort = useCallback(
    e => {
      if (isLoadingPost) return;
      setPostSort(e.target.value);
      dispatch({
        type: GET_POSTLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          searchKeyword: postSearchKeyword,
          startDate: moment(postStartDate).format("YYYY-MM-DD"),
          endDate: moment(postEndDate).format("YYYY-MM-DD"),
          sort: e.target.value
        }
      });
    },
    [isLoadingPost, postSearchKeyword, postStartDate, postEndDate, dispatch]
  );

  const onChangePgmChannel = useCallback(
    e => {
      if (isLoadingPgm) return;
      setPgmChannel(e.target.value);
      dispatch({
        type: GET_PROGRAMLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          searchKeyword: pgmSearchKeyword,
          startDate: moment(pgmStartDate).format("YYYY-MM-DD"),
          endDate: moment(pgmEndDate).format("YYYY-MM-DD"),
          sort: pgmSort,
          channel: e.target.value
        }
      });
    },
    [
      isLoadingPgm,
      pgmSearchKeyword,
      pgmStartDate,
      pgmEndDate,
      pgmSort,
      dispatch
    ]
  );

  // 부메뉴 클릭 (현재: 프로그램, 포스트)
  const onClickSubMenuItem = useCallback(menuNum => {
    setActiveMenu(menuNum);
  }, []);

  // 프로그램 등록 버튼 클릭
  const onClickAddProgramBtn = useCallback(() => {
    dispatch({
      type: SHOW_ADDPROGRAMMODAL
    });
  }, [dispatch]);

  // 컨텐츠 등록 버튼 클릭
  const onClickAddContentBtn = useCallback(() => {
    dispatch({
      type: SHOW_ADDCONTENTMODAL
    });
  }, [dispatch]);

  // 포스트 등록 버튼 클릭
  const onClickAddPostBtn = useCallback(() => {
    dispatch({
      type: SHOW_ADDPOSTMODAL
    });
  }, [dispatch]);

  // 프로그램 엔터 검색
  const onKeyDownPgmSearchKeyword = useCallback(
    e => {
      if (isLoadingPgm) return;
      if (e.key === "Enter") {
        dispatch({
          type: GET_PROGRAMLIST_REQUEST,
          payload: {
            lastId: 0,
            limit: 20,
            searchKeyword: e.target.value,
            startDate: moment(pgmStartDate).format("YYYY-MM-DD"),
            endDate: moment(pgmEndDate).format("YYYY-MM-DD")
          }
        });
        setPgmSort("createdAt,DESC");
        setPgmChannel("");
      }
    },
    [isLoadingPgm, pgmStartDate, pgmEndDate, dispatch]
  );
  // 프로그램 클릭 검색
  const onClickPgmSearchBtn = useCallback(() => {
    if (isLoadingPgm) return;
    dispatch({
      type: GET_PROGRAMLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        searchKeyword: pgmSearchKeyword,
        startDate: moment(pgmStartDate).format("YYYY-MM-DD"),
        endDate: moment(pgmEndDate).format("YYYY-MM-DD")
      }
    });
    setPgmSort("createdAt,DESC");
    setPgmChannel("");
  }, [isLoadingPgm, pgmSearchKeyword, pgmStartDate, pgmEndDate, dispatch]);

  // 컨텐츠 엔터 검색
  const onKeyDownContentSearchKeyword = useCallback(
    e => {
      if (isLoadingContent) return;
      if (e.key === "Enter") {
        dispatch({
          type: GET_CONTENTLIST_REQUEST,
          payload: {
            lastId: 0,
            limit: 20,
            searchKeyword: e.target.value,
            startDate: moment(contentStartDate).format("YYYY-MM-DD"),
            endDate: moment(contentEndDate).format("YYYY-MM-DD")
          }
        });
        setContentSort("createdAt,DESC");
      }
    },
    [isLoadingContent, contentStartDate, contentEndDate, dispatch]
  );
  // 컨텐츠 클릭 검색
  const onClickContentSearchBtn = useCallback(() => {
    if (isLoadingContent) return;
    dispatch({
      type: GET_CONTENTLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        searchKeyword: contentSearchKeyword,
        startDate: moment(contentStartDate).format("YYYY-MM-DD"),
        endDate: moment(contentEndDate).format("YYYY-MM-DD")
      }
    });
    setContentSort("createdAt,DESC");
  }, [
    isLoadingContent,
    contentSearchKeyword,
    contentStartDate,
    contentEndDate,
    dispatch
  ]);

  // 포스트 엔터 검색
  const onKeyDownPostSearchKeyword = useCallback(
    e => {
      if (isLoadingPost) return;
      if (e.key === "Enter") {
        dispatch({
          type: GET_POSTLIST_REQUEST,
          payload: {
            lastId: 0,
            limit: 20,
            searchKeyword: e.target.value,
            startDate: moment(postStartDate).format("YYYY-MM-DD"),
            endDate: moment(postEndDate).format("YYYY-MM-DD")
          }
        });
        setPostSort("createdAt,DESC");
      }
    },
    [isLoadingPost, postStartDate, postEndDate, dispatch]
  );
  // 포스트 클릭 검색
  const onClickPostSearchBtn = useCallback(() => {
    if (isLoadingPost) return;
    dispatch({
      type: GET_POSTLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        searchKeyword: postSearchKeyword,
        startDate: moment(postStartDate).format("YYYY-MM-DD"),
        endDate: moment(postEndDate).format("YYYY-MM-DD")
      }
    });
    setPostSort("createdAt,DESC");
  }, [isLoadingPost, postSearchKeyword, postStartDate, postEndDate, dispatch]);

  // 프로그램 스크롤 더보기
  const onScrollInPgmList = useCallback(
    e => {
      const { scrollHeight, clientHeight, scrollTop } = e.target;
      if (loadedProgram) {
        if (scrollHeight - scrollTop === clientHeight) {
          const { id: lastId } = loadedProgram[loadedProgram.length - 1];
          if (loadedProgram.length % 20 === 0) {
            dispatch({
              type: GET_PROGRAMLIST_REQUEST,
              payload: {
                lastId,
                limit: 20,
                searchKeyword: pgmSearchKeyword,
                startDate: moment(pgmStartDate).format("YYYY-MM-DD"),
                endDate: moment(pgmEndDate).format("YYYY-MM-DD"),
                sort: pgmSort,
                channel: pgmChannel
              }
            });
          }
        }
      }
    },
    [
      loadedProgram,
      pgmSearchKeyword,
      pgmStartDate,
      pgmEndDate,
      pgmSort,
      pgmChannel,
      dispatch
    ]
  );

  // 컨텐츠 스크롤 더보기
  const onScrollInContentList = useCallback(
    e => {
      const { scrollHeight, clientHeight, scrollTop } = e.target;
      if (loadedContent) {
        if (scrollHeight - scrollTop === clientHeight) {
          const { id: lastId } = loadedContent[loadedContent.length - 1];
          if (loadedContent.length % 20 === 0) {
            dispatch({
              type: GET_CONTENTLIST_REQUEST,
              payload: {
                lastId,
                limit: 20,
                searchKeyword: contentSearchKeyword,
                startDate: moment(contentStartDate).format("YYYY-MM-DD"),
                endDate: moment(contentEndDate).format("YYYY-MM-DD"),
                sort: contentSort
              }
            });
          }
        }
      }
    },
    [
      loadedContent,
      contentSearchKeyword,
      contentStartDate,
      contentEndDate,
      contentSort,
      dispatch
    ]
  );

  // 포스트 스크롤 더보기
  const onScrollInPostList = useCallback(
    e => {
      const { scrollHeight, clientHeight, scrollTop } = e.target;
      if (loadedPost) {
        if (scrollHeight - scrollTop === clientHeight) {
          const { id: lastId } = loadedPost[loadedPost.length - 1];
          if (loadedPost.length % 20 === 0) {
            dispatch({
              type: GET_POSTLIST_REQUEST,
              payload: {
                lastId,
                limit: 20,
                searchKeyword: postSearchKeyword,
                startDate: moment(postStartDate).format("YYYY-MM-DD"),
                endDate: moment(postEndDate).format("YYYY-MM-DD"),
                sort: postSort
              }
            });
          }
        }
      }
    },
    [
      loadedPost,
      postSearchKeyword,
      postStartDate,
      postEndDate,
      postSort,
      dispatch
    ]
  );
  // 프로그램 등록 후 목록 업데이트
  useEffect(() => {
    if (isSuccessAddPgm) {
      setPgmStartDate(
        moment()
          .subtract(7, "d")
          .toDate()
      );
      setPgmEndDate(new Date());
      setPgmSearchKeyword("");
      setPgmSort("createdAt,desc");
      setPgmChannel("");
      dispatch({
        type: GET_PROGRAMLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          startDate: moment()
            .subtract(7, "d")
            .format("YYYY-MM-DD"),
          endDate: moment().format("YYYY-MM-DD")
        }
      });
    }
  }, [isSuccessAddPgm, dispatch]);

  // 컨텐츠 등록 후 목록 업데이트
  useEffect(() => {
    if (isSuccessAddContent) {
      setContentStartDate(
        moment()
          .subtract(7, "d")
          .toDate()
      );
      setContentEndDate(new Date());
      setContentSearchKeyword("");
      setContentSort("createdAt,desc");
      dispatch({
        type: GET_CONTENTLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          startDate: moment()
            .subtract(7, "d")
            .format("YYYY-MM-DD"),
          endDate: moment().format("YYYY-MM-DD")
        }
      });
    }
  }, [isSuccessAddContent, dispatch]);

  // 포스트 등록 후 목록 업데이트
  useEffect(() => {
    if (isSuccessAddPost) {
      setPostStartDate(
        moment()
          .subtract(7, "d")
          .toDate()
      );
      setPostEndDate(new Date());
      setPostSearchKeyword("");
      setPostSort("createdAt,desc");
      dispatch({
        type: GET_POSTLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          startDate: moment()
            .subtract(7, "d")
            .format("YYYY-MM-DD"),
          endDate: moment().format("YYYY-MM-DD")
        }
      });
    }
  }, [isSuccessAddPost, dispatch]);

  useEffect(() => {
    // 프로그램 목록 로드
    dispatch({
      type: GET_PROGRAMLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        startDate: moment()
          .subtract(7, "d")
          .format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
      }
    });
    // 컨텐츠 목록 로드
    dispatch({
      type: GET_CONTENTLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        startDate: moment()
          .subtract(7, "d")
          .format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
      }
    });
    // 포스트 목록 로드
    dispatch({
      type: GET_POSTLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        startDate: moment()
          .subtract(7, "d")
          .format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
      }
    });
    // 장르 목록 로드
    dispatch({
      type: GET_GENRELIST_REQUEST
    });
    // 연령등급 목록 로드
    dispatch({
      type: GET_AGEGRADELIST_REQUEST
    });
    // 채널 목록 로드
    dispatch({
      type: GET_CHANNELLIST_REQUEST
    });
  }, [dispatch]);

  return (
    <PublishPresentaion
      sortList={sortList}
      isLoadingPgm={isLoadingPgm}
      isLoadingContent={isLoadingContent}
      isLoadingPost={isLoadingPost}
      loadedProgram={loadedProgram}
      loadedContent={loadedContent}
      loadedPost={loadedPost}
      loadedChannel={loadedChannel}
      activeMenu={activeMenu}
      pgmStartDate={pgmStartDate}
      contentStartDate={contentStartDate}
      postStartDate={postStartDate}
      pgmEndDate={pgmEndDate}
      contentEndDate={contentEndDate}
      postEndDate={postEndDate}
      setPgmStartDate={setPgmStartDate}
      setContentStartDate={setContentStartDate}
      setPostStartDate={setPostStartDate}
      setPgmEndDate={setPgmEndDate}
      setContentEndDate={setContentEndDate}
      setPostEndDate={setPostEndDate}
      pgmSearchKeyword={pgmSearchKeyword}
      contentSearchKeyword={contentSearchKeyword}
      postSearchKeyword={postSearchKeyword}
      pgmSort={pgmSort}
      contentSort={contentSort}
      postSort={postSort}
      pgmChannel={pgmChannel}
      onChangePgmSearchKeyword={onChangePgmSearchKeyword}
      onChangeContentSearchKeyword={onChangeContentSearchKeyword}
      onChangePostSearchKeyword={onChangePostSearchKeyword}
      onChangePgmSort={onChangePgmSort}
      onChangeContentSort={onChangeContentSort}
      onChangePostSort={onChangePostSort}
      onChangePgmChannel={onChangePgmChannel}
      onClickSubMenuItem={onClickSubMenuItem}
      onClickAddProgramBtn={onClickAddProgramBtn}
      onClickAddContentBtn={onClickAddContentBtn}
      onClickAddPostBtn={onClickAddPostBtn}
      onKeyDownPgmSearchKeyword={onKeyDownPgmSearchKeyword}
      onKeyDownContentSearchKeyword={onKeyDownContentSearchKeyword}
      onKeyDownPostSearchKeyword={onKeyDownPostSearchKeyword}
      onClickPgmSearchBtn={onClickPgmSearchBtn}
      onClickContentSearchBtn={onClickContentSearchBtn}
      onClickPostSearchBtn={onClickPostSearchBtn}
      onScrollInPgmList={onScrollInPgmList}
      onScrollInContentList={onScrollInContentList}
      onScrollInPostList={onScrollInPostList}
    />
  );
};
export default PublishContainer;
