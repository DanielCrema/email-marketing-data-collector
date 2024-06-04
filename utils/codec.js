class codec {
    constructor() {
        // Define character mappings, ensuring uniqueness
        this.charMap = {
            'a': 'f', 'b': 'q', 'c': 'e', 'd': 'w', 'e': '1',
            'f': '7', 'g': 'X', 'h': '3', 'i': 'Z', 'j': 'y',
            'k': 'g', 'l': 'j', 'm': '4', 'n': '6', 'o': 'C',
            'p': 'T', 'q': 'k', 'r': 'S', 's': 'm', 'u': 'L',
            't': 'b', 'u': 'N', 'v': 'M', 'w': 'd', 'x': 'F',
            'y': 'I', 'z': 'A', '0': 's', '1': '2', '2': '9',
            '3': 'h', '4': 'p', '5': 'x', '6': '0', '7': 'U',
            '8': 'G', '9': 'H', '-': 'i', '_': 'l', '@': this.randomAtValue(), '.': this.randomDotValue()
        };

        // Reverse charMap to create decoding map
        this.decodeMap = {};
        for (let key in this.charMap) {
            this.decodeMap[this.charMap[key]] = key;
        }
    }

    // Generate a random unique value for '.'
    randomDotValue() {
        const values = ['R', 'z', '8', 'Y', 'v'];
        return values[Math.floor(Math.random() * values.length)];
    }

    // Generate a random unique value for '@'
    randomAtValue() {
        const values = ['a', 'B', 'c', 'D', '5'];
        return values[Math.floor(Math.random() * values.length)];
    }

    encode(email) {
        let encoded = '';
        for (let char of email) {
            if (this.charMap[char]) {
                encoded += this.charMap[char];
            } else {
                // Handle characters not in the mapping
                encoded += char;
            }
        }
        return encoded;
    }

    decode(encodedEmail) {
        let decoded = '';
        for (let char of encodedEmail) {
            if (this.decodeMap[char]) {
                decoded += this.decodeMap[char];
            } else {
                // Handle characters not in the mapping
                decoded += char;
            }
        }
        return decoded;
    }
}

// Example usage:
const cryptographer = new codec();
const email = "radiomulher@radiomulher.com";
const encodedEmail = cryptographer.encode(email);
console.log(`Email original: ${email}`);
console.log(`Encoded: ${encodedEmail}`);

const decodedEmail = cryptographer.decode(encodedEmail);
console.log(`Decoded: ${decodedEmail}`);

module.exports = codec;