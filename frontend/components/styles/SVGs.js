import React from 'react';
// Exported Components here because its a very long file
export {
  GlobeIcon,
  ShareIcon,
  ArchiveIcon,
  HamburgerIcon,
  RedExclamationIcon,
  GreenCheckIcon,
  YellowExclamationIcon,
  ExitIcon
};

const ExitIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M45 15L15 45"
      stroke="#F5FAFF"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15 15L45 45"
      stroke="#F5FAFF"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const GlobeIcon = props => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="trips"
    >
      <title id="trips">Goes to trips page</title>
      <path
        d="M22.5 41.25C32.8553 41.25 41.25 32.8553 41.25 22.5C41.25 12.1447 32.8553 3.75 22.5 3.75C12.1447 3.75 3.75 12.1447 3.75 22.5C3.75 32.8553 12.1447 41.25 22.5 41.25Z"
        stroke="#EFEFEF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.75 22.5H41.25"
        stroke="#EFEFEF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.5 3.75C27.1899 8.88441 29.8552 15.5476 30 22.5C29.8552 29.4524 27.1899 36.1156 22.5 41.25C17.8101 36.1156 15.1448 29.4524 15 22.5C15.1448 15.5476 17.8101 8.88441 22.5 3.75V3.75Z"
        stroke="#EFEFEF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 25C12.7614 25 15 22.7614 15 20C15 17.2386 12.7614 15 10 15C7.23858 15 5 17.2386 5 20C5 22.7614 7.23858 25 10 25Z"
        stroke="#131313"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30 36.6667C32.7614 36.6667 35 34.4281 35 31.6667C35 28.9052 32.7614 26.6667 30 26.6667C27.2386 26.6667 25 28.9052 25 31.6667C25 34.4281 27.2386 36.6667 30 36.6667Z"
        stroke="#131313"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.3164 22.5167L25.6997 29.15"
        stroke="#131313"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M25.6831 10.85L14.3164 17.4833"
        stroke="#131313"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M47.9168 6.25H2.0835V16.6667H47.9168V6.25Z"
        stroke="#131313"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.8335 25H29.1668"
        stroke="#131313"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
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
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 15H52.5"
        stroke="#F5FAFF"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 45H52.5"
        stroke="#F5FAFF"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const RedExclamationIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="7" width="10" height="33" fill="#D10000" />
    <rect x="25" y="42" width="10" height="10" rx="5" fill="#D10000" />
    <rect x="1.5" y="1.5" width="57" height="57" rx="28.5" stroke="#D10000" stroke-width="3" />
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
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
