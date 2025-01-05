import React, { useEffect, useState } from 'react'

import { ChatGPTProps, ChatRole, ChatMessage } from './interface'
import MessageItem from './MessageItem'
import SendBar from './SendBar'
import { useChatGPT } from './useChatGPT'

import './index.less'
import 'highlight.js/styles/atom-one-dark.css'

const ChatGPT = (props: ChatGPTProps) => {
  const { loading, disabled, messages, currentMessage, onSend, onClear, onStop, setMessages } = useChatGPT(props)
  const [initialMessageSent, setInitialMessageSent] = useState(false)
  const [conversationCount, setConversationCount] = useState(0)

  useEffect(() => {
    if (!initialMessageSent) {
      const initialMessage: ChatMessage = {
        content: 'こんにちは！まず，今日が何日目の会話か教えていただけますか？1日目の場合は「1日目」、2日目の場合は「2日目」、3日目の場合は「3日目」と書いてください。',
        role: ChatRole.System
      }
      setMessages((prevMessages) => [...prevMessages, initialMessage])
      setInitialMessageSent(true)
    }
  }, [initialMessageSent, setMessages])

  const handleSend = async (message: ChatMessage) => {
    // 会話回数が2回未満の場合は会話を進める
    if (conversationCount < 2) {
      await onSend(message)
      setConversationCount(conversationCount + 1)
    }
    // 会話回数が2回の場合は会話を終了する
    if (conversationCount === 1) {
      setTimeout(() => {
        const endMessage: ChatMessage = {
          content: '今日の会話は終了します。ありがとうございました！',
          role: ChatRole.System
        }
        // 終了メッセージまでの表示時間を設定（1.5秒）時間を空けないとAPIのメッセージより先に表示されてしまう
        setMessages((prevMessages) => [...prevMessages, endMessage])
      }, 1500)
    }
  }

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
        onSend={handleSend}
        onClear={onClear}
        onStop={onStop}
        messages={messages}
      />
    </div>
  )
}

export default ChatGPT
