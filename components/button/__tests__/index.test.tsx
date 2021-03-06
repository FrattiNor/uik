import React from 'react'
import { render } from '@testing-library/react'
import { Button } from 'uik'

describe('<Button />', () => {
    test('should render default', () => {
        const { container } = render(<Button>default</Button>)
        expect(container).toMatchSnapshot()
    })

    test('should render disabled', () => {
        const { container } = render(<Button disabled>disabled</Button>)
        expect(container).toMatchSnapshot()
    })

    test('should render loading', () => {
        const { container } = render(<Button loading>loading</Button>)
        expect(container).toMatchSnapshot()
    })

    test('should render with type', () => {
        const types: string[] = ['default', 'primary', 'danger']

        const { getByText } = render(
            <>
                {types.map((k) => (
                    <Button key={k}>{k}</Button>
                ))}
            </>
        )

        types.forEach((k) => {
            expect(getByText(k)).toMatchSnapshot()
        })
    })
})
