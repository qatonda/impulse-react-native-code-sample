// heavily inspired by https://github.com/doppelgunner/audio-react-recorder/blob/master/src/index.js
// and https://github.com/jyunderwood/WaveformView-iOS

import React, { useEffect, useRef, useState } from 'react';
import { CARD_RATIO } from '../utils/constants';

let currentAnimationFrameRequestId: number | undefined;

function normalize(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}

function visualize(canvas: HTMLCanvasElement, analyser: AnalyserNode) {
  const canvasCtx = canvas.getContext('2d');
  if (!canvasCtx) {
    console.error('ERROR: Could not get canvas context, so we cannot draw audio visualizer');
    return;
  }

  // setup the data buffer
  analyser.smoothingTimeConstant = 0.8; // 0.8
  analyser.fftSize = 128;
  const bufferLength = analyser.frequencyBinCount;
  const dataBuffer = new Uint8Array(bufferLength);

  const width = canvas.width;
  const height = canvas.height;

  // fix blurry lines
  // https://stackoverflow.com/questions/8696631/canvas-drawings-like-lines-are-blurry#comment87755299_8696641
  canvasCtx.translate(0.5, 0.5);

  // setup constants
  const phaseShift = -0.12;
  const numberOfWaves = 4;
  const frequency = 1.5;
  const density = 0.5;
  const normalizeVolumeMin = 10.0;
  const normalizeVolumeMax = 70.0; // 20
  // phase shifts by a constant amount (phaseShift) each draw
  let phase = 0.0;

  // actual drawing
  const _draw = () => {
    // request a run on the next frame too (this keeps the loop going)
    currentAnimationFrameRequestId = requestAnimationFrame(_draw);

    // update phase
    phase += phaseShift;

    // get the audio data
    analyser.getByteFrequencyData(dataBuffer);

    canvasCtx.clearRect(0, 0, width, height);
    canvasCtx.strokeStyle = 'white';

    const arraySum = dataBuffer.reduce((a, value) => a + value, 0);
    const average = arraySum / dataBuffer.length;
    const amplitude = normalize(average, normalizeVolumeMin, normalizeVolumeMax); // 1.0

    const halfHeight = height / 2;
    const midX = width / 2;

    const maxAmplitude = halfHeight - 1.0; // 2 corresponds to twice the stroke width

    for (let i = 0; i < numberOfWaves; i++){
      canvasCtx.lineWidth = i === 0 ? 3.0 : 1.5;
      canvasCtx.beginPath();

      // Progress is a value between 1.0 and -0.5, determined by the current wave idx, which is used to alter the wave's amplitude.
      const progress = 1.0 - i / numberOfWaves;
      const normalizedAmplitude = (1.5 * progress - 0.5) * amplitude;

      let x = 0;
      while (x < width) {
        const scaling = -((1 / midX * (x - midX)) ** 2) + 1;
        const y = scaling * maxAmplitude * normalizedAmplitude * Math.sin(2 * Math.PI * (x / width) * frequency + phase) + halfHeight;

        if (x === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += density;
      }
      canvasCtx.stroke();
    }
  };
  _draw();
}

export default function AudioVisualizer({ analyser }: { analyser: AnalyserNode }) {
  const [setup, setSetup] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // call visualize once canvas ref set (only do this once, hence setup flag)
  useEffect(() => {
    if (!setup && canvasRef.current) {
      setSetup(true);
      visualize(canvasRef.current, analyser);
    }
  }, [canvasRef, setup, analyser]);

  // handle cleanup once AudioVisualizer is unmounted
  useEffect(() => {
    return () => {
      // cancel the animation since we're being removed from the screen
      if (currentAnimationFrameRequestId) window.cancelAnimationFrame(currentAnimationFrameRequestId);
    };
  }, []);

  // adjust canvas size to fit the card ratio
  const canvasWidth = 400;
  const canvasHeight = canvasWidth / CARD_RATIO;

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
}
