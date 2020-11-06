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

function Content({ currentStep, upStep, downStep, onFinishStep, currentPostData }) {
  return (
    <div>
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
      {currentStep === 7 && <IdealCustomer upStep={upStep} downStep={downStep} />}
      {currentStep === 8 && (
        <CustomerPreference
          onFinishPreference={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 9 && (
        <DescriptionTutorial
          onFinishDescription={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 10 && (
        <DescriptionInput
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
