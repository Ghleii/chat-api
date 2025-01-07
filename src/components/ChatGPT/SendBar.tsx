// メッセージ部分のコンポーネント
import React, { KeyboardEventHandler, useRef } from 'react'

import { ClearOutlined, SendOutlined, CopyOutlined } from '@ant-design/icons'

import { ChatRole, SendBarProps } from './interface'
import Show from './Show'

const SendBar = (props: SendBarProps) => {
  const { loading, disabled, onSend, onClear, onStop, messages } = props

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const onInputAutoSize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
    }
  }

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.style.height = 'auto'
      onClear()
    }
  }

  const handleSend = () => {
    const content = inputRef.current?.value
    if (content) {
      inputRef.current!.value = ''
      inputRef.current!.style.height = 'auto'
      onSend({
        content,
        role: ChatRole.User
      })
    }
  }

  const onKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.shiftKey) {
      return
    }

    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleSend()
    }
  }

  const handleCopy = () => {
    const allMessages = messages.map(message => {
      const roleTag = 'role' in message && message.role === ChatRole.User ? 'ユーザー' : 'システム'
      return `${roleTag}: ${message.content}`
    }).join('\n')
    navigator.clipboard.writeText(allMessages).then(() => {
      alert('会話がクリップボードにコピーされました')
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  return (
    <Show
      fallback={
        <div className="thinking">
          <span>Please wait ...</span>
          <div className="stop" onClick={onStop}>
            Stop
          </div>
        </div>
      }
      loading={loading}
    >
      <div className="send-bar">
        <textarea
          ref={inputRef!}
          className="input"
          disabled={disabled}
          placeholder="ここに入力してください"
          autoComplete="off"
          rows={1}
          onKeyDown={onKeydown}
          onInput={onInputAutoSize}
        />
        <button className="button" title="Send" disabled={disabled} onClick={handleSend}>
          <SendOutlined />
        </button>
        {/* <button className="button" title="Clear" disabled={disabled} onClick={handleClear}>
          <ClearOutlined />
        </button> */}
        <button className="button" title="Copy Conversation" onClick={handleCopy}>
          <CopyOutlined />
        </button>
      </div>
    </Show>
  )
}

export default SendBar
