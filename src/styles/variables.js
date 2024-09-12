import { css } from 'styled-components';

const variables = css`
  :root {
    --m-blue: #0088CC; // main blue

    --m-gray: #c9c9c9;
    --m-dim-gray: #666666;
    --m-light-gray: #EEEEEE;
    --m-lightest-gray: #c5c5c5;

    --m-dark-black: #000000;
    --m-black: #231f20; 
    --m-medium-black: #3d3d3d;
    --m-light-black: #606060;
    /* --m-medium-black: #1d1d1f; */
    /* --m-light-black: #3d3d3d;  */

    --m-font-title: "Bebas Neue", sans-serif;
    --font-mono: "DM Mono", monospace;
    --m-font-serif: "Edu", cursive;
    --m-font-primary: "Saira", sans-serif;
    --m-font-sub-title: "Saira Semi Condensed", sans-serif;
    --m-font-back: 'Anton', sans-serif;

    --dark-navy: #020c1b; // 000000
    --navy: #000000; // 242220 // 0a192f
    --light-navy: #112240;
    --lightest-navy: #233554;
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --dark-slate: #495670;
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;
    --m-blue: #0088CC; // 4ea7ff // 64ffda // 0088CC
    --m-blue-tint: rgba(100, 255, 218, 0.1);
    --pink: #f57dff;
    --blue: #57cbff;


    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-sm-md: 15px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-copy: 19px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 20px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 32px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
