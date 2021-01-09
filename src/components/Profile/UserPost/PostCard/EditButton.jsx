import React, { useState, useContext } from 'react';
import useFighter from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';
import { OverlayTrigger, Tooltip, Button, Alert } from 'react-bootstrap';
import { Bookmark, Edit } from 'react-feather';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import PostUpdateDialog from './PostUpdateDialog';

function EditButton({ onSuccessChange, data }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { getToken, isAuth } = useContext(AuthContext);
  const { t } = useTranslation(['common']);
  // const [showSuccess, setShowSuccess] = useState(false);
  // const [save] = useFighter(`/v1/api/user-video-list/saved`, { token: getToken() });

  // const [unsave] = useFighter(`/v1/api/user-video-list/saved/${videoId}`, {
  //   token: getToken(),
  //   method: 'DELETE',
  // });
  // const onSuccess = () => {
  //   setShowSuccess(true);
  //   setTimeout(() => {
  //     setShowSuccess(false);
  //   }, 1500);
  // };
  const handleClick = async () => {
    if (!isAuth) {
      router.push(`/login?ref=${encodeURIComponent(router.asPath)}`);
      return null;
    }
    setShow(!show);

    return null;
    // if (saved) {
    //   const { error } = await unsave();
    //   if (!error) {
    //     setSaved(false);
    //   }
    // }
    // if (!saved) {
    //   const { error } = await save({ videoID: videoId });
    //   if (!error) {
    //     setSaved(true);
    //   }
    // }
  };

  return (
    <>
      <Button
        size="sm"
        variant="link"
        style={{
          marginRight: 3,
        }}
        className="bg-white text-primary"
        onClick={() => setShow(!show)}
        // onClick={handleClick}
        // ${
        //   saved ? 'bg-primary text-white' : 'bg-white text-primary'
        // }
        id="save-btn"
      >
        <Edit />
      </Button>
      {show && (
        <PostUpdateDialog
          open={show}
          onClose={() => setShow(false)}
          onCompleted={onSuccessChange}
          post={data}
        />
      )}
    </>
  );
}

export default EditButton;
