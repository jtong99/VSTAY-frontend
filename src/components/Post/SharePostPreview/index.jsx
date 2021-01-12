import React, { useContext, useCallback, useEffect } from 'react';
import { Button, Image, Container, Row, Col } from 'react-bootstrap';
import CarouselImage from '@components/utils/CarouselImages';
import Info from './Info';
import About from './About';
import RoomOverview from './RoomOverview';
import Features from './Features';
import useCurrentUserData from '@hooks/api/useCurrentUserData';
import Contact from './Contact';
import MapPreview from './MapPreview';
import ReactionButton from '../Reaction';
import { useTranslation } from 'i18n';
import useFetch from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';
import PreviewDecision from './PreviewDecision';

function PostComponent({
  data: {
    images,
    description,
    detail,
    price,
    title,
    type,
    features,
    address,
    poster,
    statistics,
    yourReaction,
    status,
    _id,
  },
  onShowChat,
}) {
  const { t } = useTranslation(['post']);
  const { data: userData } = useCurrentUserData();
  const { user } = userData || {};
  const { getToken } = useContext(AuthContext);

  //   const images = [
  //     'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
  //     'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
  //     'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
  //     'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
  //   ];
  const [pushView] = useFetch(`/v1/api/view/${_id}?type=share`, {
    token: getToken(),
    method: 'POST',
  });
  const addressValue = {
    longitude: address.geocode.longitude,
    latitude: address.geocode.latitude,
    name: address.name,
  };
  const onLeaving = useCallback(
    ({ currentTime }) => {
      if (currentTime > 30) {
        pushView({ watchingTime: currentTime });
      }
    },
    [_id, pushView],
  );

  useEffect(() => {
    const enterTime = Date.now();
    const handleLeaving = () => {
      const duration = Math.round((Date.now() - enterTime) / 1000);
      if (onLeaving) {
        onLeaving({
          currentTime: duration,
        });
      }
    };
    window.addEventListener('beforeunload', handleLeaving);
    return () => {
      handleLeaving();
      window.removeEventListener('beforeunload', handleLeaving);
    };
  }, [onLeaving]);
  return (
    <div>
      <PreviewDecision postID={_id} status={status} poster={poster} />
      <Container className="mb-5">
        <Row>
          <Col lg={6}>
            <div>
              {images && images.length > 0 ? (
                <CarouselImage images={images} />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: 300,
                    border: '1px solid #9c9c9c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                  }}
                >
                  {t("User don't choose images for this property")}
                </div>
              )}

              <About about={description} />
              <hr className="my-4" />
              <RoomOverview overview={detail} price={price} />
              <hr className="my-4" />
              <Features features={features} />
            </div>
          </Col>
          <Col lg={6}>
            <Info
              title={title}
              postType={type}
              detail={detail}
              price={price}
              address={address.name}
            />
            {statistics && (
              <ReactionButton
                postId={_id}
                statistics={statistics}
                currReaction={yourReaction}
              />
            )}
            <Contact id={poster ?? ''} onShowChat={onShowChat} />
          </Col>
        </Row>
      </Container>
      <MapPreview address={addressValue} />
    </div>
  );
}

export default PostComponent;
