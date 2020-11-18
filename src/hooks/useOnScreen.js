import React from 'react';

/**
 * Check if an element is on screen or not
 * @param {ElementRef} ref - ref of target element
 * @param {string | number} rootMargin - distance of target with the screen
 */
function useOnScreen(ref, rootMargin = '120px') {
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin },
    );
    const target = ref.current;

    if (target) {
      observer.observe(target);
    }
    return () => {
      observer.unobserve(target);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

export default useOnScreen;
