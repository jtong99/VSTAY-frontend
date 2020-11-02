import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import { Search } from 'react-feather';

const minInputWidth = 380;
const maxInputWidth = 474;
function SearchBar() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const { t } = useTranslation(['topnav']);
  const [inputWidth, setInputWidth] = useState(minInputWidth);

  const toggleWidth = () => {
    if (inputWidth === minInputWidth) {
      setInputWidth(maxInputWidth);
    } else {
      setInputWidth(minInputWidth);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim()) {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
      setInput('');
    }
  };
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '0px 12px',
      }}
    >
      <Form
        onSubmit={handleSubmit}
        style={{
          width: inputWidth,
          minWidth: 120,
          position: 'relative',
          transition: 'width 400ms',
        }}
      >
        <Form.Control
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-0 text-secondary"
          type="search"
          required
          placeholder={t('Search for share V-accommodation')}
          style={{ paddingRight: 42, borderRadius: 14, backgroundColor: '#EBEBEB' }}
          onFocus={toggleWidth}
          onBlur={toggleWidth}
        />
        <Button
          variant="link"
          className="d-flex conversion text-secondary"
          id="search-btn"
          type="submit"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Search />
        </Button>
      </Form>
    </div>
  );
}

export default SearchBar;
