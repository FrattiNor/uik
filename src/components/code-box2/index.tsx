import React, { FC, useEffect, useState, useReducer } from 'react'
import copy from 'copy-to-clipboard'
import CodeBlock from '@/components/code-block'
import { message, Icon, Tooltip, Loading } from 'uik'
import classnames from 'classnames'
import styles from './index.less'

type props = {
    title?: string
    getJs?: () => any
    getLess?: () => any
    getDesc?: () => any
    getComponent: () => any
}

type reducersState = {
    less: boolean
    js: boolean
    desc: boolean
    component: boolean
}

type reducersType = 'setLessLoading' | 'setJsLoading' | 'setDescLoading' | 'setComponentLoading'

// 去掉最后一行的空行
const noEndLineCode = (code: string) => code.replace(/\n$/, '')

const reducers = (state: reducersState, { type, payload }: { type: reducersType; payload: boolean }) => {
    switch (type) {
        case 'setLessLoading':
            return {
                ...state,
                less: payload
            }
        case 'setJsLoading':
            return {
                ...state,
                less: payload
            }
        case 'setDescLoading':
            return {
                ...state,
                less: payload
            }
        case 'setComponentLoading':
            return {
                ...state,
                less: payload
            }
        default:
            return { ...state }
    }
}

// mdx 介绍文件 使用的demo示例
const CodeBox: FC<props> = ({ title, getJs, getLess, getDesc, getComponent }) => {
    const [lessCode, setLessCode] = useState('')
    const [code, setCode] = useState('')
    const [desc, setDesc] = useState('')
    const [Component, setComponent] = useState<any>('')
    const [type, setType] = useState<'js' | 'less'>('js')
    const [state, dispatch] = useReducer(reducers, { less: false, js: false, desc: false, component: false })
    const loading = Object.values(state).some((item) => item) ? true : false

    const showCodeObj = {
        js: code,
        less: lessCode
    }
    const showCode = showCodeObj[type]

    useEffect(() => {
        try {
            const setLoading = (type: reducersType) => (payload: boolean) => {
                dispatch({
                    type,
                    payload
                })
            }

            if (getLess) {
                const setLessLoading = setLoading('setLessLoading')
                setLessLoading(true)
                getLess()
                    .then((res: any) => {
                        setLessCode(res.default)
                    })
                    .finally(() => {
                        setLessLoading(false)
                    })
            }
            if (getJs) {
                const setJsLoading = setLoading('setJsLoading')
                setJsLoading(true)
                getJs()
                    .then((res: any) => {
                        setCode(res.default)
                    })
                    .finally(() => {
                        setJsLoading(false)
                    })
            }
            if (getDesc) {
                const setDescLoading = setLoading('setDescLoading')
                setDescLoading(true)
                getDesc()
                    .then((res: any) => {
                        setDesc(res.default)
                    })
                    .finally(() => {
                        setDescLoading(false)
                    })
            }
            if (getComponent) {
                const setComponentLoading = setLoading('setComponentLoading')
                setComponentLoading(true)
                getComponent()
                    .then((res: any) => {
                        const { default: Component } = res
                        setComponent(<Component />)
                    })
                    .finally(() => {
                        setComponentLoading(false)
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
        <Loading loading={loading}>
            <div className={styles['code-box']}>
                {/* demo */}
                <div className={styles['demo']}>{Component}</div>

                {/* desc */}
                <div>
                    <div className={styles['title']}>
                        <span>{title}</span>
                    </div>
                    <div className={styles['desc']}>
                        <p dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                </div>

                {/* icon */}

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

                {/* code */}
                {visible && (
                    <pre className={styles['pre']}>
                        <CodeBlock code={noEndLineCode(showCode)} />
                    </pre>
                )}
            </div>
        </Loading>
    )
}

export default CodeBox
