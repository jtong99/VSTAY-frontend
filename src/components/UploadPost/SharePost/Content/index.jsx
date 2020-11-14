import React from 'react';
import Intro from './Intro';
import SelectTypeAccommodation from './SelectTypeAccommodation';
import AboutPlace from './AboutPlace';
import AboutRoom from './AboutRoom';
import RoomFeatures from './RoomFeatures';
import RentAndBills from './RentAndBills';
import RoomAvailability from './RoomAvailability';
import IdealCustomer from './IdealCustomer';
import CustomerPreference from './CustomerPreference';
import DescriptionTutorial from './DescriptionTutorial';
import DescriptionInput from './DescriptionInput';
import ImagePost from './ImagesPost';
import Preview from './Preview';
import SuccessUpload from './Success';

function Content({ currentStep, upStep, downStep, onFinishStep, currentPostData }) {
  return (
    <div className="mb-5">
      {currentStep === 0 && <Intro upStep={upStep} />}
      {currentStep === 1 && (
        <SelectTypeAccommodation
          onFinishSelectType={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 2 && (
        <AboutPlace
          onFinishAbout={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 3 && (
        <AboutRoom
          onFinishRoom={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 4 && (
        <RoomFeatures
          onFinishFeatures={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 5 && (
        <RentAndBills
          onFinishRent={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 6 && (
        <RoomAvailability
          onFinishRoomAvailability={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 7 && (
        <ImagePost
          onFinishImage={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 8 && <IdealCustomer upStep={upStep} downStep={downStep} />}
      {currentStep === 9 && (
        <CustomerPreference
          onFinishPreference={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 10 && (
        <DescriptionTutorial
          onFinishDescription={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 11 && (
        <DescriptionInput
          onFinishInput={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 12 && (
        <Preview
          onFinishInput={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 13 && (
        <SuccessUpload
          onFinishInput={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
    </div>
  );
}

export default Content;
