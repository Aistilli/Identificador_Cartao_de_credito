# Identificador_Cartao_de_credito
Credit card validation system that automatically detects card brands (bandeiras) using regex patterns and validates card numbers using the Luhn algorithm.

## 📋 Requirements

- **Node.js** (version 12 or higher)
- No external dependencies required

## 🚀 How to Run

```bash
# Navigate to project directory
cd Your_directory

# Run the code
node src/index.js
```

## 🎯 What It Does

This application provides three main functions for credit card validation:

### 1. **discoverBandeira(cardNumber)**
Automatically identifies the card brand from the card number using regex patterns.

**Supported Brands:**
- **Visa** - Starts with 4
- **MasterCard** - Starts with 51-55 or 2221-2720
- **Elo** - Starts with 4011, 4312, 4389, 4514, 4576, 5041, 5066, 5067, 509x, 6277, 6362, 6363, 6550
- **American Express** - Starts with 34 or 37
- **Discover** - Starts with 6011, 65, or 644-649
- **Hipercard** - Starts with 6062
- **Diners Club** - Starts with 300-305, 36, or 38
- **JCB** - Starts with 3528-3589
- **EnRoute** - Starts with 2014 or 2149
- **Voyager** - Starts with 8699
- **Aura** - Starts with 50, 56-58, or 6

### 2. **luhnCheck(cardNumber)**
Validates the credit card number using the industry-standard Luhn algorithm (checksum validation).

### 3. **validateCreditCard(cardNumber)**
Complete validation that:
- Detects the card brand automatically
- Validates the number format
- Checks against the Luhn algorithm
- Returns an object with `isValid`, `bandeira`, and `message` properties

## 💡 Usage Examples

```javascript
// Import the functions
const { validateCreditCard, discoverBandeira, luhnCheck } = require('./src/index.js');

// Discover card brand
discoverBandeira('4532015112830366'); // Returns: "Visa"
discoverBandeira('5425233010103442'); // Returns: "MasterCard"

// Validate complete card
validateCreditCard('4532015112830366');
// Returns: { isValid: true, bandeira: "Visa", message: "Valid Visa card" }

// Check Luhn algorithm only
luhnCheck('4532015112830366'); // Returns: true
```

## 📦 Module Export

All functions are exported and can be imported in other JavaScript files:

```javascript
const { validateCreditCard, discoverBandeira, luhnCheck } = require('./src/index.js');
```

## 🔍 Features

- ✅ Automatic card brand detection using regex patterns
- ✅ Luhn algorithm validation
- ✅ Handles card numbers with spaces or hyphens
- ✅ Supports 11+ major card brands
- ✅ No external dependencies
- ✅ Clear error messages and validation results