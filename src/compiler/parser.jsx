function parse(code) {
    const codeLines = code.split("\n");
    console.log(codeLines);

    let index = 0
    let codeLine = codeLines[index]
    let tokens = codeLine.split(" ");

    const jsonFormat = {}

    jsonFormat.data = []

    let redefinedTokens = []
    tokens.forEach(token => {
        if (token != "") redefinedTokens.push(token)
    });

    if (tokens[0] == "start") {
        jsonFormat.type = redefinedTokens[1]
        jsonFormat.objectTitle = redefinedTokens[2]
        index++;

        while (tokens[0] != "end") {
            codeLine = codeLines[index];
            tokens = codeLine.split("=");
            if (tokens[0].trim() == jsonFormat.objectTitle + ".title") {
                tokens[1].replace(/^"|"/g, "")
                jsonFormat.displayTitle = tokens[1].trim()
                continue
            }

            if (tokens[0].trim == jsonFormat.objectTitle + ".add") {
                tokens[1].replace(/^"|"|{|}/g, "")

                const values = tokens[1].split(",")

                if (!isNumeric(values[1])) {
                    console.log("Error : Not Number");
                }

                let jsonValues = {}

                jsonValues.label = values[0]
                jsonValues.value = values[1]

                if (values.length == 3) {
                    if (!isHexColor(values[2])) {
                        console.log("Error : Not Hex Color");
                        continue
                    }

                    jsonValues.color = values[2]
                }
                jsonFormat.data.push(jsonValues);
            }
            index++;
        }
    }

    return jsonFormat;
}

// Utility

function isNumeric(str) {
    return !isNaN(str);
}

function isHexColor(str) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);
}

export default parse;