const responseBody = (body) => {
    return {
        requestType: 'inbound',
        data: body
    }
}

module.exports = {
    responseBody
}