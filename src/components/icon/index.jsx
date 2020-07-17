import React from "react";

export const Thumbnail = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24">
    <path d="M19.5 12c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-18 0l4-5.96 2.48 1.96 2.52-4 1.853 2.964c-1.271 1.303-1.977 3.089-1.827 5.036h-9.026zm10.82 4h-14.82v-18h22v7.501c-.623-.261-1.297-.422-2-.476v-5.025h-18v14h11.502c.312.749.765 1.424 1.318 2zm-9.32-11c-.828 0-1.5-.671-1.5-1.5 0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z" />
  </svg>
);

export const HeartEmpty = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24">
    <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" />
  </svg>
);

export const HeartFull = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    viewBox="0 0 24 24"
    fill="#ED4956"
  >
    <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
  </svg>
);

export const Filter = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24">
    <path d="M1 0h22l-9 15.094v8.906l-4-3v-5.906z" />
  </svg>
);

export const Comment = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24">
    <path d="M0 1v16.981h4v5.019l7-5.019h13v-16.981h-24zm13 12h-8v-1h8v1zm6-3h-14v-1h14v1zm0-3h-14v-1h14v1z" />
  </svg>
);

export const More = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24">
    <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
  </svg>
);

export const Upload = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24">
    <path d="M10 9h-6l8-9 8 9h-6v11h-4v-11zm11 11v2h-18v-2h-2v4h22v-4h-2z" />
  </svg>
);

export const Download = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24">
    <path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z" />
  </svg>
);

