function generateUniqueEmail() {
    return `testuser_${Date.now()}@example.com`;
}

module.exports = {
    generateUniqueEmail
};