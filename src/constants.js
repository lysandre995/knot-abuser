const RandomUtils = require("./util/random.utils");

module.exports = {
    port: 59287, //RandomUtils.getRandomIntInclusive(49152, 65353),
    meterRegister: {
        phase1LineToNeutralVolts: {
            method: "readMeterRegister",
            name: "Phase 1 line to neutral volts",
            startAddress: 0,
            numberOfRegisters: 2
        },
        phase2LineToNeutralVolts: {
            method: "readMeterRegister",
            name: "Phase 2 line to neutral volts",
            startAddress: 2,
            numberOfRegisters: 2
        },
        phase3LineToNeutralVolts: {
            method: "readMeterRegister",
            name: "Phase 3 line to neutral volts",
            startAddress: 4,
            numberOfRegisters: 2
        },
        phase1Current: {
            method: "readMeterRegister",
            name: "Phase 1 current",
            startAddress: 6,
            numberOfRegisters: 2
        },
        phase2Current: {
            method: "readMeterRegister",
            name: "Phase 2 current",
            startAddress: 8,
            numberOfRegisters: 2
        },
        phase3Current: {
            method: "readMeterRegister",
            name: "Phase 3 current",
            startAddress: 10,
            numberOfRegisters: 2
        },
        phase1Power: {
            method: "readMeterRegister",
            name: "Phase 1 power",
            startAddress: 12,
            numberOfRegisters: 2
        },
        phase2Power: {
            method: "readMeterRegister",
            name: "Phase 2 power",
            startAddress: 14,
            numberOfRegisters: 2
        },
        phase3Power: {
            method: "readMeterRegister",
            name: "Phase 3 power",
            startAddress:  16,
            numberOfRegisters: 2
        },
        phase1phaseAngle: {
            method: "readMeterRegister",
            name: "Phase 1 phase angle",
            startAddress: 36,
            numberOfRegisters: 2
        },
        phase2phaseAngle: {
            method: "readMeterRegister",
            name: "Phase 2 phase angle",
            startAddress: 38,
            numberOfRegisters: 2
        },
        phase3phaseAngle: {
            method: "readMeterRegister",
            name: "Phase 3 phase angle",
            startAddress:  40,
            numberOfRegisters: 2
        },
        sumOfLineCurrents: {
            method: "readMeterRegister",
            name: "Sum of line currents",
            startAddress:  48,
            numberOfRegisters: 2
        },
        totalSystemPower: {
            method: "readMeterRegister",
            name: "Total system power",
            startAddress: 52,
            numberOfRegisters: 2
        },
        totalSystemVoltAmps: {
            method: "readMeterRegister",
            name: "Total system voltamps",
            startAddress: 56,
            numberOfRegisters: 2
        },
        totalSystemVar: {
            method: "readMeterRegister",
            name: "Total system var",
            startAddress: 60,
            numberOfRegisters: 2
        },
        totalSystemPowerFactor: {
            method: "readMeterRegister",
            name: "Total system power factor",
            startAddress: 62,
            numberOfRegisters: 2
        },
        totalSystemPhaseAngle: {
            method: "readMeterRegister",
            name: "Total system phase angle",
            startAddress: 66,
            numberOfRegisters: 2
        },
        frequencyOfSupplyVoltages: {
            method: "readMeterRegister",
            name: "Frequency of supply voltages",
            startAddress: 70,
            numberOfRegisters: 2
        },
        totalImportKwh: {
            method: "readMeterRegister",
            name: "Total import kwh",
            startAddress: 72,
            numberOfRegisters: 2
        },
        totalExportKwh: {
            method: "readMeterRegister",
            name: "Total export kwh",
            startAddress: 74,
            numberOfRegisters: 2
        },
        totalImportKwarh: {
            method: "readMeterRegister",
            name: "Total import kwarh",
            startAddress: 76,
            numberOfRegisters: 2
        },
        totalExportKwarh: {
            method: "readMeterRegister",
            name: "Total export kwarh",
            startAddress: 78,
            numberOfRegisters: 2
        },
        line1ToLine2Volts: {
            method: "readMeterRegister",
            name: "Line 1 to line 2 volts",
            startAddress: 200,
            numberOfRegisters: 2
        },
        line2ToLine3Volts: {
            method: "readMeterRegister",
            name: "Line 2 to line 3 volts",
            startAddress: 202,
            numberOfRegisters: 2
        },
        line3ToLine1Volts: {
            method: "readMeterRegister",
            name: "Line 3 to line 1 volts",
            startAddress:  204,
            numberOfRegisters: 2
        },
        neutralCurrent: {
            method: "readMeterRegister",
            name: "Neutral current",
            startAddress:  224,
            numberOfRegisters: 2
        }
    },
    meterParameter: {
        serialNumber: {
            method: "readMeterParameter",
            name: "Serial number",
            startAddress: 64512,
            numberOfRegisters: 2
        }
    },
    knot: {
        signalStrength: {
            name: "IoT Signal Strength",
            method: "readSignalStrength"
        }
    }
};
