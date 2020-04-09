// YY-MM-DD
export const YMD = value => {
    let date = new Date(value)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}
// LLL
const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
export function LLL (value) {
  const date = new Date(value)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${months[date.getMonth()]}, ${date.getDate()}, ${date.getFullYear()} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
}
// DD.MM.YYYY - HH:mm:ss
export function DMY_HMS (value) {
  const date = new Date(value)
  const day = date.getDate()
  const month = date.getMonth()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${date.getFullYear()} - ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}
// HH:mm:ss
export function HMS (value) {
  const date = new Date(value)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}


export function dateTime (value) {
  let min = value / 60
  let hour = min / 60
  return `дней: ${Math.floor(hour / 24)}, часов: ${Math.floor(hour % 24)}, минут: ${Math.floor(min % 60)}`
}