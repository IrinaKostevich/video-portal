const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const AVG_DAYS_PER_MONTH = 30;
const MONTH_PER_YEAR = 12;

export function calculateDateFromNow(dateString) {
    const dateInMsSeconds = new Date(dateString).getTime();
    const todayInMsSeconds = Date.now();

    const diff = todayInMsSeconds - dateInMsSeconds;

    const minutes = diff / (MS_PER_SECOND * SECONDS_PER_MINUTE);
    const hours = minutes / MINUTES_PER_HOUR;
    const days = hours / HOURS_PER_DAY;
    const months = days / AVG_DAYS_PER_MONTH;
    const years = months / MONTH_PER_YEAR;

    let resultNumber = 0;
    let resultWord = 0;

    if (Math.trunc(minutes)) {
        resultNumber = Math.trunc(minutes);
        resultWord = 'minute';
    }

    if (Math.trunc(hours)) {
        resultNumber = Math.trunc(hours);
        resultWord = 'hour';
    }

    if (Math.trunc(days)) {
        resultNumber = Math.trunc(days);
        resultWord = 'day';
    }

    if (Math.trunc(months)) {
        resultNumber = Math.trunc(months);
        resultWord = 'month';
    }

    if (Math.trunc(years)) {
        resultNumber = Math.trunc(years);
        resultWord = 'year';
    }

    const suffix = resultNumber > 1 ? 's' : '';

    return `${resultNumber} ${resultWord}${suffix} ago`;
}
