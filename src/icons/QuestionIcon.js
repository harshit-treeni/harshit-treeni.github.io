export default function QuestionIcon({ color = "white" }) {
  return (
    <svg
      width="28"
      height="32"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.55469 4.66406C1.55469 3.00721 2.89783 1.66406 4.55469 1.66406H23.2026C24.8595 1.66406 26.2026 3.00721 26.2026 4.66406V22.7173C26.2026 24.3742 24.8595 25.7173 23.2026 25.7173H19.7492C18.8889 25.7173 18.0701 26.0866 17.5007 26.7313L14.6386 29.9717C14.2434 30.4191 13.5467 30.4229 13.1467 29.9797L10.1932 26.7073C9.62433 26.0771 8.8151 25.7173 7.96613 25.7173H4.55469C2.89783 25.7173 1.55469 24.3742 1.55469 22.7173V4.66406Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M13.5519 21.4236C14.1396 21.4236 14.616 20.9472 14.616 20.3595C14.616 19.7718 14.1396 19.2954 13.5519 19.2954C12.9642 19.2954 12.4878 19.7718 12.4878 20.3595C12.4878 20.9472 12.9642 21.4236 13.5519 21.4236Z"
        fill={color}
      />
      <path
        d="M13.4815 16.4923V15.4553C15.772 15.4553 17.6295 13.8298 17.6295 11.8258C17.6295 9.82179 15.772 8.19629 13.4815 8.19629C11.191 8.19629 9.3335 9.82179 9.3335 11.8258V12.3443"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
