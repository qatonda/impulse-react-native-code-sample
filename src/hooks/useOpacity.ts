import { useLayoutEffect, useState } from 'react';
import { Location } from '../models/CardModels';
import { OVERLAY_COLORS, OVERLAY_EMOJIS } from '../utils/constants';

interface OverlayGradient {
  layer0: string
  layer1: string
}

type OverlayState = {
  emoji: string
  gradient: OverlayGradient
  opacity: number
}

type Direction = 'right' | 'left' | 'down'

export const useOpacity = (location: Location, preventSwipeReader: () => string[]): OverlayState => {
  const [overlayState, setOverlayState] = useState<OverlayState>({
    emoji: '',
    gradient: { layer0: 'transparent', layer1: 'transparent'},
    opacity: 0,
  });

  const preventSwipeDirections = preventSwipeReader();

  const calculateOpacity = (position: number) => {
    const opacityPercentage = (position - 20) / 100;
    const maxOpacity = Math.min(opacityPercentage, 1);
    return maxOpacity;
  };

  const getGradientLayerColor = (direction: Direction, updatedOpacity: number): OverlayGradient => {
    // Note: the last 2 digits of the hex color is used for the Alpha value
    // Here, we do updatedOpacity * 100 - 1, so the Alpha is never 100, max 99
    // when Alpha has 3 digits, it will be ignored.
    const alpha = updatedOpacity * 100 - 1;

    switch (direction) {
      case 'right':
        return {layer0: `${OVERLAY_COLORS.YES_LAYER0}${alpha}`, layer1: `${OVERLAY_COLORS.YES_LAYER1}${alpha}`};
      case 'left':
        return {layer0: `${OVERLAY_COLORS.NO_LAYER0}${alpha}`, layer1: `${OVERLAY_COLORS.NO_LAYER1}${alpha}`};
      case 'down':
        return {layer0: `${OVERLAY_COLORS.SKIP_LAYER0}${alpha}`, layer1: `${OVERLAY_COLORS.SKIP_LAYER1}${alpha}`};
      default:
        return {layer0: 'transparent', layer1: 'transparent'};
    }
  };

  useLayoutEffect(() => {
    if (Math.abs(location.x) >= Math.abs(location.y) && location.x > 20 && !preventSwipeDirections.includes('right')) {
      const updatedOpacity = calculateOpacity(location.x);
      setOverlayState({
        emoji: OVERLAY_EMOJIS.OVERLAY_YES,
        gradient: getGradientLayerColor('right', updatedOpacity),
        opacity: updatedOpacity,
      });

    } else if (Math.abs(location.x) >= Math.abs(location.y) && location.x < -20 && !preventSwipeDirections.includes('left')) {
      const updatedOpacity = calculateOpacity(location.x * -1);
      setOverlayState({
        emoji: OVERLAY_EMOJIS.OVERLAY_NO,
        gradient: getGradientLayerColor('left', updatedOpacity),
        opacity: updatedOpacity,
      });

    } else if (Math.abs(location.x) < Math.abs(location.y) && location.y > 20 && !preventSwipeDirections.includes('down')) {
      const updatedOpacity = calculateOpacity(location.y);
      setOverlayState({
        emoji: OVERLAY_EMOJIS.OVERLAY_SKIP,
        gradient: getGradientLayerColor('down', updatedOpacity),
        opacity: updatedOpacity,
      });

    } else {
      setOverlayState({
        emoji: '',
        gradient: { layer0: 'transparent', layer1: 'transparent'},
        opacity: 0,
      });
    }
  }, [location]);

  return overlayState;

};
