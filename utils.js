/**
 * [getParityBit description]
 * @return {[type]} [description]
 */
export function getParityBit(str) {
    let parity = 0
    let reversedCode = str
      .split("")
      .reverse()
      .join("")
    for (let counter = 0; counter < reversedCode.length; counter += 1) {
      parity +=
        parseInt(reversedCode.charAt(counter), 10) *
        Math.pow(3, (counter + 1) % 2)
    }
    return ((10 - (parity % 10)) % 10).toString()
  }
  
  export function codeLength(str) {
    const hex = Number(str.length)
      .toString(16)
      .padStart(2, "0")
    let buff = Buffer.from(hex, "hex")
    return buff.toString()
  }
  
  export function charLength(char) {
    const code = char.charCodeAt(0)
    return code > 0x7f && code <= 0xffff ? 2 : 1 // More than 2bytes count as 2
  }
  
  export function textLength(str) {
    return str.split("").reduce((accLen, char) => {
      return accLen + charLength(char)
    }, 0)
  }
  
  export function textSubstring(str, start, end) {
    let accLen = 0
    return str.split("").reduce((accStr, char) => {
      accLen = accLen + charLength(char)
      return accStr + (accLen > start && (!end || accLen <= end) ? char : "")
    }, "")
  }
  
  export function upperCase(string) {
    return string.toUpperCase()
  }
  
  export function isKey(key, of) {
    return key in of
  }
  