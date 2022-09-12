import React, { useState, CSSProperties } from 'react';
import Card from '@mui/material/Card';
import { View, Button } from 'native-base';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box } from '@mui/material';
import playImage from '../../assets/play.svg';
import AudioVisualizer from '../../audio/audio-visualizer';

interface PlayerStateProps {
  player: React.RefObject<HTMLAudioElement>
}

const usePlayerState = ({ player }: PlayerStateProps) => {
  const [playerState, setPlayerState] = useState({
    playing: true,
    currentTime: 0,
  });

  const handleTimeUpdates = () => {
    const currentPlayer = player.current;
    if (currentPlayer) {
      const updatedTime = (currentPlayer.currentTime / currentPlayer.duration) * 100;
      setPlayerState({
        ...playerState,
        currentTime: updatedTime,
      });
    }
  };

  function toggleVideoPlay () {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
    });

    const currentPlayer = player.current;

    if (currentPlayer && currentPlayer.paused) {
      currentPlayer.play();
    } else {
      currentPlayer?.pause();
    }
  }

  return {
    playerState,
    toggleVideoPlay,
    handleTimeUpdates,
  };
};

const sx: CSSProperties = {
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  borderRadius: '30px',
  overflow: 'hidden',
};

interface MediaControlCardProps {
  url: string
}

export default function AudioControlCard ({ url }: MediaControlCardProps) {
  // eslint-disable-next-line no-undef
  const player = React.useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const [audioAnalyser, setAudioAnalyser] = useState<AnalyserNode | undefined>();
  const { playerState, toggleVideoPlay, handleTimeUpdates } = usePlayerState({ player });

  React.useEffect(() => {
    if (player.current && !audioAnalyser) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(player.current);
      source.connect(analyser);
      analyser.connect(source.context.destination);

      setAudioAnalyser(analyser);
    }
  }, [player.current]);

  return (
    <Card sx={{ display: 'flex', borderRadius: '30px', justifyContent: 'center', height: '100%' }}>
      <audio
        crossOrigin="anonymous"
        ref={player}
        controls={false}
        playsInline
        loop
        autoPlay
        style={{ objectFit: 'cover', width: '100%', height: '100%', minHeight: '100%', borderRadius: '30px', overflow: 'hidden' }}
        onTimeUpdate={handleTimeUpdates}
      >
        {/* TODO: change type here from hard-coded value to audio recorder's mimeType */}
        <source src={url} type="audio/mpeg" />
        <track kind="captions" />
      </audio>

      {audioAnalyser &&
        <Box sx={{ backgroundColor: '#FFC10C', width: '100%', height: '100%' }}>
          <AudioVisualizer analyser={audioAnalyser} />
        </Box>}
      <Button
        variant="unstyled"
        style={{ position: 'absolute', height: '300px', width: '300px', alignSelf: 'center' }}
        onTouchStart={toggleVideoPlay}
        onPress={toggleVideoPlay}>
        {!playerState.playing &&
          <LazyLoadImage src={playImage} style={{ height: 150, width: 150, alignSelf: 'center' }} />
        }
      </Button>
    </Card>
  );
}
