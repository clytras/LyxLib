export const getFileExtension = filename => {
  const ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}

export const getFilename = path => path.replace(/^.*?([^\\\/]*)$/, '$1');
