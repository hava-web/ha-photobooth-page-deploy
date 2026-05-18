import React from 'react';

export const AssetIcons: {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
  DownloadIcon: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={24}
      height={24}
      {...props}
    >
      <line
        x1="12"
        y1="21"
        x2="12"
        y2="3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <polyline
        points="19 14 12 21 5 14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  ),
  EyeIcon: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="var(--sync-primary-color)"
      width={24}
      height={24}
      {...props}
    >
      <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
    </svg>
  ),
  ChevronDown: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={24}
      height={24}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  GiftFillIcon: (props) => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.7424 11.5654H1.2572V25.6408H24.7424V11.5654Z"
        fill="#FFADB6"
      />
      <path
        d="M15.4395 11.5654H10.5573V25.6408H15.4395V11.5654Z"
        fill="#FFCCD1"
      />
      <path
        d="M13.1752 4.80431C13.1752 4.80431 11.087 -1.00132 7.76493 0.657432C4.44288 2.31618 4.57901 7.72458 9.04219 7.37296C13.5054 7.02135 13.1752 4.80431 13.1752 4.80431Z"
        fill="#CC525E"
      />
      <path
        d="M13.5575 4.80431C13.5575 4.80431 15.6486 -1.00132 18.9706 0.657432C22.2927 2.31618 22.1566 7.72726 17.6934 7.3676C13.2302 7.00793 13.5575 4.80431 13.5575 4.80431Z"
        fill="#CC525E"
      />
      <path
        d="M13.3664 6.8791C14.4493 6.8791 15.3272 6.06555 15.3272 5.06199C15.3272 4.05842 14.4493 3.24487 13.3664 3.24487C12.2835 3.24487 11.4056 4.05842 11.4056 5.06199C11.4056 6.06555 12.2835 6.8791 13.3664 6.8791Z"
        fill="#AD3440"
      />
      <path
        d="M24.5316 6.44434H1.46842C0.657434 6.44434 0 7.0536 0 7.80516V10.3255C0 11.0771 0.657434 11.6863 1.46842 11.6863H24.5316C25.3426 11.6863 26 11.0771 26 10.3255V7.80516C26 7.0536 25.3426 6.44434 24.5316 6.44434Z"
        fill="#F597A1"
      />
      <path
        d="M15.4053 6.44434H10.5946V11.6863H15.4053V6.44434Z"
        fill="#E6737E"
      />
    </svg>
  ),
  CheckIcon: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      {...props}
      width={30}
      height={30}
      fill="#3b82f6"
    >
      <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z" />
    </svg>
  ),
  RightIcon: (props) => (
    <svg
      width="52"
      height="54"
      viewBox="0 0 52 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_92_9)">
        <ellipse cx="25.5471" cy="22.5" rx="21.5471" ry="22.5" fill="white" />
        <path
          d="M28.2822 22.3057L16.8555 13.0742L15.5928 14.7783L24.248 21.7686L24.9551 22.3398L24.2598 22.9258L15.5674 30.2461L16.8623 31.9229L28.2822 22.3057Z"
          stroke="black"
          strokeWidth="1.5"
        />
        <path
          d="M39.2637 22.3057L27.8311 13.0762L26.5742 14.7783L35.2295 21.7686L35.9365 22.3398L35.2412 22.9258L26.5479 30.2471L27.8379 31.9219L39.2637 22.3057Z"
          stroke="black"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_92_9"
          x="0"
          y="0"
          width="51.0942"
          height="54"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_92_9"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_92_9"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
  LeftIcon: (props) => (
    <svg
      width="55"
      height="55"
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_92_3)">
        <circle cx="27.0184" cy="22.0184" r="22.0184" fill="white" />
        <path
          d="M25.2593 22.208L36.937 31.2412L38.2222 29.5801L29.3999 22.7559L28.6489 22.1748L29.3882 21.5791L38.2485 14.4336L36.9292 12.7969L25.2593 22.208Z"
          stroke="black"
          strokeWidth="1.5"
        />
        <path
          d="M14.0386 22.208L25.7212 31.2402L27.0015 29.5811L18.1782 22.7559L17.4272 22.1748L18.1665 21.5791L27.0278 14.4326L25.7134 12.7979L14.0386 22.208Z"
          stroke="black"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_92_3"
          x="0"
          y="0"
          width="54.0366"
          height="54.0367"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_92_3"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_92_3"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
};
