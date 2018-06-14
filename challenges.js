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

    var intStack = [];
    var charStack = [];
    var temp = '';
    var result = '';

    //Adds stuff to both stacks
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ']' && isNaN(parseInt(s[i]))) {
            charStack.push(s[i]);
        } else if (parseInt(s[i])) {
            intStack.push(s[i]);
        } else {
            while (
                charStack.length !== 0 &&
                charStack[charStack.length - 1] !== '['
            ) {
                temp += charStack.pop();
            }

            if (charStack[charStack.length - 1] === '[') {
                charStack.pop();
                charStack.push(temp.repeat(intStack.pop()));
            }

            temp = charStack.pop();

        }
    }
    //reversing the string
    for (let j = temp.length - 1; j >= 0; j--) {
        result += temp[j];
    }
};

decodeString('2[b3[a]]');

/* ------------------- Question III ------------------- */


// changePossibilities(amount,amount): Your quirky boss collects rare, old coins. They found out you're a programmer and asked you to solve something they've been wondering for a long time.

// Write a function that, given an amount of money and an array of coin denominations, computes the number of ways to make the amount of money with coins of the available denominations.

// Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output 4—the number of ways to make 4¢ with those denominations:

// 1¢, 1¢, 1¢, 1¢
// 1¢, 1¢, 2¢
// 1¢, 3¢
// 2¢, 2¢