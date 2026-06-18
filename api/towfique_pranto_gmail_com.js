// BigInt version to prevent JavaScript floating-point precision loss
function getGCD(a, b) {
    while (b !== 0n) {
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

    // Ensure it's greater than 0
    try {
        const num = BigInt(str);
        return num > 0n;
    } catch {
        return false;
    }
}

export default function handler(req, res) {
    const { x, y } = req.query;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    if (!isStrictNaturalNumber(x) || !isStrictNaturalNumber(y)) {
        res.statusCode = 200;
        return res.end('NaN');
    }

    const numX = BigInt(String(x).trim());
    const numY = BigInt(String(y).trim());

    const result = getLCM(numX, numY);

    res.statusCode = 200;
    return res.end(String(result));
}