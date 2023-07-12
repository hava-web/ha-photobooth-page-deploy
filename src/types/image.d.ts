declare module '*.component.svg' {
  import { ComponentType } from 'react';

  const content: ComponentType<React.HTMLAttributes<React.ReactSVGElement>>;
  export default content;
}

declare module '*.svg' {
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.mp3' {
  const content: string;
  export default content;
}

declare module '*.mp4' {
  const content: string;
  export default content;
}
