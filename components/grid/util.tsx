import { gutter } from './types'

export const alignObj = {
    top: 'flex-start',
    middle: 'center',
    bottom: 'flex-end'
}

export const justifyObj = {
    'space-around': 'space-around',
    'space-between': 'space-between',
    start: 'flex-start',
    center: 'center',
    end: 'flex-end'
}

export const getGutter = (g: gutter | undefined): [number, number] => {
    if (!g) {
        return [0, 0]
    }
    if (typeof g === 'number') {
        return [g, 0]
    } else {
        return [...g]
    }
}
