const generateMsg = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMsg = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date()
    }
}

module.exports = { generateMsg, generateLocationMsg };