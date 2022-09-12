import React from 'react';
import stopCaptureImage from '../../assets/stop-rectangle.svg';
import './pie-progress.css';

const cleanPercentage = (percentage: number) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

type CircleProps = {
  colour: string
  pct: number
}

const Circle = ({ colour, pct }: CircleProps) => {
  const r = 25;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
      strokeWidth={'5px'}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    />
  );
};

type PieProps = {
  percentage: number
  colour: string
}

const Pie = ({ percentage, colour }: PieProps) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${'100 100'})`}>
        <Circle colour="white" pct={100} />
        <Circle colour={colour} pct={pct} />
      </g>
      <image x={87} y={87} width={26} height={26} href={stopCaptureImage} />
    </svg>
  );
};

export default Pie;
