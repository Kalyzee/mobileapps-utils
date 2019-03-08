import { Dimensions } from 'react-native';

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

export function equals(a, b, key) {
    return a[key] === b[key];
}

export function isValidKastSSID(ssid) {
    return ssid.startsWith('kast')
}

export function filterAccessPoints(accessPoints) {
    let validAccessPoints = []
    accessPoints.forEach(accessPoint => {
        if (accessPoint.SSID.startsWith('kast'))
            validAccessPoints.push(accessPoint)
    })

    return validAccessPoints
}

export function getVideoName(session, showTime = false) {

    const takeStr = "Take " + session.takeNb
    let title = ((session.title) ? session.title : undefined)
    title = ((title !== undefined) ? takeStr + ' (' + title + ')' : takeStr)

    return title
}

export function getVideoRecordDate(milli) {
    var date = new Date(milli)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function getDateOffset(date) {
    const today = new Date()
    let yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if (date.toLocaleDateString() == today.toLocaleDateString())
        return 'Today'

    else if (date.toLocaleDateString() == yesterday.toLocaleDateString())
        return 'Yesterday'

    return date.toLocaleDateString('en-US', { weekday: "long", year: "numeric", month: "long", day: "numeric" })
}

export function getStatusBarVideoDuration(milli) {
    const time = new Date(milli);

    const minutes = time.getUTCMinutes() + (time.getUTCHours() * 60)
    const seconds = time.getUTCSeconds()
    const milliseconds = time.getUTCMilliseconds()

    return pad2(minutes) + '\'' + pad2(seconds) + '"'
}

export function getVideoDuration(milli, allowZeroSeconds = false, fullText = false) {
    const time = new Date(milli);

    const hours = time.getUTCHours()
    const minutes = time.getUTCMinutes()
    const seconds = time.getUTCSeconds()
    const milliseconds = time.getUTCMilliseconds()

    const hourText = "h "
    const minText = fullText ? " min " : "m "
    const secText = fullText ? " sec " : "s "
    const msText = "ms "

    return '' +
        ((hours > 0) ? (hours + hourText) : ('')) +
        ((minutes > 0) ? (minutes + minText) : ('')) +
        ((seconds > 0 || allowZeroSeconds) ? (seconds + "s") : ('')) +
        ((milliseconds > 0 && seconds === 0) ? (' ' + milliseconds + "ms") : (''))
}

export function getGridSize() {
    return 20
}

export function getSize() {
    const screenSize = Dimensions.get('screen')
    const isHorizontal = screenSize.width > screenSize.height

    return {
        height: screenSize.height,
        width: screenSize.width,
        scale: screenSize.scale,
        fontScale: screenSize.fontScale,
        isHorizontal
    }
}

export function getGridUnit() {
    const gridHeight = getSize().height / getGridSize()
    const gridWidth = getSize().width / getGridSize()
    return Math.min(gridHeight, gridWidth)
}

export function getButtonGridUnit() {
    return getGridUnit() * 1.5
}

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export function scale(size) {
    return Math.min(getSize().width, getSize().height) / guidelineBaseWidth * size
}

export function moderateScale(size, factor = 0.5) {
    return size + (scale(size) - size) * factor
}

export function startInterval(callback, timer) {
    callback()
    return setInterval(callback, timer)
}

export function humanFileSize(bytes, si) {
    const thresh = 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}
