const SpendingType = {
    MoneyIn: 0, // Tiền vào
    MoneyOut: 1, // Tiền ra
    TransferWallet: 2, // Chuyển ví
    Borrow: 3, // Vay
    Lending: 4, // Cho vay
    DebtCollection: 5, // Thu nợ,
    RepaymentOfDebt: 6, // Trả nợ
};

const LoanActionType = {
    Borrow: 0, // Vay
    Lending: 1, // Cho vay
    DebtCollection: 2, // Thu nợ,
    RepaymentOfDebt: 3, // Trả nợ
};

const iconLink = {};

module.exports = {
    SpendingType,
    LoanActionType,
};
