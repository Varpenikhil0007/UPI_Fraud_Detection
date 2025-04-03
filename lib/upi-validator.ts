// List of trusted UPI handles from major banks and payment services
export const trustedUpiHandles = new Set([
    "@oksbi", "@okhdfcbank", "@okicici", "@okaxis", "@okkotak", "@paytm",
    "@ybl", "@ibl", "@upi", "@fbl", "@aubank", "@jkb", "@barodampay", "@airtel"
]);

// Sample database of fraudulent UPI IDs
export const fraudulentUpiIds = new Set([
    "abc123@axl", "123yz@abc", "test456@xyz"
]);

// Suspicious sequences that might indicate fraud
const suspiciousSequences = [
    "123", "234", "345", "456", "567", "678", "789", "890",
    "abc", "bcd", "cde", "def", "efg", "fgh", "ghi", "hij", "ijk"
];

// Improved function with bank handle validation
export function validateUpiId(upiId: string): { isValid: boolean; message: string } {
    // Define regex for a valid UPI ID pattern
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;

    // Check if the format is valid
    if (!pattern.test(upiId)) {
        return { isValid: false, message: "❌ Invalid UPI ID format. Looks suspicious!" };
    }

    // Ensure the UPI ID contains exactly one '@'
    if (upiId.split('@').length !== 2) {
        return { isValid: false, message: "❌ Invalid UPI ID format. Too many '@' symbols!" };
    }

    // Extract the user part and the bank handle
    const [userPart, handle] = upiId.split('@');

    // Check if it's in the fraud database
    if (fraudulentUpiIds.has(upiId)) {
        return { isValid: false, message: "⚠️ This UPI ID is reported as fraudulent!" };
    }

    // Check if the bank handle is valid
    if (!trustedUpiHandles.has(`@${handle}`)) {
        return { 
            isValid: false, 
            message: `⚠️ The UPI handle '@${handle}' is not recognized. It may be fraudulent!` 
        };
    }

    // Check for purely numeric UPI IDs
    if (/^\d+$/.test(userPart)) {
        return { isValid: false, message: "⚠️ This UPI ID contains only numbers. It looks suspicious!" };
    }

    // Check for suspicious sequences in the UPI ID
    for (const seq of suspiciousSequences) {
        if (userPart.toLowerCase().includes(seq)) {
            return { 
                isValid: false, 
                message: `⚠️ This UPI ID contains a suspicious sequence '${seq}'. Proceed with caution!` 
            };
        }
    }

    return { isValid: true, message: "✅ UPI ID looks valid!" };
}