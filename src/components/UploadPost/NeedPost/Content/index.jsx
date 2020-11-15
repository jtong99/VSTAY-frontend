import React from 'react';
import Intro from './Intro';
import SelectTypeAccommodation from './SelectTypeAccommodation';
import DefineArea from './DefineArea';
import RentAndTiming from './RentAndTiming';
import PropertyPreference from './PropertyPreference';
import IntroduceYourself from './IntroduceYourself';
import IntroduceInput from './IntroduceInput';
import Employment from './Employment';
import LifeStyle from './LifeStyle';
import DescriptionInput from './Description';
import FirstPreview from './FirstPreview';
import Preview from './Preview';

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
          onFinishMap={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 3 && (
        <RentAndTiming
          onFinishRent={onFinishStep}
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
      {currentStep === 5 && (
        <IntroduceYourself
          onFinishSelectType={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 6 && (
        <IntroduceInput
          onFinishInput={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 7 && (
        <Employment
          onFinishEmploy={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 8 && (
        <LifeStyle
          onFinishEmploy={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 9 && (
        <DescriptionInput
          onFinishInput={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 10 && (
        <FirstPreview
          onFinishInput={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
      {currentStep === 0 && (
        <Preview
          onFinishInput={onFinishStep}
          currentData={currentPostData}
          upStep={upStep}
          downStep={downStep}
        />
      )}
    </div>
  );
}

export default NeedPostContent;
