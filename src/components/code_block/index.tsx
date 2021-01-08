// === theme === //
// dracula
// duotoneDark
// duotoneLight
// github
// nightOwl
// nightOwlLight
// oceanicNext
// palenight
// shadesOfPurple
// synthwave84
// ultramin
// vsDark

import React, { FC, useEffect, useState } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import FormatMarkDown from '@/components/format_markdown'
import styles from './index.less'

type props = {
    code: string
    language?: Language
    backgroundColor?: string
    deleteEndEmptyLine?: boolean
}

// markdown 代码块的高亮，全权处理
const HighlightCode: FC<props> = ({ code, language, backgroundColor, deleteEndEmptyLine = false }) => {
    const [trueCode, setTrueCode] = useState(code)

    useEffect(() => {
        // 去掉最后一行的空行
        const noEndLineCode = code.replace(/\n$/, '')

        if (deleteEndEmptyLine) {
            setTrueCode(noEndLineCode)
        } else {
            setTrueCode(code)
        }
    }, [deleteEndEmptyLine])

    // 设置容器style，目前只是覆盖 backgroundColor
    const getStyle = (oldStyle: object): object => {
        if (backgroundColor) {
            return {
                ...oldStyle,
                backgroundColor // 主动覆盖
            }
        } else {
            return {
                ...oldStyle,
                backgroundColor: '#f2f4f5' // 不满意目前theme背景，调整默认背景色
            }
        }
    }

    return (
        <FormatMarkDown formatCode={false}>
            <Highlight {...defaultProps} code={trueCode} language={language || 'jsx'} theme={theme}>
                {({ style, tokens, getLineProps, getTokenProps }): JSX.Element => (
                    <div className={styles['pre']} style={getStyle(style)}>
                        <code>
                            {tokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })} key={i}>
                                    {line.map((token, key) => (
                                        <span {...getTokenProps({ token, key })} key={key} />
                                    ))}
                                </div>
                            ))}
                        </code>
                    </div>
                )}
            </Highlight>
        </FormatMarkDown>
    )
}

export default HighlightCode
