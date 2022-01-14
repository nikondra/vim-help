const getAverage = (numbers) => {
    const sum = numbers.reduce((acc, number) => acc + number, 0);
    const length = numbers.length;
    return sum / length;
}

function countStatistic() {
    if (unprocessedStatistic.length) {
        let res = []
        unprocessedStatistic.forEach(el => {
            tempStatisticForSpeed.push(parseInt(el[2]))
        })
        unprocessedStatistic = []
        for (let i = 1; i < tempStatisticForSpeed.length; ++i) {
            res.push(tempStatisticForSpeed[i] - tempStatisticForSpeed[i - 1]);
        }
        res.forEach(el => {
            if (el < 20000) tempBlocksStatisticForSpeed.push(el)
        })
		let average = Math.round(getAverage(res))
		statistics.speed = parseFloat(statistics.speed)
		statistics.speed = (statistics.speed) ? average : (statistics.speed+average) / 2        
    }
}
