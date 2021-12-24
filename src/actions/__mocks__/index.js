module.exports = {
    ...jest.requireActual(".."),
    __esModule: true,
    // getSecretWord: jest.fn().mockReturnValue(Promise.resolve("party")),
    // update return value for Redux / Context implementation
    getSecretWord: jest.fn().mockReturnValue({ type: "mock" }),
};
