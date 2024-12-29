function convertNumber() {
    let inputNumber = document.getElementById("input-number").value;
    let fromSystem = document.getElementById("from-system").value;
    let toSystem = document.getElementById("to-system").value;
    let outputNumber = "";

    if (inputNumber === "") {
        alert("Please enter a number.");
        return;
    }

    // Split the input number into integer and fractional parts
    let [integerPart, fractionalPart] = inputNumber.split('.');

    let decimalValue;
    // Convert the integer part based on the 'fromSystem'
    if (fromSystem === "decimal") {
        decimalValue = parseInt(integerPart, 10);
    } else if (fromSystem === "binary") {
        decimalValue = parseInt(integerPart, 2);
    } else if (fromSystem === "octal") {
        decimalValue = parseInt(integerPart, 8);
    } else if (fromSystem === "hexadecimal") {
        decimalValue = parseInt(integerPart, 16);
    }

    if (isNaN(decimalValue)) {
        alert("Invalid input number for the selected system.");
        return;
    }

    // Convert integer part to the desired 'toSystem'
    if (toSystem === "binary") {
        let integerBinary = decimalValue.toString(2); // Convert to binary
        outputNumber = integerBinary;
    } else if (toSystem === "decimal") {
        outputNumber = decimalValue.toString(10); // Convert to decimal
    } else if (toSystem === "octal") {
        let integerOctal = decimalValue.toString(8); // Convert to octal
        outputNumber = integerOctal;
    } else if (toSystem === "hexadecimal") {
        outputNumber = decimalValue.toString(16).toUpperCase(); // Convert to hexadecimal
    }

    // Handle fractional part conversion if present
    if (fractionalPart) {
        let fraction = parseFloat("0." + fractionalPart); // Convert fractional part to float
        let fractionResult = ""; // Start result for fractional part

        // Loop until the fractional part is 0 or we reach the desired precision (e.g., 8 digits)
        let precision = 8; // You can adjust precision here
        while (fraction !== 0 && precision > 0) {
            fraction *= (toSystem === 'binary' ? 2 : toSystem === 'octal' ? 8 : toSystem === 'hexadecimal' ? 16 : 10);
            let digit = Math.floor(fraction);
            if (toSystem === "binary") {
                fractionResult += digit;
            } else if (toSystem === "octal") {
                fractionResult += digit;
            } else if (toSystem === "hexadecimal") {
                fractionResult += digit.toString(16).toUpperCase();
            }
            fraction -= digit; // Remove the integer part
            precision--;
        }

        // Append the fractional part result to the integer result
        outputNumber += "." + fractionResult;
    }

    document.getElementById("output-number").innerText = outputNumber;
}
