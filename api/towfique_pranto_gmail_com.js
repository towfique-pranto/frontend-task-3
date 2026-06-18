// GCD (Greatest Common Divisor)
function getGCD(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
function getLCM(a, b) {
    return (a * b) / getGCD(a, b);
}

function isNaturalNumber(val) {
    if (val === undefined || val === null || val.trim() === '') return false;
    const num = Number(val);
    return Number.isInteger(num) && num > 0;
}

export default function handler(req, res) {

    if (req.method !== 'GET') {
        res.setHeader('Content-Type', 'text/plain');
        return res.status(405).send('Method Not Allowed');
    }

    const { x, y } = req.query;
    res.setHeader('Content-Type', 'text/plain');

    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return res.status(200).send('NaN');
    }

    const numX = parseInt(x, 10);
    const numY = parseInt(y, 10);

    const result = getLCM(numX, numY);

    return res.status(200).send(String(result));
}