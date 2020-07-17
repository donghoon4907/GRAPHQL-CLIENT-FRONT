export default function ({ name }) {
  let params = decodeURIComponent(location.search).substr(
    location.search.indexOf("?") + 1
  );
  let sval = false;
  params = params.split("&");
  for (let i = 0; i < params.length; i++) {
    const temp = params[i].split("=");
    if ([temp[0]] == name) {
      sval = temp[1];
    }
  }
  return sval;
}
