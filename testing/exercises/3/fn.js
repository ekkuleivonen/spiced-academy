module.exports = function fn(input) {
    if (typeof input === "string") {
        //return reversed str
        return input.split("").reverse().join("");
    } else if (Array.isArray(input)) {
        // return any str as reversed, and non str as null
        const newArray = input.map((arrayItem) => {
            if (typeof arrayItem === "string") {
                return arrayItem.split("").reverse().join("");
            } else return null;
        });
        return newArray;
    } else return null;
};
