const colors = [
  {
    color: '#D0EEF2',
    timesUsed: 0
  },
  {
    color: '#D1F3DA',
    timesUsed: 0
  },
  // {
  //   color: '#EAF2D0',
  //   timesUsed: 0
  // },
  // {
  //   color: '#94BEE3',
  //   timesUsed: 0
  // },
]

export default () => {
  const colorsUsageCounters = colors.map(color => color.timesUsed)
  const lessUsedColorCounter = Math.min(...colorsUsageCounters)
  const lessUsedColors = colors.filter(color => color.timesUsed === lessUsedColorCounter)
  const randomColorIndex = Math.floor(Math.random() * lessUsedColors.length)
  const randomColorInstance = lessUsedColors[randomColorIndex]

  randomColorInstance.timesUsed++
  return randomColorInstance.color
}
