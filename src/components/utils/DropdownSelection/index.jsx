import React from 'react';
import styles from './DropdownSelection.module.scss';
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';
/**
 *
 * @param {object} param
 * @param {any} param.icon
 * @param {number} param.defaultIndex
 * @param {function(string)} param.onChange
 * @param {[{value: string, label: string}]} param.items
 */

function DropdownSelection({ icon, defaultIndex = 0, onChange, items, ...props }) {
  const [selected, setSelected] = useState(
    items[defaultIndex >= 0 ? defaultIndex : 0],
  );

  const handleItemClick = (item) => () => {
    setSelected(item);
    onChange(item.value);
  };

  return (
    <Dropdown {...props}>
      <Dropdown.Toggle variant="link" className={styles.button}>
        <span>{icon}</span>
        {selected.label}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.menu}>
        {items.map((item) => (
          <Dropdown.Item
            key={item.value}
            className={`${item.value === selected.value && styles.selected} ${
              styles.item
            }`}
            onClick={handleItemClick(item)}
          >
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownSelection;
