/* ------------------- Question I ------------------- */


// sortByStrings(s,t): Sort the letters in the string s by the order they occur in the string t. You can assume t will not have repetitive characters. For s = "weather" and t = "therapyw", the output should be sortByString(s, t) = "theeraw". For s = "good" and t = "odg", the output should be sortByString(s, t) = "oodg".

const sortByString = (s, t) => {
    var freq = {};
    var newString = '';
    for (let i = 0; i < s.length; i++) {
        var character = s[i];
        if (freq[character]) {
            freq[character]++;
        } else {
            freq[character] = 1;
        }
    }

    for (let i = 0; i < t.length; i++) {
        newString += t[i].repeat(freq[t[i]]);
    }
    return newString;
};

sortByString('weather', 'therapyw');

/* ------------------- Question II ------------------- */

// decodeString(s): Given an encoded string, return its corresponding decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is repeated exactly k times. Note: k is guaranteed to be a positive integer.

// For s = "4[ab]", the output should be decodeString(s) = "abababab"
// For s = "2[b3[a]]", the output should be decodeString(s) = "baaabaaa"

const decodeString = s => {
    const stack = [];
    let temp = ''

    for (let i = 0; i < s.length; i++) {
        // if a number
        if (!isNaN(s[i])) {
            if (isNaN(temp)) {
                stack.push(temp);
                temp = '';
            }
            temp += s[i]
        } else if (s[i] === '[') {
            if (temp) {
                stack.push(temp)
                temp = ''
            }
        } else if (s[i] === ']') {
            if (temp) {
                stack.push(temp)
                temp = ''
            }
            const str = stack.pop()
            const num = stack.pop()
            if (!isNaN(num)) {
                stack.push(multiplyString(str, num))
            } else {
                stack.push(num + str)
            }
        } else {
            if (!isNaN(temp) && temp) {
                stack.push(temp)
                temp = ''
            }
            temp += s[i]
        }
    }
    return formatStack(stack);
}

const multiplyString = (str, num) => {
    let productString = '';
    for (let i = 0; i < num; i++) {
        productString += str;
    }
    return productString;
}

const formatStack = stack => {
    while (stack.length > 1) {
        const lastEl = stack.pop();
        const secondLastEl = stack.pop();

        if (!isNaN(secondLastEl)) {
            stack.push(multiplyString(lastEl, secondLastEl))
        } else {
            stack.push(secondLastEl + lastEl)
        }
    }
    return stack.pop()
}

decodeString('2[b3[a]]');

/* ------------------- Question III ------------------- */


// changePossibilities(amount,amount): Your quirky boss collects rare, old coins. They found out you're a programmer and asked you to solve something they've been wondering for a long time.

// Write a function that, given an amount of money and an array of coin denominations, computes the number of ways to make the amount of money with coins of the available denominations.

// Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output 4—the number of ways to make 4¢ with those denominations:

// 1¢, 1¢, 1¢, 1¢
// 1¢, 1¢, 2¢
// 1¢, 3¢
// 2¢, 2¢

const changePossibilities = (amount, denominations, index) => {
    var coinAmount = 0;
    var ways = 0;
    if (amount === 0) {
        return 1;
    }
    if (index >= denominations.length) {
        return 0;
    }

    while (coinAmount <= amount) {
        var remaining = amount - coinAmount
        ways += changePossibilities(remaining, denominations, index + 1)
        coinAmount += denominations[index]
    }
    return ways
};

changePossibilities(4, [1, 2, 3], 0)