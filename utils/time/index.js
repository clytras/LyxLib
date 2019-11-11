export { default as every } from './every';
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const uts = (date = new Date) => Math.round(date.getTime() / 1000);
export const utsj = (date = new Date) => date.getTime();
export const timeHash = ({ date = new Date, base = 36 } = {}) => date.getTime().toString(base);
