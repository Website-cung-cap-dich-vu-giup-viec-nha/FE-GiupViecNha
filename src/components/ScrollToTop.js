// src/components/ScrollToTop.js
import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra vị trí scroll để hiển thị hoặc ẩn nút
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll lên đầu trang khi nhấn vào nút
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button className='btn btn-outline-warning ' onClick={scrollToTop} style={styles.button}>
        <i className="fa-solid fa-arrow-up-long"></i>
        </button>
      )}
    </div>
  );
};

const styles = {
  button: {
    position: 'fixed',
    bottom: '50px',
    right: '30px',
    padding: '10px 20px',
    fontSize: '20px',
    zIndex: '1000',
  },
};

export default ScrollToTop;
