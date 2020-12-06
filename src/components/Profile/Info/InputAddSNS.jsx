import React from 'react';
import { Button, Form, FormControl, Col } from 'react-bootstrap';
import { PlusCircle, Trash2 } from 'react-feather';
import { useTranslation } from 'i18n';

function InputAddSNS({
  initialSNS,
  isEmpty,
  setChangeTrue,
  setChangeFalse,
  // handleSetLoading,
  valSNS,
  setValSNS,
  showSNS,
  setShowSNS,
  errorFb,
  errorYt,
  errorLd,
  errorSelect,
}) {
  const { t } = useTranslation(['profile']);
  const typeSNS = ['facebook', 'twitter', 'instagram'];
  const getInitialSNStoInput = (sns) => {
    const linkSNS = [];
    if (sns) {
      Object.keys(sns).map((key) => {
        if (sns[key] !== '') {
          linkSNS.push({ type: key, input: sns[key] });
        }
        return null;
      });
    }
    return linkSNS;
  };
  const getErrorState = (ele) => {
    if (ele.type === 'facebook') {
      return errorFb.state;
    }
    if (ele.type === 'linkedin') {
      return errorLd.state;
    }
    if (ele.type === 'youtube') {
      return errorYt.state;
    }
    return null;
  };
  const getErrorMessage = (ele) => {
    if (ele.type === 'facebook') {
      return errorFb.message;
    }
    if (ele.type === 'linkedin') {
      return errorLd.message;
    }
    if (ele.type === 'youtube') {
      return errorYt.message;
    }
    return null;
  };
  const getErrorSelectState = (i) => {
    if (i === errorSelect.index) {
      return errorSelect.state;
    }
    return null;
  };
  const getErrorSelectMessage = (i) => {
    if (i === errorSelect.index) {
      return errorSelect.message;
    }
    return null;
  };
  const handleShowSNS = () => {
    // handleSetLoading(true);
    // setDisabledTrue();
    setShowSNS({
      displayPart: false,
      editPart: true,
    });
    setChangeTrue();
    // console.log('set true inside sns');
    // disabledSubmit(true);
  };
  const handleCancel = () => {
    setShowSNS({
      displayPart: true,
      editPart: false,
    });
    // handleSetLoading(false);
    setChangeFalse();
    setValSNS(getInitialSNStoInput(initialSNS));
  };

  const addInputSNS = () => {
    // handleSetLoading(true);
    // setDisabledTrue();
    if (!showSNS.editPart) {
      handleShowSNS();
    }
    setValSNS([
      ...valSNS,
      {
        type: '',
        input: '',
      },
    ]);
  };
  const removeInputSNS = (index) => {
    setValSNS([
      ...valSNS.slice(0, index),
      ...valSNS.slice(index + 1, valSNS.length),
    ]);
  };

  const createSNSInput = () => {
    return valSNS.map((element, i) => (
      <Form.Row key={element} style={{ marginBottom: '5px' }}>
        <Col xs={4} xl={4} style={{ margin: '0 0 auto auto' }}>
          {/* <div className="col-4 col-xl-4" style={{ margin: '0 0 auto auto' }}> */}
          <Form.Control
            as="select"
            value={element.type !== '' ? element.type : 'Select SNS'}
            onChange={(e) => {
              setValSNS(
                [...valSNS].map((obj, index) => {
                  if (i === index) {
                    return {
                      ...obj,
                      type: e.target.value,
                    };
                  }
                  return obj;
                }),
              );
            }}
            isInvalid={getErrorSelectState(i)}
          >
            <option
              value="Select SNS"
              style={{ fontWeight: 600 }}
              selected={element.type === ''}
              // selected={element.type !== 'facebook' || element.type !== 'linkedin' || element.type !== 'youtube'}
              disabled
            >
              {t('Select type')}
            </option>
            {typeSNS.map((sns) => (
              <option key={sns} value={sns}>
                {sns}
              </option>
            ))}
          </Form.Control>

          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {getErrorSelectMessage(i)}
          </FormControl.Feedback>
          {/* </div> */}
        </Col>
        <Col xs={7} xl={7} style={{ margin: '0 auto auto 0' }}>
          {/* <div className="col-7 col-xl-7" style={{ margin: '0 auto auto 0' }}> */}
          {/* <input
            type="text"
            className="form-control"
            value={element.input}
            onChange={(e) => {
              setValSNS(
                [...valSNS].map((obj, index) => {
                  if (i === index) {
                    return {
                      ...obj,
                      input: e.target.value,
                    };
                  }
                  return obj;
                }),
              );
            }}
          /> */}
          <Form.Control
            type="text"
            value={element.input}
            onChange={(e) => {
              setValSNS(
                [...valSNS].map((obj, index) => {
                  if (i === index) {
                    return {
                      ...obj,
                      input: e.target.value,
                    };
                  }
                  return obj;
                }),
              );
            }}
            isInvalid={getErrorState(element)}
          />
          <FormControl.Feedback type="invalid">
            {getErrorMessage(element)}
          </FormControl.Feedback>
          {/* </div> */}
        </Col>
        <Col xs={1} xl={1} style={{ margin: '0 auto auto 0' }}>
          {/* <div className="col-1 col-xl-1" style={{ margin: '0 auto auto 0' }}> */}
          <div style={{ margin: '7px auto' }}>
            <a
              role="presentation"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                removeInputSNS(i);
              }}
            >
              <Trash2 />
            </a>
          </div>
          {/* </div> */}
        </Col>
      </Form.Row>
    ));
  };
  return (
    <div>
      <div style={showSNS.displayPart ? null : { display: 'none' }}>
        {valSNS.map((element) => (
          <p key={element} className="social-link" style={{ fontSize: 13 }}>
            <strong>{element && element.input}</strong>
            {element &&
              element.input &&
              element.input !== '' &&
              ` (${element.type.charAt(0).toUpperCase() + element.type.slice(1)})`}
          </p>
        ))}
      </div>

      {showSNS.editPart && (
        <div>
          {createSNSInput()}
          <div>
            <Button
              variant="link"
              className="dc-link-btn"
              style={valSNS.length < 3 ? { fontSize: 15 } : { display: 'none' }}
              onClick={addInputSNS}
            >
              <PlusCircle /> {t('Add more social network')}
            </Button>
          </div>
          {/* <Button
            variant="primary"
            size="sm"
            onClick={handleCancel}
            style={{ fontSize: 15, padding: '5px 5px 5px 5px', marginLeft: 6 }}
          >
            Cancel
          </Button> */}
        </div>
      )}
      <div>
        <Button
          variant="link"
          className="dc-link-btn"
          onClick={handleShowSNS}
          style={
            !isEmpty() && !showSNS.editPart ? { fontSize: 15 } : { display: 'none' }
          }
        >
          {t('Edit')}
        </Button>

        <Button
          variant="link"
          style={
            isEmpty() && valSNS.length < 3 && !showSNS.editPart
              ? { fontSize: 15 }
              : { display: 'none' }
          }
          className="dc-link-btn"
          onClick={addInputSNS}
        >
          <PlusCircle />
          {t('Add more social network')}
        </Button>
      </div>
    </div>
  );
}

export default InputAddSNS;
