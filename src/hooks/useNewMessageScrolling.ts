import { useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from 'context/AuthContext';
import { RootState } from 'redux/store';

// https://stackoverflow.com/questions/10787782/full-height-of-a-html-element-div-including-border-padding-and-margin
const getAbsoluteHeight = (el: HTMLElement | null) => {
  // Get the DOM Node if you pass in a string
  el = typeof el === 'string' ? document.querySelector(el) : el;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const styles = window.getComputedStyle(el!);
  const margin =
    parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return Math.ceil(el!.offsetHeight + margin);
};

// Scroll down when a new message is shown if the user is scrolled
// all the way down to the bottom of the div or they themselves sent the message
export const useNewMessageScrolling = () => {
  const { currentUserId } = useContext(AuthContext);
  const { messages } = useSelector((state: RootState) => state.conversation);

  const isAtBottom = useRef(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    const isFromMe = messages[messages.length - 1].from === currentUserId;

    if (isAtBottom.current || isFromMe) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentUserId, messages]);

  const onScroll = (e: React.UIEvent<HTMLElement>) => {
    const divElement = e.currentTarget;

    if (
      divElement.scrollHeight - divElement.scrollTop ===
      getAbsoluteHeight(divElement)
    ) {
      isAtBottom.current = true;
    } else {
      isAtBottom.current = false;
    }
  };

  return { scrollRef, onScroll };
};

export default useNewMessageScrolling;
