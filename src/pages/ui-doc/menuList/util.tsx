type componentObj = {
    name: string
    desc: string
}

type menuObj = {
    title: string
    components: componentObj[]
}

const formatName = (n: string, lower: boolean) => {
    return n
        .split('-')
        .map((s) => (lower ? s.toLowerCase() : s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase()))
        .join('')
}

const getOptions = (c: string[], i: number) => {
    const options = []
    for (let x = i - 1; x >= 0; x--) {
        const s = c[x]
        const matchRes = s.match(/\/\/ (.*)/)
        if (matchRes) {
            options.unshift(matchRes[1])
        } else {
            break
        }
    }
    let cName = 'No Name'
    let hidden = false
    let lowerCase = false
    options.forEach((item, i) => {
        if (i === 0) {
            cName = item
        } else {
            const matchRes = item.match(/(hidden|lowerCase)/g)
            Array.isArray(matchRes) &&
                matchRes.forEach((item) => {
                    switch (item) {
                        case 'hidden':
                            hidden = true
                            break
                        case 'lowerCase':
                            lowerCase = true
                            break
                        default:
                            break
                    }
                })
        }
    })

    return { cName, hidden, lowerCase }
}

const formatMenuComponent = (s: string) => {
    const components = s.match(/.*/g)?.filter((item) => item)
    const res: componentObj[] = []
    components?.forEach((component, i) => {
        const matchRes = component.match(/export.*from.*?([a-zA-Z-]+).*?/)
        if (matchRes) {
            const name = matchRes[1] || 'unknown'
            const options = getOptions(components, i)
            const { cName, lowerCase, hidden } = options

            if (!hidden) {
                res.push({
                    name,
                    desc: `${formatName(name, lowerCase)} ${cName}`
                })
            }
        }
    })
    return res
}

const formatTitle = (t: string) => {
    return t.match(/\/\/ == (.*) ==/)?.[1] || t
}

const formatMenuString = (s: string) => {
    const titles = s.match(/\/\/ == .* ==/g)
    const lists = s.split(/\/\/ == .* ==/)
    const res: menuObj[] = []
    titles?.forEach((title, i) => {
        res.push({
            title: formatTitle(title),
            components: formatMenuComponent(lists[i + 1])
        })
    })
    return res
}

export { formatMenuString }
