function parse(code) {
    let fineCode = code.replace(/^"|"|{|}|;/g, "")
    fineCode = fineCode.replace("\t", "")
    const codeLines = fineCode.split("\n");

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
            console.log(index);
            codeLine = codeLines[index];
            tokens = codeLine.split("=");
            if (tokens.length == 1) {
                tokens = tokens[0].split(" ");
                if (tokens[0] == "end") {
                    break;
                }
            }
            if (tokens[0].trim() == jsonFormat.objectTitle + ".title") {
                // tokens[1] = tokens[1].replace(/^"|"/g, "")
                jsonFormat.displayTitle = tokens[1].trim()
                index++
                continue
            }

            if (tokens[0].trim() == jsonFormat.objectTitle + ".add") {
                // tokens[1] = tokens[1].replace(/^"|"|{|}/g, "")

                const values = tokens[1].split(",")

                console.log("This are values");

                console.log(values);


                if (!isNumeric(values[1])) {
                    console.log("Error : Not Number");
                    break;

                }

                let jsonValues = {}

                jsonValues.label = values[0].trim()
                jsonValues.value = values[1].trim()

                if (values.length == 3) {
                    if (!isHexColor(values[2].trim())) {
                        console.log("Error : Not Hex Color");
                        break;
                    }

                    jsonValues.color = values[2].trim()
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