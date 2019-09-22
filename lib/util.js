const crypto = require('crypto');

/**
 * Generate sha1 sign
 * @param data
 * @param secret
 * @returns {Promise<string>}
 */
async function genSignature(data, secret) {
    const ordered = {};
    Object.keys(data).sort().forEach(function (key) {
        if (data[key] !== "") {
            ordered[key] = data[key];
        }
    });
    const signString = secret + "|" + Object.values(ordered).join("|");
    return crypto.createHash("sha1").update(signString).digest("hex");
}

/**
 * Gen http string
 * @param paramsObj
 * @returns {string}
 */
function genQueryString(paramsObj) {
    return Object.keys(paramsObj).reduce((acc, k) => {
        if (paramsObj[k] !== undefined) {
            const v = `${paramsObj[k]}`;
            if (v.length !== 0) {
                const encoded = encodeURIComponent(v);
                if (acc.length === 0) {
                    acc += `${k}=${encoded}`;
                } else {
                    acc += `&${k}=${encoded}`;
                }
            }
        }
        return acc;
    }, '');
}

module.exports = {
    genSignature,
    genQueryString,
};
