import React, { FC, useState } from 'react'
import copy from 'copy-to-clipboard'
import CodeBlock from '@/components/code-block'
import { message, Icon, Tooltip } from 'uik'
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
        message.open('复制成功', { type: 'success' })
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

            {/* icon */}
            <div className={styles['icon-box']}>
                <Tooltip title={`${visible ? '隐藏代码' : '显示代码'}`}>
                    <Icon
                        defaultIcon
                        name={`${visible ? 'code-open' : 'code-close'}`}
                        className={styles['icon']}
                        onClick={(): void => setVisible(!visible)}
                    />
                </Tooltip>
                <Tooltip title="拷贝代码">
                    <Icon defaultIcon name="copy" className={styles['icon']} onClick={copyToClipboard} />
                </Tooltip>
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
