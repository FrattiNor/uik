import React, { FC, useState } from 'react'
import copy from 'copy-to-clipboard'
import Icon from '@/components/icon'
import CodeBlock from '@/components/code_block'
import { message } from 'uik'
import styles from './index.less'

type props = {
    code: string
    title?: string
    desc?: string
}

// mdx 介绍文件 使用的demo示例
const CodeBox: FC<props> = ({ children, code, title, desc }) => {
    const [visible, setVisible] = useState(false)

    // 去掉最后一行的空行
    const noEndLineCode = code.replace(/\n$/, '')

    // 拷贝函数
    const copyToClipboard = (): void => {
        copy(noEndLineCode)
        message.success('复制成功')
    }

    return (
        <div className={styles['code-box']}>
            {/* demo */}
            <div className={styles['demo']}>{children}</div>

            {/* desc */}
            {title && desc && (
                <div>
                    <div className={styles['title']}>
                        <span>{title}</span>
                    </div>
                    <div className={styles['desc']}>
                        <p dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                </div>
            )}

            {/* btn */}
            <div className={styles['btn-box']}>
                <Icon name={`${visible ? 'code-open' : 'code-close'}`} className={styles['btn']} onClick={(): void => setVisible(!visible)} />
                <Icon name="copy" className={styles['btn']} onClick={copyToClipboard} />
            </div>

            {/* code */}
            {visible && (
                <pre className={styles['pre']}>
                    <CodeBlock code={noEndLineCode} backgroundColor="#fff" />
                </pre>
            )}
        </div>
    )
}

export default CodeBox
