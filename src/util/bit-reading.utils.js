module.exports = {
    decimal32bitToFloat: (n) => {
        const s = (n >> 31) & 1;
        const e = ((n >> 23) & 0xff) - 127;
        const f = n & 0x7fffff;
        let v = 1.0;
        const m = (() => {
            let temp = [];
            for (let i = 0; i < 23; i++) {
                temp.push((f >> i) & 1);
            }
            return temp.reverse().map((xx) => {
                v /= 2
                return xx * (v)
            }).reduce((x, y) => x + y);
        })();
        return ((-1) ** s) * (2 ** e) * (1 + m);
    },
    shiftBitForReading: (value) => {
        let size = value.length;
        return value.map((n) => n << (16 * (size -= 1))).reduce((x, y) => x + y);
    }
};
