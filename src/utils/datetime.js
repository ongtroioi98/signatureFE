import dayjs from 'dayjs';

export function time2Min(time) {
  if (!time) return undefined;
  const h = time.get('h');
  const m = time.get('m');
  return h * 60 + m;
}
export function min2Time(min = 0) {
  if (min <= 0) return dayjs().startOf('d');
  const h = Math.floor(min / 60);
  const m = min % 60;
  return dayjs().set('hour', h).set('minute', m);
}
