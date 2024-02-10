/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        Montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'pb-h1': ['4.8rem', '5.8rem'],
        'pb-h2': ['4.0rem', '4.4rem'],
        'pb-body': ['3.2rem', '3.9rem'],
        'pb-small': ['2.4rem', '2.9rem'],
        'pb-xs': ['1.4rem', '1.7rem'],

        'lp-h1': ['4.8rem', '5.8rem'],
        'lp-h2': ['4.7rem', '5.8rem'],
        'lp-body': ['2.7rem', '3.4rem'],
        'lp-small': ['1.6rem', '2rem'],

        'lp-section-title': [
          '4.7rem',
          {
            lineHeight: '5.8rem',
            fontWeight: 800,
          },
        ],
        'lp-section-title-2': [
          '3.5rem',
          {
            lineHeight: '3.9rem',
            fontWeight: 800,
          },
        ],
        'lp-card-title': [
          '2.9rem',
          {
            lineHeight: '3.4rem',
            fontWeight: 700,
          },
        ],
      },
      colors: {
        'primary-color': 'var(--primary-color)',
        'second-primary-color': 'var(--second-primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'secondary-text-color': 'var(--secondary-text-color)',
        'border-color': 'var(--border-color)',
        'border-active-img-color': 'var(--border-active-img-color)',
        'active-color': 'var(--active-color)',
        'info-color': 'var(--info-color)',
        'inactive-color': 'var(--inactive-color)',
        'support-text-color': 'var(--support-text-color)',

        'bg-primary-color': 'var(--bg-primary-color)',
        'dark-bg-primary-color': 'var(--dark-bg-primary-color)',
        'lighter-bg-primary-color': 'var(--lighter-bg-primary-color)',

        'lp-primary-color': 'var(--lp-primary-color)',
        'lp-lighter-primary-color': 'var(--lp-lighter-primary-color)',
        'lp-lighter2-primary-color': 'var(--lp-lighter2-primary-color)',
        'lp-secondary-color': 'var(--lp-secondary-color)',
        'lp-gold-color': 'var(--lp-gold-color)',
      },
      backgroundImage: {
        'gradient-pink':
          'linear-gradient(to right bottom, white, var(--lp-lighter2-primary-color))',
      },
      zIndex: {
        'z-index-header': 'var(--z-index-header)',
        'z-index-banner-dot': 'var(--z-index-banner-dot)',
        'z-index-retake-result': 'var(--z-index-retake-result)',
        'z-index-backdrop': 'var(--z-index-backdrop)',
        'z-index-button-on-backdrop': 'var(--z-index-button-on-backdrop)',
        'z-index-freeze-webcam-loading': 'var(--z-index-freeze-webcam-loading)',
        'z-index-loading': 'var(--z-index-loading)',
        'z-index-popup': 'var(--z-index-popup)',
        'z-index-floating-button': 'var(--z-index-floating-button)',
        'z-index-popover': 'var(--z-index-popover)',
      },
      spacing: {
        1: '1rem',
        2: '2rem',
        3: '3rem',
        4: '4rem',
        5: '5rem',
        6: '6rem',
      },
      borderRadius: {
        1: '1rem',
        2: '2rem',
        3: '3rem',
        4: '4rem',
        5: '5rem',
        6: '6rem',
      },
      boxShadow: {
        navbar: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        box: '0 5px 10px 0px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        'scale-pulse': {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.1, 1.1)' },
        },
        'tilt-shaking': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(0eg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'tilt-n-move-shaking': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(5px, 5px) rotate(5deg)' },
          '50%': { transform: 'translate(0, 0) rotate(0eg)' },
          '75%': { transform: 'translate(-5px, 5px) rotate(-5deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
      },
      animation: {
        'scale-pulse': 'scale-pulse 1s linear infinite',
        'tilt-shaking': 'tilt-shaking 0.5s linear infinite',
        'tilt-n-move-shaking': 'tilt-n-move-shaking 0.5s linear infinite',
      },
      screens: {
        'less-sm': { max: '639px' },
      },
    },
    fontSize: {
      sm: ['4.8rem', '5.8rem'],
      base: ['3.2rem', '3.9rem'],
    },
  },
};
