import React, { FC } from 'react'
import classnames from 'classnames'
import { MDXProvider } from '@mdx-js/react'
import CodeBlock from '@/components/code_block'
import styles from './index.less'

type props = {
    formatCode?: boolean // 是否需要代码块高亮，CodeBlock默认不需要
    className?: string
    [key: string]: any
}

// 格式化 makedown 样式
const FormatMarkDown: FC<props> = ({ children, className, formatCode = true, ...rest }) => {
    // 代码高亮
    const components = {
        code: ({ children }: { children: string }): JSX.Element => {
            return <CodeBlock code={children} deleteEndEmptyLine />
        }
    }

    const res = (
        <div className={classnames(styles['format-markdown'], { [`${className}`]: className })} {...rest}>
            {children}
        </div>
    )

    return formatCode ? <MDXProvider components={components}>{res}</MDXProvider> : res
}

export default FormatMarkDown
