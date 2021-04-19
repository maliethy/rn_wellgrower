import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};
function useOrientation() {
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    const callback = ({ window: { width, height } }) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    };
    Dimensions.addEventListener('change', callback);
    return () => {
      Dimensions.removeEventListener('change', callback);
    };
  }, []);
  return orientation;
}
export default useOrientation;
