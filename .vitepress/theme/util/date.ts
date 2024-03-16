export enum DateFormatType {
  Dot,
  Characters,
  Ago,
}

export function handelRawDate(
  rawDate: string | Boolean,
  type: DateFormatType
): String {
  const date: Date = new Date(<string>rawDate);
  const { year, month, day } = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
  switch (type) {
    case DateFormatType.Dot:
      return `${year.toString().padStart(4, '0')}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
    case DateFormatType.Characters:
      return `${year} 年 ${month} 月 ${day} 日`;
    case DateFormatType.Ago:
      const now: Date = new Date(Date.now());
      if (now.getFullYear() > year) return `${now.getFullYear() - year} 年前`;
      if (now.getMonth() + 1 > month)
        return `${now.getMonth() - month + 1} 个月前`;
      if (now.getDate() > day) return `${now.getDate() - day} 天前`;
      return '今天';
    default:
      return date.toLocaleDateString();
  }
}
