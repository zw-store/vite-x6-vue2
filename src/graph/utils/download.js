import dayjs from 'dayjs'

export const downloadJSON = (data, indent = 2) => {
  try {
    const blob = new Blob([JSON.stringify(data, null, indent)], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const alink = document.createElement('a')
    alink.setAttribute('download', `${dayjs().format('YYYY-MM-DD HH.mm.ss')}.json`)
    alink.href = url
    document.body.appendChild(alink)
    alink.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(alink)
  } catch (error) {
    console.error(error)
  }
}
