import React from 'react';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import styles from './CheckboxButton.module.scss';

function CheckboxButton({ defaultValue, onChange, label, ...props }) {
  const [checked, setChecked] = useState(defaultValue);

  const handleChange = (e) => {
    setChecked(e.currentTarget.checked);
    onChange(e.currentTarget.checked);
  };

  return (
    <Form.Group {...props}>
      <Form.Check id={label} custom className={styles.wrapper}>
        <Form.Check.Input checked={checked} onChange={handleChange} />
        <Form.Check.Label>{label}</Form.Check.Label>
      </Form.Check>
    </Form.Group>
  );
}

export default CheckboxButton;
