
export const getUrlFileExtension = url => {
  if(url === null) {
    return "";
  }
  let index = url.lastIndexOf("/");
  if(index !== -1) {
    url = url.substring(index + 1); // Keep path without its segments
  }
  index = url.indexOf("?");
  if(index !== -1) {
    url = url.substring(0, index); // Remove query
  }
  index = url.indexOf("#");
  if(index !== -1) {
    url = url.substring(0, index); // Remove fragment
  }
  index = url.lastIndexOf(".");
  return index !== -1
    ? url.substring(index + 1) // Only keep file extension
    : ""; // No extension found
}

export const appendProtocol = (uri, append = 'http:') => {
  let result = uri;
  if(uri.substr(0, 4) != 'tel:' &&
    uri.substr(0, 7) != 'mailto:' &&
    uri.substr(0, 5) != 'ftp:' &&
    uri.substr(0, 5) != 'fax:' &&
    uri.substr(0, 5) != 'http:' &&
    uri.substr(0, 6) != 'https:' &&
    uri.substr(0, append.length) != append &&
    !/:\/\//.test(uri))
  {
    if(uri.substr(0, 2) != '//') {
      result = `//${result}`;
    }
    result =  `${append}${result}`;
  }
  return result;
}
