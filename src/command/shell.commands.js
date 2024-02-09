module.exports = {
    knot: {
        readSignalStrength: "/interface/ppp-client/info 0 once"
    },
    meterRegister: { readMeterRegister: "/iot/modbus/transceive address=%meterId% function=4 data=%startAddress%%numberOfRegisters%" },
    meterParameter: { readMeterParameter: "/iot/modbus/transceive address=%meterId% function=3 data=%startAddress%%numberOfRegisters%" }
};
