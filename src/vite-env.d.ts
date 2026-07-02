/// <reference types="vite/client" />

declare module '*.css';
declare module '*.scss';
declare module '*.sass';

declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export default ReactComponent;
}