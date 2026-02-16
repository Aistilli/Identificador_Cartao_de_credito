/**
 * Discovers the card brand (bandeira) from the card number using regex patterns
 * Based on the official card number patterns from the image specifications
 * @param {string} cardNumber - The credit card number (can include spaces or hyphens)
 * @returns {string|null} - The detected card brand or null if not recognized
 */
function discoverBandeira(cardNumber) {
  // Remove spaces and hyphens for pattern matching
  const cleanCardNumber = cardNumber.replace(/\s|-/g, '');

  // Check if card number contains only digits
  if (!/^\d+$/.test(cleanCardNumber)) {
    return null;
  }

  // Regex patterns based on the image table specifications
  const bandeiraPatterns = [
    {
      name: 'Elo',
      // Pode começar com vários intervalos: 4011, 4312, 4389, entre outros
      regex: /^(4011|4312|4389|4514|4576|5041|5066|5067|509\d|6277|6362|6363|6550)/
    },
    {
      name: 'Visa',
      // Começa sempre com o número 4
      regex: /^4/
    },
    {
      name: 'MasterCard',
      // Começa com dígitos entre 51 e 55, ou entre 2221 a 2720
      regex: /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/
    },
    {
      name: 'American Express',
      // Inicia com 34 ou 37
      regex: /^(34|37)/
    },
    {
      name: 'Discover',
      // Começa com 6011, 65, ou com a faixa de 644 a 649
      regex: /^(6011|65|64[4-9])/
    },
    {
      name: 'Hipercard',
      // Geralmente começa com 6062
      regex: /^6062/
    },
    {
        name: 'Diners Club',
        // Começa com 300-305, 36 ou 38
        regex: /^(30[0-5]|36|38)/
    },
    {
        name: 'JCB',
        // Começa com 3528-3589
        regex: /^(352[89]|35[0-8][0-9])/
    },
    {
        name: 'EnRoute',
        // Começa com 2014 ou 2149
        regex: /^(2014|2149)/
    },
    {
        name: 'Voyager',
        // Começa com 8699
        regex: /^8699/
    },
    {
        name: 'Aura',
        // Começa com 50, 56-58, ou 6
        regex: /^(50|5[6-8]|6)/
    }
  ];

  // Test each pattern and return the first match
  // Note: Order matters - Elo must be checked before Visa as some Elo cards start with 4
  for (const { name, regex } of bandeiraPatterns) {
    if (regex.test(cleanCardNumber)) {
      return name;
    }
  }

  return null;
}

/**
 * Validates a credit card number using the Luhn algorithm
 * @param {string} cardNumber - The credit card number
 * @returns {boolean} - True if valid, false otherwise
 */
function luhnCheck(cardNumber) {
  const cleanCardNumber = cardNumber.replace(/\s|-/g, '');
  
  let sum = 0;
  let isEven = false;

  // Loop through values starting from the rightmost digit
  for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanCardNumber[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validates a credit card number by discovering its bandeira and checking Luhn algorithm
 * @param {string} cardNumber - The credit card number (can include spaces or hyphens)
 * @returns {object} - Object with isValid, bandeira, and message properties
 */
function validateCreditCard(cardNumber) {
  const cleanCardNumber = cardNumber.replace(/\s|-/g, '');

  // Check if card number contains only digits
  if (!/^\d+$/.test(cleanCardNumber)) {
    return {
      isValid: false,
      bandeira: null,
      message: 'Card number must contain only digits'
    };
  }

  // Discover the bandeira using regex patterns
  const bandeira = discoverBandeira(cleanCardNumber);

  if (!bandeira) {
    return {
      isValid: false,
      bandeira: null,
      message: 'Unable to identify card brand from the number'
    };
  }

  // Validate using Luhn algorithm
  const passesLuhn = luhnCheck(cleanCardNumber);

  if (!passesLuhn) {
    return {
      isValid: false,
      bandeira: bandeira,
      message: `Detected as ${bandeira}, but failed Luhn validation`
    };
  }

  return {
    isValid: true,
    bandeira: bandeira,
    message: `Valid ${bandeira} card`
  };
}

// Example usage and testing
console.log('5009 0408 2021 1049 ->', discoverBandeira('5009 0408 2021 1049'), validateCreditCard('5009 0408 2021 1049'));

// Export functions for use in other modules
module.exports = { validateCreditCard, discoverBandeira, luhnCheck };
