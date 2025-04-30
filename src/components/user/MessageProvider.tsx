'use client';

import React, { createContext, useContext } from 'react';
import { message } from 'antd';

type MessageContextType = ReturnType<typeof message.useMessage>;

const MessageContext = createContext<MessageContextType | null>(null);

export const useMessageApi = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageApi must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={[messageApi, contextHolder]}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
