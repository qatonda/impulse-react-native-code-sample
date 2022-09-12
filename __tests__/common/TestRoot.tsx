import React from 'react';
import { NativeBaseProvider } from 'native-base';

export default function TestRoot (props: { children: React.ReactNode }) {
  return (
    <NativeBaseProvider
      initialWindowMetrics={{
        frame: {
          width: 320,
          height: 640,
          x: 0,
          y: 0,
        },
        insets: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        },
      }}
    >
      {props.children}
    </NativeBaseProvider>
  );
}
