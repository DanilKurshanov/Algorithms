
// 3[a]2[bc] --> aaabcbc
// 2[a2[b]]  --> abbabb


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function decodeString(str) {
    const mapIndex = new Map();
    const stack = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '[') {
            stack.push(i)
        } else if (str[i] === ']') {
            mapIndex.set(stack.pop(), i);
        }
    }
    return decode(str, 0, str.length - 1, mapIndex)
}

const decode = function (str, leftBr, rightBr, brackets) {
    let k = 0
    let answer = ''

    for (let i = leftBr; i <= rightBr; i++) {
        if (isLetter(str[i])) {
            answer += str[i]
        } else if (Number.isInteger(+str[i])) {
            k = +str[i]
        } else if (str[i] === '[') {
            let rb = brackets.get(i)
            answer += decode(str, i + 1, rb - 1, brackets).repeat(k)
            k = 0
            i = rb
        }
    }
    return answer
}


console.log(decodeString('3[a]2[bc]'))