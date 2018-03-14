
const rupiahs = num => `Rp. ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

export { rupiahs }
export default {
  rupiahs
}
