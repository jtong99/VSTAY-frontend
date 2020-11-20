import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import PostPreview from '@components/Post/SharePost';
import useFetch from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';

const path = '/v1/api/post';
function Preview({ onFinishAbout, downStep, currentData, upStep }) {
  const { t } = useTranslation(['topnav']);
  const { getToken } = useContext(AuthContext);
  const [fire, { loading }] = useFetch(path, {
    token: getToken(),
    method: 'POST',
  });
  const onFinish = async () => {
    delete currentData.featuresDisplay;
    const { data, error } = await fire(currentData);
    if (data && data.code === 201) {
      upStep();
    }
  };
  return (
    <>
      <div
        className="text-center p-5 sticky-top"
        style={{
          boxShadow: '0 4px 4px 0 rgba(47,58,74,.2)',
          backgroundColor: '#ffffff',
        }}
      >
        <h4>{t('Preview your post')}</h4>
        <Button
          variant="true-green"
          onClick={onFinish}
          style={{ fontWeight: 600, width: '110px', height: 46, marginTop: 20 }}
        >
          {t('Finish')}
        </Button>
      </div>
      {/* <button onClick={() => console.log(currentData)}>lcik</button> */}
      <Container className="pt-5">
        <PostPreview data={currentData} />
      </Container>
    </>
  );
}

export default Preview;
