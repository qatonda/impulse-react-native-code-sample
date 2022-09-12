import { useScreenshot } from 'use-react-screenshot';

// eslint-disable-next-line no-undef
const usePrint = (element: React.RefObject<HTMLDivElement>) => {
  // eslint-disable-next-line no-undef
  const [image, takeScreenShot] = useScreenshot();

  const getImage = () => takeScreenShot(element.current);
  return { getImage, image };
};

export default usePrint;
