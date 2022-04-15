const { countries, find } = require("./countries");

test("When find is passed an empty string, it returns an empty array", () => {
    const result = find("");
    expect(result).toEqual([]);
});

test("The array that it returns contains no more than four matches", () => {
    const result = find("A");
    expect(result.length).toBeLessThanOrEqual(4);
});

test("The search is case insensitive", () => {
    const result = find("aFgHaNiStAn");
    expect(result[0]).toBe("Afghanistan");
});

test("If there are no matching countries, an empty array is returned", () => {
    const result = find("EkkuLand");
    expect(result).toEqual([]);
});
