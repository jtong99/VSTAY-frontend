import React from 'react';
import Intro from './Intro';
import SelectTypeAccommodation from './SelectTypeAccommodation';
import DefineArea from './DefineArea';
import RentAndTiming from './RentAndTiming';
import PropertyPreference from './PropertyPreference';
import IntroduceYourself from './IntroduceYourself';

function NeedPostContent({
  currentStep,
  upStep,
  downStep,
  onFinishStep,
  currentPostData,
}) {
  return (
    <div className="mb-5">
      {currentStep === 110 && <Intro upStep={upStep} />}
      {currentStep === 1 && (
        <SelectTypeAccommodation
          onFinishSelectType={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 2 && (
        <DefineArea
          onFinishSelectType={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 3 && (
        <RentAndTiming
          onFinishSelectType={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 4 && (
        <PropertyPreference
          onFinishSelectType={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 0 && (
        <IntroduceYourself
          onFinishSelectType={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
    </div>
  );
}

export default NeedPostContent;
