import React from 'react';
// Exported Components here because its a very long file
export {
  GlobeIcon,
  BillingIcon,
  SettingsIcon,
  HomeIcon,
  ShareIcon,
  ArchiveIcon,
  HamburgerIcon,
  RedExclamationIcon,
  GreenCheckIcon,
  YellowExclamationIcon,
  FacebookIcon,
  ExitIcon
};
const HomeIcon = props => (
  <svg
    width={props.length}
    height={props.length}
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.3999 16.725L22.2749 3.60001L39.1499 16.725V37.35C39.1499 38.3446 38.7548 39.2984 38.0516 40.0017C37.3483 40.7049 36.3945 41.1 35.3999 41.1H9.1499C8.15534 41.1 7.20151 40.7049 6.49825 40.0017C5.79499 39.2984 5.3999 38.3446 5.3999 37.35V16.725Z"
      stroke="#EBEBEB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.875 41.25V22.5H28.125V41.25"
      stroke="#EBEBEB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const BillingIcon = props => (
  <svg
    width={props.length}
    height={props.length}
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M37.5 7.5H7.5C5.41875 7.5 3.76875 9.16875 3.76875 11.25L3.75 33.75C3.75 35.8312 5.41875 37.5 7.5 37.5H37.5C39.5812 37.5 41.25 35.8312 41.25 33.75V11.25C41.25 9.16875 39.5812 7.5 37.5 7.5ZM37.5 33.75H7.5V22.5H37.5V33.75ZM37.5 15H7.5V11.25H37.5V15Z"
      fill="#EFEFEF"
    />
  </svg>
);
const SettingsIcon = props => (
  <svg
    width={props.length}
    height={props.length}
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.5 28.125C25.6066 28.125 28.125 25.6066 28.125 22.5C28.125 19.3934 25.6066 16.875 22.5 16.875C19.3934 16.875 16.875 19.3934 16.875 22.5C16.875 25.6066 19.3934 28.125 22.5 28.125Z"
      stroke="#EFEFEF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M36.375 28.125C36.1254 28.6905 36.051 29.3179 36.1612 29.9261C36.2715 30.5343 36.5615 31.0956 36.9937 31.5375L37.1063 31.65C37.4549 31.9983 37.7315 32.4119 37.9202 32.8671C38.1089 33.3223 38.2061 33.8103 38.2061 34.3031C38.2061 34.7959 38.1089 35.2839 37.9202 35.7392C37.7315 36.1944 37.4549 36.608 37.1063 36.9562C36.758 37.3049 36.3444 37.5815 35.8892 37.7702C35.4339 37.9589 34.9459 38.0561 34.4531 38.0561C33.9603 38.0561 33.4723 37.9589 33.0171 37.7702C32.5619 37.5815 32.1483 37.3049 31.8 36.9562L31.6875 36.8437C31.2456 36.4115 30.6843 36.1215 30.0761 36.0112C29.4679 35.901 28.8405 35.9754 28.275 36.225C27.7204 36.4627 27.2475 36.8573 26.9143 37.3604C26.5812 37.8634 26.4024 38.4529 26.4 39.0562V39.375C26.4 40.3696 26.0049 41.3234 25.3016 42.0266C24.5984 42.7299 23.6446 43.125 22.65 43.125C21.6554 43.125 20.7016 42.7299 19.9984 42.0266C19.2951 41.3234 18.9 40.3696 18.9 39.375V39.2062C18.8855 38.5856 18.6846 37.9837 18.3235 37.4788C17.9623 36.9739 17.4576 36.5893 16.875 36.375C16.3095 36.1254 15.6821 36.051 15.0739 36.1612C14.4657 36.2715 13.9044 36.5615 13.4625 36.9937L13.35 37.1063C13.0017 37.4549 12.5881 37.7315 12.1329 37.9202C11.6777 38.1089 11.1897 38.2061 10.6969 38.2061C10.2041 38.2061 9.71609 38.1089 9.26085 37.9202C8.80561 37.7315 8.39202 37.4549 8.04375 37.1063C7.69509 36.758 7.41849 36.3444 7.22978 35.8892C7.04106 35.4339 6.94392 34.9459 6.94392 34.4531C6.94392 33.9603 7.04106 33.4723 7.22978 33.0171C7.41849 32.5619 7.69509 32.1483 8.04375 31.8L8.15625 31.6875C8.58851 31.2456 8.87847 30.6843 8.98876 30.0761C9.09904 29.4679 9.02459 28.8405 8.775 28.275C8.53732 27.7204 8.14267 27.2475 7.63962 26.9143C7.13658 26.5812 6.5471 26.4024 5.94375 26.4H5.625C4.63044 26.4 3.67661 26.0049 2.97335 25.3016C2.27009 24.5984 1.875 23.6446 1.875 22.65C1.875 21.6554 2.27009 20.7016 2.97335 19.9984C3.67661 19.2951 4.63044 18.9 5.625 18.9H5.79375C6.41436 18.8855 7.01626 18.6846 7.52119 18.3235C8.02611 17.9623 8.41072 17.4576 8.625 16.875C8.87459 16.3095 8.94904 15.6821 8.83876 15.0739C8.72847 14.4657 8.43851 13.9044 8.00625 13.4625L7.89375 13.35C7.54509 13.0017 7.26849 12.5881 7.07978 12.1329C6.89106 11.6777 6.79393 11.1897 6.79393 10.6969C6.79393 10.2041 6.89106 9.71609 7.07978 9.26085C7.26849 8.80561 7.54509 8.39202 7.89375 8.04375C8.24202 7.69509 8.65561 7.41849 9.11085 7.22978C9.56609 7.04106 10.0541 6.94392 10.5469 6.94392C11.0397 6.94392 11.5277 7.04106 11.9829 7.22978C12.4381 7.41849 12.8517 7.69509 13.2 8.04375L13.3125 8.15625C13.7544 8.58851 14.3157 8.87847 14.9239 8.98876C15.5321 9.09904 16.1595 9.02459 16.725 8.775H16.875C17.4296 8.53732 17.9025 8.14267 18.2357 7.63962C18.5688 7.13658 18.7476 6.5471 18.75 5.94375V5.625C18.75 4.63044 19.1451 3.67661 19.8484 2.97335C20.5516 2.27009 21.5054 1.875 22.5 1.875C23.4946 1.875 24.4484 2.27009 25.1516 2.97335C25.8549 3.67661 26.25 4.63044 26.25 5.625V5.79375C26.2524 6.3971 26.4312 6.98658 26.7643 7.48962C27.0975 7.99267 27.5704 8.38732 28.125 8.625C28.6905 8.87459 29.3179 8.94904 29.9261 8.83876C30.5343 8.72847 31.0956 8.43851 31.5375 8.00625L31.65 7.89375C31.9983 7.54509 32.4119 7.26849 32.8671 7.07978C33.3223 6.89106 33.8103 6.79393 34.3031 6.79393C34.7959 6.79393 35.2839 6.89106 35.7392 7.07978C36.1944 7.26849 36.608 7.54509 36.9562 7.89375C37.3049 8.24202 37.5815 8.65561 37.7702 9.11085C37.9589 9.56609 38.0561 10.0541 38.0561 10.5469C38.0561 11.0397 37.9589 11.5277 37.7702 11.9829C37.5815 12.4381 37.3049 12.8517 36.9562 13.2L36.8437 13.3125C36.4115 13.7544 36.1215 14.3157 36.0112 14.9239C35.901 15.5321 35.9754 16.1595 36.225 16.725V16.875C36.4627 17.4296 36.8573 17.9025 37.3604 18.2357C37.8634 18.5688 38.4529 18.7476 39.0562 18.75H39.375C40.3696 18.75 41.3234 19.1451 42.0266 19.8484C42.7299 20.5516 43.125 21.5054 43.125 22.5C43.125 23.4946 42.7299 24.4484 42.0266 25.1516C41.3234 25.8549 40.3696 26.25 39.375 26.25H39.2062C38.6029 26.2524 38.0134 26.4312 37.5104 26.7643C37.0073 27.0975 36.6127 27.5704 36.375 28.125V28.125Z"
      stroke="#EFEFEF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ExitIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M45 15L15 45"
      stroke="#F5FAFF"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 15L45 45"
      stroke="#F5FAFF"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FacebookIcon = props => {
  return (
    <svg
      width={props.length}
      height={props.length}
      aria-hidden="true"
      data-prefix="fab"
      data-icon="facebook"
      class="svg-inline--fa fa-facebook fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"
      />
    </svg>
  );
};

const GlobeIcon = props => {
  return (
    <svg
      width={props.length}
      height={props.length}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="trips"
    >
      <title id="trips">Goes to trips page</title>
      <path
        d="M22.5 41.25C32.8553 41.25 41.25 32.8553 41.25 22.5C41.25 12.1447 32.8553 3.75 22.5 3.75C12.1447 3.75 3.75 12.1447 3.75 22.5C3.75 32.8553 12.1447 41.25 22.5 41.25Z"
        stroke="#EFEFEF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 22.5H41.25"
        stroke="#EFEFEF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 3.75C27.1899 8.88441 29.8552 15.5476 30 22.5C29.8552 29.4524 27.1899 36.1156 22.5 41.25C17.8101 36.1156 15.1448 29.4524 15 22.5C15.1448 15.5476 17.8101 8.88441 22.5 3.75V3.75Z"
        stroke="#EFEFEF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const ShareIcon = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="share"
    >
      <title id="share">Share with others</title>

      <path
        d="M30 13.3333C32.7614 13.3333 35 11.0948 35 8.33333C35 5.5719 32.7614 3.33333 30 3.33333C27.2386 3.33333 25 5.5719 25 8.33333C25 11.0948 27.2386 13.3333 30 13.3333Z"
        stroke="#131313"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 25C12.7614 25 15 22.7614 15 20C15 17.2386 12.7614 15 10 15C7.23858 15 5 17.2386 5 20C5 22.7614 7.23858 25 10 25Z"
        stroke="#131313"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 36.6667C32.7614 36.6667 35 34.4281 35 31.6667C35 28.9052 32.7614 26.6667 30 26.6667C27.2386 26.6667 25 28.9052 25 31.6667C25 34.4281 27.2386 36.6667 30 36.6667Z"
        stroke="#131313"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3164 22.5167L25.6997 29.15"
        stroke="#131313"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.6831 10.85L14.3164 17.4833"
        stroke="#131313"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ArchiveIcon = () => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="archive"
    >
      <title id="archive">Go to archive trips</title>
      <path
        d="M43.75 16.6667V43.75H6.25V16.6667"
        stroke="#131313"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47.9168 6.25H2.0835V16.6667H47.9168V6.25Z"
        stroke="#131313"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.8335 25H29.1668"
        stroke="#131313"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const HamburgerIcon = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="mobile-nav-menu"
    >
      <title id="mobile-nav-menu">Mobile Navigation Menu</title>
      <path
        d="M7.5 30H52.5"
        stroke="#F5FAFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 15H52.5"
        stroke="#F5FAFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 45H52.5"
        stroke="#F5FAFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const RedExclamationIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="7" width="10" height="33" fill="#D10000" />
    <rect x="25" y="42" width="10" height="10" rx="5" fill="#D10000" />
    <rect x="1.5" y="1.5" width="57" height="57" rx="28.5" stroke="#D10000" strokeWidth="3" />
  </svg>
);

const YellowExclamationIcon = () => (
  <svg width="10" height="47" viewBox="0 0 10 47" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="10" height="33" fill="#FFC700" />
    <rect y="37" width="10" height="10" rx="5" fill="#FFC700" />
  </svg>
);

const GreenCheckIcon = () => (
  <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 3L8 14L3 9"
      stroke="#52FF00"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
