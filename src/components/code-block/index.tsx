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

import React, { FC, useEffect, useState, ReactElement } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
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
    }, [deleteEndEmptyLine, code])

    // 设置容器style，目前只是覆盖 backgroundColor
    const getStyle = (oldStyle: anyObject): anyObject => {
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
        <Highlight {...defaultProps} code={trueCode} language={language || 'jsx'} theme={theme}>
            {({ style, tokens, getLineProps, getTokenProps }): ReactElement => (
                <div className={styles['pre']} style={getStyle(style)}>
                    <code className={styles['code']}>
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
    )
}

export default HighlightCode
