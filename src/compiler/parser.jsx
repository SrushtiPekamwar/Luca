function parse(code) {
    let fineCode = code.replace(/^"|"|{|}|;/g, "")
    fineCode = fineCode.replace("\t", "")
    const codeLines = fineCode.split("\n");

    const predefinedObjectTitles = ["add", "title"]

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
                } else {
                    throw Error("Error at line " + (index + 1))
                }
            } else if (tokens[0].trim() == jsonFormat.objectTitle + ".title") {
                // tokens[1] = tokens[1].replace(/^"|"/g, "")
                jsonFormat.displayTitle = tokens[1].trim()
                index++
                continue
            } else if (tokens[0].trim() == jsonFormat.objectTitle + ".add") {
                // tokens[1] = tokens[1].replace(/^"|"|{|}/g, "")

                const values = tokens[1].split(",")

                console.log("This are values");

                console.log(values);


                if (!isNumeric(values[1])) {
                    throw Error("Error : Not Number");

                }

                let jsonValues = {}

                jsonValues.label = values[0].trim()
                jsonValues.value = parseInt(values[1].trim())


                if (values.length == 3) {
                    if (!isHexColor(values[2].trim())) {
                        throw Error("Error : Not Hex Color at line " + (index + 1));
                    }

                    jsonValues.color = values[2].trim()
                }
                jsonFormat.data.push(jsonValues);
            } else {
                throw Error("Error at line " + (index + 1))
            }
            index++;
        }
    }
    else {
        throw Error("Error at line 1");
    }

    if ("displayTitle" in jsonFormat && "type" in jsonFormat && "data" in jsonFormat && "objectTitle" in jsonFormat) {

        if (jsonFormat.data.length == 0) {
            throw Error("No  data found!")
        }

        for (let index = 0; index < jsonFormat.data.length; index++) {
            const element = jsonFormat.data[index];
            if (!("label" in element)) {
                throw Error("Label missing at data " + (index + 1))
            }
            if (!("color" in element)) {
                throw Error("Color missing at data " + (index + 1))
            }
            if (!("value" in element)) {
                throw Error("Value missing at data " + (index + 1))
            }
        }
    } else {
        if (!("displayTitle" in jsonFormat)) {
            throw Error("No Title Found")
        }
        if (!("type" in jsonFormat)) {
            throw Error("Type of chart is not mentioned")
        }
        if (!("objectTitle" in jsonFormat)) {
            throw Error("No Object Title Found")
        }
        if (!("data" in jsonFormat)) {
            throw Error("No Data Found")
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