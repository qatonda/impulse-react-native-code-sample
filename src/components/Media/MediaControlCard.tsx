import React, { useCallback, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Button } from 'native-base';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import playImage from '../../assets/play.svg';

interface PlayerStateProps {
  videoPlayer: React.RefObject<HTMLVideoElement>
  autoplay: boolean
  canPlay: boolean
}

const usePlayerState = ({ videoPlayer, autoplay, canPlay }: PlayerStateProps) => {
  const [autoplayed, setAutoplayed] = useState(false);
  const [playerState, setPlayerState] = useState({
    playing: false,
    currentTime: 0,
  });

  const isVideoStopped = useCallback(() => videoPlayer.current?.paused || videoPlayer.current?.ended, [videoPlayer]);

  const handleTimeUpdates = () => {
    const player = videoPlayer.current;
    if (player) {
      const updatedTime = (player.currentTime / player.duration) * 100;
      setPlayerState({
        ...playerState,
        currentTime: updatedTime,
      });
    }
  };

  const play = useCallback(() => {
    const player = videoPlayer.current;

    if (player && canPlay && isVideoStopped()) {
      player.play();

      setAutoplayed(true);
      setPlayerState({
        playing: true,
        currentTime: player.currentTime,
      });
    }
  }, [canPlay, isVideoStopped, videoPlayer]);

  const pause = useCallback(() => {
    const player = videoPlayer.current;

    if (player && !isVideoStopped()) {
      player.pause();

      setPlayerState({
        playing: false,
        currentTime: player.currentTime,
      });
    }
  }, [isVideoStopped, videoPlayer]);

  useEffect(() => {
    const player = videoPlayer.current;

    if (player && !canPlay && !isVideoStopped()) {
      pause();
    }
  }, [videoPlayer, canPlay, pause, isVideoStopped]);

  // automatically plays video on first time it appears and canPlay is true
  // the other option would be using <video autoplay={true} />
  // but it causes unexpected behavior and might play other non-visible media
  useEffect(() => {
    const player = videoPlayer.current;

    if (player && canPlay && isVideoStopped() && autoplay && !autoplayed) {
      play();
    }
  }, [autoplay, autoplayed, canPlay, isVideoStopped, play, videoPlayer]);

  return {
    playerState,
    play,
    pause,
    handleTimeUpdates,
  };
};

interface MediaControlCardProps {
  url: string
  autoplay: boolean
  isPlaying?: boolean
  onPause?: () => void
  onPlay?: () => void
  onError?: () => void
  shouldMute?: boolean;
  mirror?: boolean
}

export default function MediaControlCard ({ url, autoplay, shouldMute, mirror, onError }: MediaControlCardProps) {
  const videoPlayer = React.useRef<HTMLVideoElement>(null);
  const { playerState, play, pause, handleTimeUpdates } = usePlayerState({ videoPlayer, autoplay, canPlay: !shouldMute });

  const mirrorTransform = mirror ? { transform: 'rotateY(180deg)' } : {};

  return (
    <Card sx={{ display: 'flex', borderRadius: '30px', justifyContent: 'center', height: '100%' }}>
      <CardMedia
        ref={videoPlayer}
        component="video"
        controls={false}
        playsInline={true}
        loop={true}
        sx={{ background: 'white', objectFit: 'cover', width: '100%', height: '100%', minHeight: '100%', borderRadius: '30px', ...mirrorTransform }}
        src={url}
        onTimeUpdate={handleTimeUpdates}
        onError={onError}
      />
      <Button
        variant="unstyled"
        style={{ position: 'absolute', height: '300px', width: '300px', alignSelf: 'center' }}
        onTouchStart={playerState.playing ? pause : play}
        onPress={playerState.playing ? pause : play}>
        {!playerState.playing &&
          <LazyLoadImage src={playImage} style={{ height: 150, width: 150, alignSelf: 'center' }} />
        }
      </Button>
    </Card>
  );
}
