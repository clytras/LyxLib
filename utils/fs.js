import fs from 'fs';


export function accessAsync(file, {
  exists = true,
  read = false,
  write = false,
  execute = false
} = {}) {
  return new Promise((resolve, reject) => {
    let mode = 0;

    if(exists) mode |= fs.constants.F_OK;
    if(read) mode |= fs.constants.R_OK;
    if(write) mode |= fs.constants.W_OK;
    if(execute) mode |= fs.constants.X_OK;

    if(!mode) mode = fs.constants.F_OK;

    try {
      fs.access(file, mode, err => {
        if(err)
          resolve(false);
        else
          resolve(true);
      });
    } catch(error) {
      reject(error);
    }
  });
}

export function existsAsync(file) {
  return accessAsync(file);
}

export function unlinkAsync(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(file, err => {
      if(err)
        reject(err);
      else
        resolve();
    });
  });
}


export default {
  accessAsync,
  existsAsync,
  unlinkAsync
}
