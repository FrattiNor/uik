// 根据 clientHeight 数据 获得 uuid
const getElementUUID = (element: HTMLElement): string => {
    const { clientHeight: ech, clientWidth: ecw, clientLeft: ecl, clientTop: ect, offsetParent } = element
    const { clientHeight: pch = 0, clientWidth: pcw = 0, clientLeft: pcl = 0, clientTop: pct = 0, } = offsetParent || {}

    const uuid = `${ech}${ecw}${ecl}${ect}-${pch}${pcw}${pcl}${pct}`

    return uuid
}

export default getElementUUID
