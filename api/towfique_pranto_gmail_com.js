
function getGCD(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function getLCM(a, b) {
    return (a / getGCD(a, b)) * b;
}

function isStrictNaturalNumber(val) {
    if (val === undefined || val === null) return false;
    const str = String(val).trim();
    if (!/^\d+$/.test(str)) return false;
    const num = Number(str);
    return num > 0 && Number.isInteger(num);
}

export default function handler(req, res) {
    const { x, y } = req.query;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');

    if (!isStrictNaturalNumber(x) || !isStrictNaturalNumber(y)) {
        res.statusCode = 200;
        return res.end('NaN');
    }

    const numX = parseInt(x, 10);
    const numY = parseInt(y, 10);
    const result = getLCM(numX, numY);

    res.statusCode = 200;
    return res.end(String(result));
}