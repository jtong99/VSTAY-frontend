import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import useFetch from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';
import DialogDecision from './RejectDialog';

function PreviewDecision({ postID, status, poster }) {
  const { t } = useTranslation(['topnav']);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  return (
    <>
      <div
        className="text-center p-5 sticky-top"
        style={{
          boxShadow: '0 4px 4px 0 rgba(47,58,74,.2)',
          backgroundColor: '#ffffff',
        }}
      >
        <h4>{t('Check this post')}</h4>

        <Button
          disabled={status === 'approved'}
          variant="true-green"
          onClick={() => setShowApprove(!showApprove)}
          style={{ fontWeight: 600, width: '110px', height: 46, marginTop: 20 }}
        >
          {t('Approve')}
        </Button>
        <Button
          disabled={status === 'rejected'}
          variant="danger"
          onClick={() => setShowReject(!showReject)}
          style={{
            fontWeight: 600,
            width: '110px',
            height: 46,
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          {t('Reject')}
        </Button>
      </div>
      {showApprove && (
        <DialogDecision
          id={postID}
          status={status}
          open={showApprove}
          onClose={() => setShowApprove(!showApprove)}
          decision="approved"
          posterID={poster}
        />
      )}
      {showReject && (
        <DialogDecision
          id={postID}
          status={status}
          open={showReject}
          onClose={() => setShowReject(!showReject)}
          decision="rejected"
          posterID={poster}
        />
      )}
    </>
  );
}

export default PreviewDecision;
