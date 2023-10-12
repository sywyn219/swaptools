
// @ts-ignore
import moment from "moment";


export const addressZero = '0x0000000000000000000000000000000000000000';

export function checkAndClearArray(array, threshold, newElements) {
  const newArray = [newElements, ...array]; // 将新元素添加到数组末尾
  if (array.length > threshold) {
    return array.slice(0, -1);
  }
  return newArray;
}

export function mergeArrays(arr1: any[], arr2: any[]): any[] {
  const set = new Set(arr1.map((item) => item.toLowerCase()));
  const uniqueElements = arr2.filter((item) => !set.has(item.toLowerCase()));
  return arr1.concat(uniqueElements);
}


export function removeEmptyStrings(arr: string[]): string[] {
  const result = arr.filter((item) => item !== "" && item.length > 0 && !item.includes("empty"));
  return result;
}

export function parseString(str) {
  return str.split('\n');
}

export function getTimes() {
  // 使用 Moment.js 获取当前时间
  const now = moment();
  // 格式化当前时间
  return now.format('YYYY-MM-DD HH:mm:ss.SSS');
}


export function isInteger(str: string): boolean {
  return Number.isInteger(Number(str));
}
export function isNumber(str: string): boolean {
  return /^\d+(\.\d+)?$/.test(str);
}

export function compareStrings(str1: string, str2: string): number {
  const num1 = Number(str1);
  const num2 = Number(str2);
  if (num1 < num2) {
    return -1;
  } else if (num1 > num2) {
    return 1;
  } else {
    return 0;
  }
}

export function getRandElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function getRandPath(arr)  {
  const randomIndex = getRandElement(arr)

  const otherIndex = randomIndex === 0 ? 1 : 0;

// 交换元素位置
  const temp = arr[otherIndex];
  arr[otherIndex] = arr[randomIndex];
  arr[randomIndex] = temp;

  return arr
}

export function getRandBuySell() {
  // 生成一个随机数
  const randomNum = Math.random();

// 判断随机数的范围并获取 0 或者 1
  let result;
  if (randomNum < 0.5) {
    return 0;
  } else {
    return 1;
  }
}

export function getRandomDecimalInRange(minStr, maxStr) {
  const min = parseFloat(minStr);
  const max = parseFloat(maxStr);

  // 生成 0 到 1 之间的随机小数
  const randomDecimal = Math.random();

  // 计算在给定范围内的随机数
  const result = min + randomDecimal * (max - min);

  return result.toFixed(4);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
}
