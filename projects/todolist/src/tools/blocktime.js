//主要为了实现时间块的时间。例如6:00,7:00,8:00。或者以半小时为时间间隔。

maxWorkingTime = 18 //小时

/**
 * 时间
 * @param startTime
 * @param timeGap
 * @param isZerofill
 */
function createBlockTime(startTime = "6:00", timeGap = 30, isZerofill = false) {
    const timeBlocks = []//最终时间数组
    //时间块数量
    const blocksLength = maxWorkingTime * 60 / timeGap
    let nextTime = timeToMinutes(startTime)
    timeBlocks.push(minutes2time(nextTime,isZerofill))
    for (let i = 0; i < blocksLength; i++) {
        nextTime += timeGap
        if (nextTime>=24*60){
            nextTime-=24*60
        }
        timeBlocks.push(minutes2time(nextTime,isZerofill))
    }
    return timeBlocks
}

/**
 *
 * @param timeStr
 * @returns minutes 将时间转为分钟，方便计算
 */
function timeToMinutes(timeStr) {
    let timeStruct = {
        hours: 0,
        minute: 0
    }
    const times = timeStr.split(":")
    timeStruct.hours = times[0] * 1
    timeStruct.minute = times[1] * 1
    return timeStruct.hours * 60 + timeStruct.minute
}

function minutes2time(minutes, isZerofill = false) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (isZerofill) {
        return zerofill(hours) + ":" + zerofill(mins)
    }
    return hours + ":" + zerofill(mins)
}

/**
 * 前补零
 * @param time
 * @returns {string}
 */
function zerofill(time) {
    if (time < 0) {
        return "00"
    }
    return (time > 9) ? "" + time : "0" + time
}


console.log(zerofill(0))
console.log(zerofill(9))
console.log(zerofill(10))
console.log(zerofill(-1))

console.log(minutes2time(240, true));
console.log(createBlockTime("16:00",30,true))