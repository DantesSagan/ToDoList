import React, { useState } from 'react';

export default function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);
  const yOffset = () => {
    if (!showScroll && window.pageYOffset >= 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', yOffset);
  return (
    <div onClick={ScrollTop}>
      {showScroll ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 arrowScroll'
          viewBox='0 0 20 20'
          fill='currentColor'
          style={{
            height: '100px',
            width: '100px',
            cursor: 'pointer',
            padding: '5px',
            position: 'fixed',
            right: '100px',
            bottom: '100px',
          }}
        >
          <path
            fillRule='evenodd'
            d='M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
            clipRule='evenodd'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-0 w-0 arrowScroll'
          viewBox='0 0 20 20'
          fill='currentColor'
          style={{
            padding: '5px',
            position: 'fixed',
            right: '-100px',
            bottom: '150px',
          }}
        >
          <path
            fillRule='evenodd'
            d='M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
            clipRule='evenodd'
          />
        </svg>
      )}
    </div>
  );
}
