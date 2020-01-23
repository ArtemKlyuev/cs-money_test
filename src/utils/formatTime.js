const formatDigit = (number, type) => {
    switch (type) {
        case 'часы':
            if (number > 0) {
                return `${number} ч`;
            }
            return '';
        case 'минуты':
            if (number > 0) {
                return `${number} мин`;
            }
            return '';
        case 'секунды':
            return `${number} сек`;
        default:
            return number;
    }
};

export const formatTime = (time) => {
    let result = '';

    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = +(time % 60).toFixed(1);

    result = `${formatDigit(hrs, 'часы')} ${formatDigit(
        mins,
        'минуты'
    )} ${formatDigit(secs, 'секунды')}`.trim();

    return result;
};
