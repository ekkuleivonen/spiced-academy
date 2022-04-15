const { getAlbumNames } = require("./albums");
const spotify = require("./spotify");

jest.mock("./spotify");

//mock the data
spotify.search.mockResolvedValue({
    albums: {
        items: [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }],
    },
});

test("album names are in alphabetical order", () => {
    return getAlbumNames("meat loaf").then((albumNames) => {
        expect(albumNames).toEqual(albumNames.slice().sort());
    });
});
