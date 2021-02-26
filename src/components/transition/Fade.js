import React from 'react'
import Fade from 'react-reveal/Fade'

const FadeEffect = ({children,timeout,spy}) => {
  // const prevScrollY = useRef(0);
  // const [goingUp, setGoingUp] = useState(false);
  // const [show, setShow] = useState(true);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     if (prevScrollY.current < currentScrollY && goingUp) {
  //       setGoingUp(false);
  //     }
  //     if (prevScrollY.current > currentScrollY && !goingUp) {
  //       setGoingUp(true);
  //     }

  //     prevScrollY.current = currentScrollY;
  //     if(goingUp){
  //       setShow(false)
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [goingUp]); 
    const renderFade = () => {
      if(spy){
        return (
          <Fade up spy={spy} duration={timeout}>
              {children}
          </Fade> 
        )
      }else{
        return (
          <Fade up duration={timeout}>
              {children}
          </Fade> 
        )
      }
    }
    return (
      renderFade()
    )
}

export default FadeEffect