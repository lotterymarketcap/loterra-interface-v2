export const lineOptions = {
    animation: {
        duration: 0,
    },
    scales: {
        xAxis: {
            beginAtZero: true,
            display: false,
        },
        yAxis: {
            beginAtZero: true,
            display: false,
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
}

export const lineData = (canvas) => {
    const ctx = canvas.getContext('2d')
    let gradientGreen = ctx.createLinearGradient(500, 0, 100, 0)
    gradientGreen.addColorStop(0, '#4DF6A4')
    gradientGreen.addColorStop(1, '#1BC472')

    return {
        labels: [
            '12-12-2021',
            '12-12-2021',
            '12-12-2021',
            '12-12-2021',
            '12-12-2021',
            '12-12-2021',
            '12-12-2021',
        ],

        datasets: [
            {
                data: [0.4, 0.7, 1, 2, 4, 6, 10],
                fill: true,
                backgroundColor: 'rgba(32, 255, 147, 0.2)',
                borderColor: [gradientGreen],
                pointBackgroundColor: '#FFFFFF',
                lineTension: 0.4,
                borderWidth: 5,
            },
        ],
    }
}

export const pieData = (canvas) => {
    const ctx = canvas.getContext('2d')

    let gradientBlack = ctx.createLinearGradient(500, 0, 100, 0)
    gradientBlack.addColorStop(0, '#3B2E5D')
    gradientBlack.addColorStop(1, '#271A49')

    let gradientGreen = ctx.createLinearGradient(500, 0, 100, 0)
    gradientGreen.addColorStop(0, '#4DF6A4')
    gradientGreen.addColorStop(1, '#1BC472')

    let gradientPink = ctx.createLinearGradient(500, 0, 100, 0)
    gradientPink.addColorStop(0, '#ED70ED')
    gradientPink.addColorStop(1, '#B83AB8')

    let gradientBlue = ctx.createLinearGradient(500, 0, 100, 0)
    gradientBlue.addColorStop(0, '#6372ff')
    gradientBlue.addColorStop(1, '#505eca')

    let gradientYellow = ctx.createLinearGradient(500, 0, 100, 0)
    gradientYellow.addColorStop(0, '#ffcb63')
    gradientYellow.addColorStop(1, '#cb8500')

    return {
        labels: ['Available', 'Staked', 'DAO', 'LP funds', 'Staked LP'],
        datasets: [
            {
                label: '# of Lota',
                data: [
                    canvas.dataset.staked,
                    canvas.dataset.total,
                    canvas.dataset.dao,
                    canvas.dataset.lpfunds,
                    canvas.dataset.lpstaked,
                ],
                backgroundColor: [
                    gradientGreen,
                    gradientBlack,
                    gradientPink,
                    gradientBlue,
                    gradientYellow,
                ],
                borderColor: [
                    gradientGreen,
                    gradientBlack,
                    gradientPink,
                    gradientBlue,
                    gradientYellow,
                ],
                borderWidth: 1,
            },
        ],
    }
}
