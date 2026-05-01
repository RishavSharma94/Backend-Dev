describe("Bank Security Tests", () => {

    test("Reject invalid amount", () => {
        // amount < 0 should fail
    });

    test("Require 2FA for large transactions", () => {
        // >1000 should ask OTP
    });

    test("Prevent unauthorized history access", () => {
        // userId mismatch should fail
    });

});