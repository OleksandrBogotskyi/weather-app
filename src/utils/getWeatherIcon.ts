export const getWeatherIconUrl = (icon: string, use4x: boolean = true) =>
    `https://openweathermap.org/img/wn/${icon}${use4x ? '@4x' : ''}.png`;
