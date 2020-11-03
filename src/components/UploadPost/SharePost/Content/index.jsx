import React from 'react';
import Intro from './Intro';
import SelectTypeAccommodation from './SelectTypeAccommodation';

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
    </div>
  );
}

export default Content;
