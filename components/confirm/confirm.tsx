import React, { FC } from 'react'
import noticeHoc from '../_hocs/notice/notice-hoc'

const Notice: FC = () => {
    return <>6666</>
}

export default noticeHoc({ backgroundColor: '#ff4d4f' })(Notice)
