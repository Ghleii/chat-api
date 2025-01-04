import React, { useEffect, useState } from 'react'

import { ChatGPTProps, ChatRole } from './interface'
import MessageItem from './MessageItem'
import SendBar from './SendBar'
import { useChatGPT } from './useChatGPT'

import './index.less'
import 'highlight.js/styles/atom-one-dark.css'

const ChatGPT = (props: ChatGPTProps) => {
  const { loading, disabled, messages, currentMessage, onSend, onClear, onStop } = useChatGPT(props)
  const [initialMessageSent, setInitialMessageSent] = useState(false)

  useEffect(() => {
    if (!initialMessageSent) {
      // ページを開くと同時に指定のプロンプトでAPIに発話
      const initialMessage = {
        content: 'こんにちは、どのようにお手伝いできますか？',
        role: ChatRole.User
      }
      onSend(initialMessage)
      setInitialMessageSent(true)
    }
  }, [initialMessageSent, onSend])

  return (
    <div className="chat-wrapper">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
      {currentMessage.current && (
        <MessageItem message={{ content: currentMessage.current, role: ChatRole.Assistant }} />
      )}
      <SendBar
        loading={loading}
        disabled={disabled}
        onSend={onSend}
        onClear={onClear}
        onStop={onStop}
        messages={messages}
      />
    </div>
  )
}

export default ChatGPT
