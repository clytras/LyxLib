
// https://github.com/MauriceButler/cryptr
const crypto = require('crypto');

const defaultAlgorithm = 'aes-256-gcm';
const defaultEncoding = 'base64';
const ivLength = 16;
const saltLength = 64;
const tagLength = 16;
const tagPosition = saltLength + ivLength;
const encryptedPosition = tagPosition + tagLength;

class Cryptr {
  options = {};
  secret;

  constructor(secret, options) {
    this.options = Object.assign({
      algorithm: defaultAlgorithm,
      encoding: defaultEncoding
    }, options);

    if(!(typeof secret === 'string' || secret instanceof Buffer) || secret.length === 0) {
      throw new Error('Cryptr: secret must be a non empty string or Buffer');
    }

    this.secret = secret
  }

  getKey(salt) {
    return crypto.pbkdf2Sync(this.secret, salt, 100000, 32, 'sha512');
  }

  encrypt(value) {
    if (value === undefined || value === null) {
      throw new Error('value must not be null or undefined');
    }

    const iv = crypto.randomBytes(ivLength);
    const salt = crypto.randomBytes(saltLength);
    const key = this.getKey(salt);
    const cipher = crypto.createCipheriv(this.options.algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    const result = Buffer.concat([salt, iv, tag, encrypted]);

    if (this.options.encoding) {
      return result.toString(this.options.encoding);
    }

    return result;
  }

  decrypt(value) {
    if (value === undefined || value === null) {
      throw new Error('value must not be null or undefined');
    }

    const stringValue = this.options.encoding
      ? Buffer.from(String(value), this.options.encoding)
      : value;
    const salt = stringValue.slice(0, saltLength);
    const iv = stringValue.slice(saltLength, tagPosition);
    const tag = stringValue.slice(tagPosition, encryptedPosition);
    const encrypted = stringValue.slice(encryptedPosition);
    const key = this.getKey(salt);
    const decipher = crypto.createDecipheriv(this.options.algorithm, key, iv);

    decipher.setAuthTag(tag);

    return decipher.update(encrypted) + decipher.final('utf8');
  }
}

// function Cryptr(secret, options) {
//   const opts = Object.assign({
//     algorithm: defaultAlgorithm,
//     encoding: defaultEncoding
//   }, options);

//   if(!(typeof secret === 'string' || secret instanceof Buffer) || secret.length === 0) {
//     throw new Error('Cryptr: secret must be a non empty string or Buffer');
//   }

//   function getKey(salt) {
//     return crypto.pbkdf2Sync(secret, salt, 100000, 32, 'sha512');
//   }

//   this.encrypt = function encrypt(value) {
//     if(value === undefined || value === null) {
//       throw new Error('value must not be null or undefined');
//     }

//     const iv = crypto.randomBytes(ivLength);
//     const salt = crypto.randomBytes(saltLength);

//     const key = getKey(salt);

//     const cipher = crypto.createCipheriv(opts.algorithm, key, iv);
//     const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);

//     const tag = cipher.getAuthTag();

//     const result = Buffer.concat([salt, iv, tag, encrypted]);

//     if(opts.encoding) {
//       return result.toString(opts.encoding);
//     }

//     return result;
//   }

//   this.decrypt = function decrypt(value) {
//     if(value === undefined || value === null) {
//       throw new Error('value must not be null or undefined');
//     }

//     const stringValue = opts.encoding ? Buffer.from(String(value), opts.encoding) : value;

//     const salt = stringValue.slice(0, saltLength);
//     const iv = stringValue.slice(saltLength, tagPosition);
//     const tag = stringValue.slice(tagPosition, encryptedPosition);
//     const encrypted = stringValue.slice(encryptedPosition);

//     const key = getKey(salt);

//     const decipher = crypto.createDecipheriv(opts.algorithm, key, iv);

//     decipher.setAuthTag(tag);

//     return decipher.update(encrypted) + decipher.final('utf8');
//   }
// }

module.exports = Cryptr;
