import React, { useState } from 'react';

import TopBarPost from './TopBar';
import Content from './Content';
function SharePost() {
  const [currentStep, setCurrentStep] = useState(0);
  const [postData, setPostData] = useState('');

  const upStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const downStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const onFinish = (data) => {
    setPostData(data);
  };
  return (
    <div>
      <TopBarPost currentStep={currentStep} upStep={upStep} downStep={downStep} />
      <Content
        currentStep={currentStep}
        upStep={upStep}
        downStep={downStep}
        onFinishStep={onFinish}
        currentPostData={postData}
      />
    </div>
  );
}

export default SharePost;
