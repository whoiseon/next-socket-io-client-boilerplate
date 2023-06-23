/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg_page: '#FAFAFA',
        bg_element1: '#FFFFFF',
        bg_element2: '#F7F8F9',
        bg_element3: '#E9ECEF',
        bg_element4: '#E2E2E2',
        text1: '#121212',
        text2: '#495057',
        text3: '#868E96',
        text4: '#BBBBBB',
        border1: '#343A40',
        border2: '#A2AAB2',
        border3: '#C7CBCF',
        border4: '#D7DBDF',
        border5: '#E9E9E9',
        primary1: '#3D6AFE',
        primary2: '#4593FC',
        destructive1: '#FB4E4E',
        destructive2: '#FC7171',
        button_text: '#FFFFFF',
        placeholder: '#868E96',
      },
      dropShadow: {
        right: '3px 0 10px rgba(0, 0, 0, 0.01)',
        bottom: '0 3px 10px rgba(0, 0, 0, 0.01)',
        top: '0 -3px 10px rgba(0, 0, 0, 0.01)',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
