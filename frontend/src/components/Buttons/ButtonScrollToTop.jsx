import { useEffect } from 'react';
import { Button } from '.';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

function ScrollToTop() {
  useEffect(() => {
    const button = document.querySelector(".btn.scroll-to-top");

    window.onscroll = () => scroll();

    const scroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.classList.remove("display-none");
      } else {
        button.classList.add("display-none");
      }
    };
  }, []);

  const handleScrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
  }

  return (
    <Button type="scroll-to-top display-none" title="Go to top" click={ handleScrollToTop }>
      <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
    </Button>
  );
}

export default ScrollToTop;
