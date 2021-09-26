import React, { FC, useEffect, useState } from 'react'
import copy from 'copy-to-clipboard'
import CodeBlock from '@/components/code-block'
import { message, Icon, Tooltip } from 'uik'
import classnames from 'classnames'
import styles from './index.less'

type props = {
    title?: string
    getJs?: () => any
    getLess?: () => any
    getDesc?: () => any
    getComponent: () => any
}

// 去掉最后一行的空行
const noEndLineCode = (code: string) => code.replace(/\n$/, '')

// mdx 介绍文件 使用的demo示例
const CodeBox: FC<props> = ({ title, getJs, getLess, getDesc, getComponent }) => {
    const [lessCode, setLessCode] = useState('')
    const [code, setCode] = useState('')
    const [desc, setDesc] = useState('')
    const [Component, setComponent] = useState<any>('')
    const [type, setType] = useState<'js' | 'less'>('js')

    const showCodeObj = {
        js: code,
        less: lessCode
    }
    const showCode = showCodeObj[type]

    useEffect(() => {
        try {
            if (getLess) {
                getLess().then((res: any) => {
                    setLessCode(res.default)
                })
            }
            if (getJs) {
                getJs().then((res: any) => {
                    setCode(res.default)
                })
            }
            if (getDesc) {
                getDesc().then((res: any) => {
                    setDesc(res.default)
                })
            }
            if (getComponent) {
                getComponent().then((res: any) => {
                    const { default: Component } = res
                    setComponent(<Component />)
                })
            }
        } catch (e) {
            console.log('e', e)
        }
    }, [])

    const [visible, setVisible] = useState(false)

    // 拷贝函数
    const copyToClipboard = (): void => {
        copy(noEndLineCode(showCode))
        message.open('复制成功', { type: 'success' })
    }

    return (
        <div className={styles['code-box']}>
            {/* demo */}
            <div className={styles['demo']}>{Component}</div>

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
            {code && (
                <div className={styles['icon-box']}>
                    {lessCode && (
                        <>
                            <Tooltip title="显示JavaScript代码">
                                <Icon
                                    defaultIcon
                                    name="javascript"
                                    className={classnames(styles['icon'], { [styles['check']]: type === 'js' })}
                                    onClick={() => setType('js')}
                                />
                            </Tooltip>
                            <Tooltip title="显示Less代码">
                                <Icon
                                    defaultIcon
                                    name="less"
                                    className={classnames(styles['icon'], { [styles['check']]: type === 'less' })}
                                    style={{ fontSize: 30 }}
                                    onClick={() => setType('less')}
                                />
                            </Tooltip>
                        </>
                    )}

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
            )}

            {/* code */}
            {visible && (
                <pre className={styles['pre']}>
                    <CodeBlock code={noEndLineCode(showCode)} />
                </pre>
            )}
        </div>
    )
}

export default CodeBox
