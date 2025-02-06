export const BANK_FIELD_LIMITS = {
  BR: {
    branch: 4, // Agência typically has 4 digits
    accountNumber: 8, // Conta typically has 8 digits
  },
  US: {
    routingNumber: 9, // ABA routing number is 9 digits
    accountNumber: 12, // US account numbers vary, but typically max 12 digits
  },
  UK: {
    sortCode: 6, // UK sort code is 6 digits
    accountNumber: 8, // UK account number is 8 digits
  },
  AU: {
    bsb: 6, // BSB is 6 digits
    accountNumber: 9, // Australian account numbers are typically 9 digits
  },
  IN: {
    ifsc: 11, // IFSC code is 11 characters
    accountNumber: 16, // Indian account numbers can be up to 16 digits
  },
}

export const BANK_FIELD_PATTERNS = {
  BR: {
    branch: /^\d{0,4}$/,
    accountNumber: /^\d{0,8}$/,
  },
  US: {
    routingNumber: /^\d{0,9}$/,
    accountNumber: /^\d{0,12}$/,
  },
  UK: {
    sortCode: /^\d{0,6}$/,
    accountNumber: /^\d{0,8}$/,
  },
  AU: {
    bsb: /^\d{0,6}$/,
    accountNumber: /^\d{0,9}$/,
  },
  IN: {
    ifsc: /^[A-Z0-9]{0,11}$/,
    accountNumber: /^\d{0,16}$/,
  },
}

