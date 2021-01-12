import React from 'react'
import { render } from '@testing-library/react'
import { Loading } from 'uik'

describe('<Loading />', () => {
    test('should render default', () => {
        const { container } = render(
            <Loading>
                <div>loading</div>
            </Loading>
        )
        expect(container).toMatchSnapshot()
    })

    test('should render loading', () => {
        const { container } = render(
            <Loading loading>
                <div>loading</div>
            </Loading>
        )
        expect(container).toMatchSnapshot()
    })
})