export const Accept = ({ style, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    onClick={onClick}
    viewBox="0 0 24 24"
  >
    <path d="M19.523 5.175c-1.397 0-2.335-.494-3.888-1.311-.852-.446-1.536-.864-2.518-.864-1.275 0-1.747.658-2.552 1.564-2.052-1.593-3.513-.907-4.808-.293-.757.358-1.539.729-2.587.729h-3.17v7.91c1.073.102 2.001.169 3.287.464-.789 1.431.057 3.157 1.634 3.422.324.675.971 1.159 1.718 1.286.312.653.942 1.151 1.709 1.279.544 1.147 1.962 1.664 3.188 1.07.434.358.985.569 1.567.569.892 0 1.737-.483 2.145-1.337.748-.157 1.358-.648 1.664-1.296.708-.147 1.324-.604 1.648-1.286 1.386-.282 2.292-1.727 1.688-3.178 1.096-.54 2.221-.76 3.752-1.1v-7.866c-.961.059-3.507.218-4.477.238zm-14.719 9.985c-.377-.284-.424-.828-.103-1.21l.782-.959c.321-.384.887-.465 1.265-.179.38.285.424.826.104 1.211l-.782.956c-.321.385-.887.464-1.266.181zm1.714 1.282c-.378-.286-.433-.816-.111-1.2l.79-.969c.321-.383.887-.464 1.265-.181.378.285.425.828.103 1.21l-.79.969c-.321.385-.877.457-1.257.171zm1.714 1.284c-.378-.285-.426-.828-.103-1.213l.78-.956c.321-.384.887-.467 1.266-.182.377.286.424.827.103 1.211l-.781.958c-.321.385-.889.465-1.265.182zm3.76.14l-.783.963c-.323.386-.888.465-1.266.181-.378-.285-.424-.826-.104-1.21l.785-.964c.322-.382.888-.464 1.265-.178.38.282.426.825.103 1.208zm1.642 1.422c-.154.119-.341.177-.531.177-.137 0-.273-.035-.401-.095l.454-.559c.199-.235.347-.513.44-.81l.124.11c.32.367.279.891-.086 1.177zm4.968-3.87c-.368.284-.924.215-1.24-.146l-2.496-2.141c-.207-.177-.471.136-.266.31l2.433 2.089c.319.366.278.893-.088 1.175-.369.287-.926.219-1.242-.146l-1.915-1.678c-.204-.179-.474.13-.271.309l1.868 1.642c.319.365.272.88-.097 1.166-.364.282-.911.231-1.231-.137l-.365-.325c.133-1.26-.747-2.32-1.924-2.516-.326-.684-.975-1.157-1.712-1.28-.322-.678-.967-1.157-1.712-1.282-.647-1.359-2.428-1.748-3.648-.777-.801-.24-1.688-.437-2.696-.573v-4.108h1.17c1.498 0 2.577-.511 3.443-.922 1.087-.515 1.609-.754 2.581-.046-.64.636-1.294 1.196-1.967 1.589-.589.343-.852.998-.672 1.668.236.874 1.262 1.758 2.767 1.758 1.981 0 2.935-1.196 3.935-1.766 1.493 1.436 3.93 3.644 5.47 5.026.266.362.222.842-.125 1.111zm3.398-4.217c-.912.215-1.801.469-2.707.926-1.085-.979-3.529-3.193-4.399-4.063-.992-.991-1.994-1.086-3.093-.197-.79.636-2.018 1.447-2.971 1.099 1.365-.957 2.592-2.35 3.692-3.596.313-.354.527-.592 1.502-.09l.678.355c1.725.908 3.07 1.627 5.132 1.535.62-.025 1.487-.071 2.166-.11v4.141z" />
  </svg>
);

export const Permit = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24">
    <path d="M11.329 19.6c-.185.252-.47.385-.759.385-.194 0-.389-.06-.558-.183-.419-.309-.509-.896-.202-1.315l1.077-1.456c.308-.417.896-.508 1.315-.199.421.306.511.895.201 1.313l-1.074 1.455zm-.825-2.839c.308-.418.217-1.007-.201-1.316-.421-.308-1.008-.216-1.317.203l-1.073 1.449c-.309.419-.217 1.009.202 1.317.417.307 1.007.218 1.315-.202l1.074-1.451zm-1.9-1.388c.309-.417.217-1.007-.203-1.315-.418-.307-1.007-.216-1.314.202l-1.083 1.461c-.308.419-.209.995.209 1.304.421.308 1 .229 1.308-.19l1.083-1.462zm-1.898-1.386c.308-.419.219-1.007-.203-1.315-.419-.309-1.007-.218-1.315.201l-1.075 1.451c-.308.418-.217 1.008.202 1.315.419.307 1.008.218 1.315-.202l1.076-1.45zm17.294-8.438s-1.555.301-2.667.479c-2.146.344-4.144-.416-6.361-1.562-.445-.229-.957-.466-1.458-.466-.461 0-.913.209-1.292.639-1.366 1.547-2.16 2.915-3.785 3.864-.801.468.14 1.934 1.86 1.331.878-.308 1.736-.895 2.706-1.677.762-.615 1.22-.524 1.879.135 1.238 1.238 5.404 5.351 5.404 5.351 1.317-.812 2.422-1.312 3.713-1.792v-6.302zm-10.524 12.662c-.158.459-.618 1.001-.953 1.455.297.235.608.334.882.334.717 0 1.188-.671.542-1.318l-.471-.471zm6.506-3.463c-1.07-1.055-4.732-4.667-5.803-5.713-.165-.161-.421-.18-.608-.044-.639.464-2.082 1.485-2.944 1.788-1.685.59-3.115-.222-3.422-1.359-.192-.712.093-1.411.727-1.781 1.008-.589 1.657-1.375 2.456-2.363-.695-.539-1.35-.732-1.991-.732-1.706 0-3.317 1.366-5.336 1.231-1.373-.09-3.061-.403-3.061-.403v6.333c1.476.321 2.455.464 3.92 1.199l.462-.624c.364-.496.949-.792 1.564-.792.87 0 1.622.578 1.861 1.388.951 0 1.667.602 1.898 1.387.826-.031 1.641.519 1.897 1.385 1.171 0 2.017.92 1.981 2.007l1.168 1.168c.367.368.963.367 1.331 0 .368-.368.368-.964 0-1.332l-1.686-1.687c-.22-.22.113-.553.333-.333l2.032 2.033c.368.368.963.368 1.331 0s.368-.963 0-1.331l-2.501-2.502c-.221-.218.113-.553.333-.333l2.7 2.701c.368.368.963.368 1.331 0 .358-.356.361-.922.027-1.291z" />
  </svg>
);

export const Private = ({ style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-5 7.723v2.277h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723zm-5-7.723v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v4h-8z" />
  </svg>
);

export const Room = ({ style, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    onClick={onClick}
    viewBox="0 0 24 24"
  >
    <path d="M7 11c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5-8v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981z" />
  </svg>
);

export const Bell = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24">
    <path d="M15 21c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm.137-17.055c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.668 2.709-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.193-10.598-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm-6.451 16c1.189-1.667 1.605-3.891 1.964-5.815.447-2.39.869-4.648 2.354-5.509 1.38-.801 2.956-.76 4.267 0 1.485.861 1.907 3.119 2.354 5.509.359 1.924.775 4.148 1.964 5.815h-12.903z" />
  </svg>
);

export const Next = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24">
    <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
  </svg>
);
