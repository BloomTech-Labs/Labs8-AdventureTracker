const width = 40;
const height = 60;
const WHITE = '#f4f4f4';
const GREY_PIN = `data:image/svg+xml;utf-8, \
<svg width="${width}" height="${height}" viewBox="0 0 101 152" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.0159 147.319L12.4882 97.3168C10.6064 94.6683 12.5 91 15.7489 91H85.4245C88.6396 91 90.5409 94.6008 88.7277 97.2558L54.5798 147.258C53.0094 149.558 49.6287 149.589 48.0159 147.319Z" fill="#969696" stroke="#2B2B2B"/>
<path d="M100.5 50.5V90C100.5 93.0376 98.0376 95.5 95 95.5H6C2.96243 95.5 0.5 93.0376 0.5 90V50.5C0.5 22.8858 22.8858 0.5 50.5 0.5C78.1142 0.5 100.5 22.8858 100.5 50.5Z" fill="#969696" stroke="#131313"/>
<path d="M10 50C10 28.4609 27.4609 11 49 11H52C73.5391 11 91 28.4609 91 50V50C91 71.5391 73.5391 89 52 89H49C27.4609 89 10 71.5391 10 50V50Z" fill="${WHITE}"/>
</svg>`;

const CHECKMARK_ICON = `data:image/svg+xml;utf-8, \
<svg width="${width}" height="${height}" viewBox="0 0 101 152" fill="none" xmlns="http://www.w3.org/2000/svg">\
<path d="M48.0159 147.319L12.4882 97.3168C10.6064 94.6683 12.5 91 15.7489 91H85.4245C88.6396 91 90.5409 94.6008 88.7277 97.2558L54.5798 147.258C53.0094 149.558 49.6287 149.589 48.0159 147.319Z" fill="#34A100" stroke="#2B2B2B"/>\
<path d="M100.5 50.5V90C100.5 93.0376 98.0376 95.5 95 95.5H6C2.96243 95.5 0.5 93.0376 0.5 90V50.5C0.5 22.8858 22.8858 0.5 50.5 0.5C78.1142 0.5 100.5 22.8858 100.5 50.5Z" fill="#34A100" stroke="#131313"/>\
<path d="M10 50C10 28.4609 27.4609 11 49 11H52C73.5391 11 91 28.4609 91 50V50C91 71.5391 73.5391 89 52 89H49C27.4609 89 10 71.5391 10 50V50Z" fill="${WHITE}"/>\
<rect x="22" y="64.484" width="4.99952" height="25.8915" transform="rotate(-51.5527 22 64.484)" fill="#34A100"/>\
<rect x="76.5142" y="29" width="4.99952" height="61.0747" transform="rotate(38.3202 76.5142 29)" fill="#34A100"/>\
</svg>`;

const ORANGE_EXCLAMATION = `data:image/svg+xml;utf-8, \
<svg width="${width}" height="${height}" viewBox="0 0 101 152" fill="none" xmlns="http://www.w3.org/2000/svg">\
<path d="M48.0159 147.319L12.4882 97.3168C10.6064 94.6683 12.5 91 15.7489 91H85.4245C88.6396 91 90.5409 94.6008 88.7277 97.2558L54.5798 147.258C53.0094 149.558 49.6287 149.589 48.0159 147.319Z" fill="#EA6200" stroke="#2B2B2B"/>\
<path d="M0.5 50.5C0.5 22.8858 22.8858 0.5 50.5 0.5C78.1142 0.5 100.5 22.8858 100.5 50.5V86C100.5 91.2467 96.2467 95.5 91 95.5H10C4.75329 95.5 0.5 91.2467 0.5 86V50.5Z" fill="#EA6200" stroke="#131313"/>\
<path d="M10 50C10 28.4609 27.4609 11 49 11H52C73.5391 11 91 28.4609 91 50C91 71.5391 73.5391 89 52 89H49C27.4609 89 10 71.5391 10 50Z" fill="${WHITE}"/>\
<rect x="46" y="23" width="10" height="42" fill="#EA6200"/>\
<rect x="46" y="81" width="10" height="10" transform="rotate(-90 46 81)" fill="#EA6200"/>\
</svg>`;
const RED_EXCLAMATION = `
data:image/svg+xml;utf-8,
<svg width="${width}" height="${height}" viewBox="0 0 101 154" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M51.3416 152L8 91H93L51.3416 152Z" fill="#C20000" stroke="#2B2B2B" stroke-width="2"/>
<path d="M1 1H100V95H1V1Z" fill="#C20000" stroke="#131313" stroke-width="2"/>
<path d="M10 50C10 28.4609 27.4609 11 49 11H52C73.5391 11 91 28.4609 91 50C91 71.5391 73.5391 89 52 89H49C27.4609 89 10 71.5391 10 50Z" fill="${WHITE}"/>
<g filter="url(#filter0_d)">
<rect x="46" y="23" width="10" height="42" fill="#C20000"/>
</g>
<g filter="url(#filter1_d)">
<rect x="46" y="81" width="10" height="10" transform="rotate(-90 46 81)" fill="#C20000"/>
</g>
<defs>
<filter id="filter0_d" x="42" y="23" width="18" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter1_d" x="42" y="71" width="18" height="18" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>
`;
export { GREY_PIN, CHECKMARK_ICON, ORANGE_EXCLAMATION, RED_EXCLAMATION };
