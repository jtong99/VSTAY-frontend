import React, { useState, useRef, useContext, createRef } from 'react';
import { Button, Image, Container, Form, FormControl } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import dataURIToBlob from '@helper/base64ToBlob';
import ButtonDirect from '../ButtonDirect';
import RoomAndFeatures from './img/RoomAndFeatures.svg';
import useFetch from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';
import { Camera } from 'react-feather';
import CarouselImage from './util/CarouselImage';
import LoadingComponent from '@components/utils/Loading';

const path = '/v1/api/post/upload-images';
function ImagesPost({ currentData, upStep, downStep, onFinishImage }) {
  const { t } = useTranslation(['topnav']);
  const image = useRef(null);
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const { getToken } = useContext(AuthContext);
  const [fire, { loading }] = useFetch(path, {
    token: getToken(),
    method: 'POST',
    isJSON: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    console.log('ok');
    console.log(e.target.files);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    let fileArr = [...imageFile];
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
    }
    setImageFile(fileArr);
    const reader = new FileReader();
    reader.onload = () => {
      setImages([...images, reader.result]);
    };
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let blobArr = [];
    for (let i = 0; i < imageFile.length; i++) {
      formData.append('images', imageFile[i]);
      blobArr.push(dataURIToBlob(images[i]));
    }
    // formData.append(`image`, blobArr);
    // const formData = new FormData();
    // const blobArr = [];
    // for (let i = 0; i < images.length; i++) {
    //   const blobed = dataURIToBlob(images[i]);
    //   formData.append('images' + i, imageFile[i].file, imageFile[i].file.name);
    //   blobArr.push(blobed);
    // }
    const { data: res, error: err } = await fire(formData);
  };

  const onAddImg = () => {
    image.current.click();
  };
  const onFinish = async () => {
    const formData = new FormData();
    let blobArr = [];
    for (let i = 0; i < imageFile.length; i++) {
      formData.append('images', imageFile[i]);
      blobArr.push(dataURIToBlob(images[i]));
    }
    const { data: res, error: err } = await fire(formData);
    if (res && res.code === 201) {
      const { inserted } = res;
      onFinishImage({ ...currentData, images: inserted });
      upStep();
    }
  };
  return (
    <>
      <LoadingComponent show={loading} />
      <Container className="pt-5">
        <div className="p-3">
          <h4 className="text-secondary">{t('Introduce your place')}</h4>
          <h3 style={{ fontWeight: 600 }}>{t('Room and feature images')}</h3>
        </div>
        <div className="text-center">
          {images.length > 0 ? (
            <div style={{ width: '55%', margin: '0 auto', position: 'relative' }}>
              <CarouselImage
                images={images.reverse()}
                onRemove={(index) => {
                  image.current.value = '';
                  // image.current.files = [
                  //   ...imageFile.slice(0, index),
                  //   ...imageFile.slice(index + 1, imageFile.length),
                  // ];
                  setImageFile([
                    ...imageFile.slice(0, index),
                    ...imageFile.slice(index + 1, imageFile.length),
                  ]);
                  setImages([
                    ...images.slice(0, index),
                    ...images.slice(index + 1, images.length),
                  ]);
                }}
              />
            </div>
          ) : (
            <Image src={RoomAndFeatures} style={{ width: '30%' }} className="m-5" />
          )}

          <p
            className="text-center"
            style={{ width: '41%', margin: '-10px auto 40px auto' }}
          >
            {t(
              'Listings with images appear higher in search results than those without. You can also add or change images later.',
            )}
          </p>
          <div>
            <Button
              variant="true-green"
              onClick={onAddImg}
              // disabled={disableValue}
              style={{ fontWeight: 600, width: '150px', height: 46 }}
            >
              {t('Add photos')}{' '}
              <Camera width="20px" style={{ marginBottom: 1, marginLeft: 2 }} />
            </Button>
          </div>
        </div>

        <Form
          onSubmit={onSubmit}
          style={{ width: '35%', margin: '0 auto', display: 'none' }}
          encType="multipart/form-data"
        >
          <Form.File
            ref={image}
            onChange={handleChange}
            id="custom-file"
            label="Custom file input"
            accept="image/*"
            custom
          />
          <Button type="submit">submit</Button>
        </Form>
        <ButtonDirect
          currentStep={11}
          downStep={downStep}
          onFinishStep={onFinish}
          disableValue={false}
        />
        {/* <div className="preview">
        {images.map((url) => (
          <Image src={url} alt="..." width="100px" />
        ))}
      </div> */}
      </Container>
    </>
  );
}

export default ImagesPost;
