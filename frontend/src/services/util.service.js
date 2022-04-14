
export const utilService = {
    delay,
    getRandomInt,
    makeId,
    getVerbalTime,
    getMMYYYY,
    getNextPrevTime,
    getCurrency
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

// from '11/2021' to 'Nov 2021'
function getVerbalTime(numDate) {
    const [month, year] = numDate.split('/')
    const numWordMap = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    }
    return `${numWordMap[month]} ${year}`
}

// from new Date() to '11/2021'
function getMMYYYY(date) {
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let year = date.getFullYear()
    console.log(`${month}/${year}`);
    return `${month}/${year}`
}

function getNextPrevTime(time, diff) {
    let [month, year] = time.split('/')
    month = (+month) + diff
    if (month > 12) {
        month = 1
        year = parseInt(year) + 1
    }
    if (month < 1) {
        month = 12
        year = parseInt(year) - 1
    }
    month = (month.toString())
    month = month.padStart(2, '0')
    return `${month}/${year}`
}

function getCurrency(currencyCode) {
    switch (currencyCode) {
        case 'USA':
            return '$'
        case 'ILS':
            return '₪'
        default:
            return '₪'
    }
}