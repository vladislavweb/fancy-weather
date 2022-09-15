export const getWeatherImage = (day: "n" | "d", weather: string) => {
  if (day === 'n') {
    switch (weather) {
      case '01':
        return 'csn';
      case '02':
        return 'fcn';
      case '03':
        return 'scn';
      case '04':
        return 'bcn';
      case '09':
        return 'sr';
      case '10':
        return 'rn';
      case '11':
        return 'thunderstorm';
      case '13':
        return 'sn';
      case '50':
        return 'mist';
      default:
    }
  } else if (day === 'd') {
    switch (weather) {
      case '01':
        return 'csd';
      case '02':
        return 'fcd';
      case '03':
        return 'scd';
      case '04':
        return 'bcd';
      case '09':
        return 'sr';
      case '10':
        return 'rd';
      case '11':
        return 'thunderstorm';
      case '13':
        return 'sd';
      case '50':
        return 'mist';
      default:
    }
  }
};
