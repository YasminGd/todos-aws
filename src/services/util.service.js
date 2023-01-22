export const utilService = {
    isMoreThenADayAgo
}

function isMoreThenADayAgo(dateToCheck) {
    const now = new Date()
    const timeDiff = Math.abs(now - dateToCheck)
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return diffDays > 1
}