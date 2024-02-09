const BitReadingUtils = require("../util/bit-reading.utils");

module.exports = {
    knot: {
        readSignalStrength: (data) => {
            const extractedValues = data.toString().match(/signal-strenght: (.*)/)
            if (Array.isArray(extractedValues) && extractedValues.length > 1) {
                const parsedData = extractedValues[1]
                    .split(',')
                    .map(s => Number(s));
                return BitReadingUtils.shiftBitForReading(parsedData);
            }
            return "Signal strength not readable";
        }
    },
    meterRegister: {
        readMeterRegister: (data) => {
            const extractedValues = data.toString().match(/values: (.*)/)
            if (Array.isArray(extractedValues) && extractedValues.length > 1) {
                const parsedData = extractedValues[1]
                    .split(',')
                    .map(s => Number(s));
                return BitReadingUtils.decimal32bitToFloat(BitReadingUtils.shiftBitForReading(parsedData));
            }
            return "Value not readable"
        }
    },
    meterParameter: {
        readMeterParameter: (data) => {
            const extractedValues = data.toString().match(/values: (.*)/)
            if (Array.isArray(extractedValues) && extractedValues.length > 1) {
                const parsedData = extractedValues[1]
                    .split(',')
                    .map(s => Number(s));
                return BitReadingUtils.shiftBitForReading(parsedData);
            }
            return "Value not readable"
        }
    }
};
