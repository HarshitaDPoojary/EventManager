module.exports.send = (err, data, res, statusCode) => {
    console.log("response.in sendResponse....", res.locals)
    var result = {
        message: "Success",
        data: [],
        statusCode: 200,
    };
    if (statusCode) {
        result.statusCode = statusCode;
        res.locals.statusCode = statusCode
    }
    if (err) {
        result.message = err.toString();
        result.data = data || [];
        return res.status(statusCode || 500).json(result);

    }
    result.data = data;
    res.status(statusCode || 200).json(result);
};