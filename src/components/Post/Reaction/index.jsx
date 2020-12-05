import React, { useContext, useState, useRef, useEffect } from 'react';
import { OverlayTrigger, Button, ButtonGroup, Tooltip } from 'react-bootstrap';
import { ThumbsUp, ThumbsDown, Eye } from 'react-feather';
import { mutate } from 'swr';
import AuthContext from '@components/Auth/AuthContext';
import useFetch from '@hooks/useFetch';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import { formatNumber } from 'helper/format';

function ReactionComponent({ postId, statistics, currReaction }) {
  const { getToken, isAuth } = useContext(AuthContext);
  const router = useRouter();
  const { t } = useTranslation(['pop-video', 'common']);
  const [myReaction, setMyReaction] = useState(currReaction);
  const [reactionCount, setReactionCount] = useState({
    like: statistics.likeCount ?? 0,
    dislike: statistics.dislikeCount ?? 0,
  });

  useEffect(() => {
    setReactionCount({
      like: statistics.likeCount ?? 0,
      dislike: statistics.dislikeCount ?? 0,
    });
  }, [statistics.dislikeCount, statistics.likeCount]);

  useEffect(() => {
    setMyReaction(currReaction);
  }, [currReaction]);

  const [
    newLike,
    { loading: liking },
  ] = useFetch(`/v1/api/post/${postId}/reaction/like`, { token: getToken() });
  const [newDislike, { loading: disliking }] = useFetch(
    `/v1/api/post/${postId}/reaction/dislike`,
    {
      token: getToken(),
    },
  );
  const [removeReaction, { loading: removing }] = useFetch(
    `/v1/api/post/${postId}/reaction`,
    {
      token: getToken(),
      method: 'DELETE',
    },
  );

  const handleChangeReaction = (reaction) => async (e) => {
    e.preventDefault();
    if (!isAuth) {
      router.push(`/sign-in?ref=${encodeURIComponent(router.asPath)}`);
    }
    if (myReaction === reaction) {
      const { error } = await removeReaction();
      if (error) {
        return console.error(error.message);
      }
      setMyReaction(null);
      setReactionCount((preVal) => ({
        ...preVal,
        [reaction]: preVal[reaction] - 1,
      }));
    } else {
      if (reaction === 'like') {
        const { error, data } = await newLike();
        if (error) {
          return console.error(`Error: ${error.message}`);
        }
        if (data && data.result) {
          setReactionCount({
            like: data.result.likeCount ?? 0,
            dislike: data.result.dislikeCount ?? 0,
          });
        }
      }
      if (reaction === 'dislike') {
        const { error, data } = await newDislike();
        if (error) {
          return console.error(`Error: ${error.message}`);
        }
        if (data && data.result) {
          setReactionCount({
            like: data.result.likeCount ?? 0,
            dislike: data.result.dislikeCount ?? 0,
          });
        }
      }
      setMyReaction(reaction);
    }
    return 0;
  };
  return (
    <ButtonGroup>
      {/* <button onClick={() => console.log(statistics)}>click</button> */}
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            {(liking || removing) && t('loading')}
            {!(liking || removing) &&
              (myReaction === 'like' ? t('liked') : t('like'))}
          </Tooltip>
        }
      >
        <Button
          onClick={handleChangeReaction('like')}
          disabled={liking || disliking || removing}
          id="like-btn"
          variant="link"
          className={`interaction pl-0 ${
            myReaction === 'like' ? 'text-primary' : 'text-secondary'
          }`}
        >
          <ThumbsUp height={18} style={{ marginRight: '6px' }} />
          <span>{formatNumber(reactionCount.like)}</span>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            {(disliking || removing) && t('loading')}
            {!(disliking || removing) &&
              (myReaction === 'dislike' ? t('disliked') : t('dislike'))}
          </Tooltip>
        }
        rootClose
      >
        <Button
          onClick={handleChangeReaction('dislike')}
          variant="link"
          className={`interaction ${
            myReaction === 'dislike' ? 'text-primary' : 'text-secondary'
          }`}
          disabled={liking || disliking || removing}
          id="dislike-btn"
        >
          <ThumbsDown height={18} style={{ marginRight: '6px' }} />
          <span>{formatNumber(reactionCount.dislike)}</span>
        </Button>
      </OverlayTrigger>
      <span className="p-2 text-secondary">
        <Eye height={18} style={{ marginRight: '6px' }} />
        <span>{formatNumber(statistics.viewCount)}</span>
      </span>
      {/* <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{t('share-this-video')}</Tooltip>}
      >
        <Button
          ref={shareButton}
          onClick={handleClickShare}
          id="share-btn"
          variant="link"
          className="interaction text-secondary"
        >
          <Share2 height={18} style={{ marginRight: '6px' }} />
          <span>{t('share')}</span>
        </Button>
      </OverlayTrigger>
      <SaveButton
        videoId={videoId}
        initialValue={vSaved}
        variant="text"
        onSuccessSave={onSuccessSave}
      />
  
      <VideoSharingDialog
        videoId={videoId}
        show={showShare}
        onHide={() => setShowShare(false)}
      /> */}
    </ButtonGroup>
  );
}

export default ReactionComponent;
