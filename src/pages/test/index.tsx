import React, { FC } from 'react'
import { Table } from 'uik'

const Test: FC = () => {
    const data = [{ id: 2 }, { id: 3 }, { id: 1 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]
    const columns = [
        {
            title: 'title1',
            key: 'id',
            dataIndex: 'id',
            width: '300px'
        },
        {
            title: 'title2',
            key: 'id2',
            dataIndex: 'id2',
            width: '300px',
            render: (a: any, b: any, i: number) => `22222-${i}`
        },
        {
            title: 'title3',
            key: 'i3',
            dataIndex: 'id2',
            width: '300px',
            render: (a: any, b: any, i: number) => `333333333333333333-${i}`
        }
    ]

    return (
        <>
            <div style={{ margin: 24 }}>
                <Table dataSource={data} columns={columns} bordered scroll={{ x: '500px', y: '30vh' }} />
            </div>
        </>
    )
}

export default Test
