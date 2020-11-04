import React from 'react';
import Intro from './Intro';
import SelectTypeAccommodation from './SelectTypeAccommodation';
import AboutPlace from './AboutPlace';

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
      {currentStep === 2 && <AboutPlace />}
    </div>
  );
}

export default Content;
