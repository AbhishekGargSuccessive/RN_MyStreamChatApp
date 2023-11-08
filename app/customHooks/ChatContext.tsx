import React, {createContext, useContext, useEffect, useState} from 'react';
import {StreamChat, Channel} from 'stream-chat';
import {Constants} from '../config/Constant';
import {OverlayProvider, Chat} from 'stream-chat-react-native';
import {ActivityIndicator, StyleSheet} from 'react-native';

type ChatContextType = {
  currentChannel?: Channel;
};

export const ChatContext = createContext<ChatContextType>({
  currentChannel: undefined,
});

export const useChatContext = () => useContext<any>(ChatContext);

const ChatContextProvider = ({children}: {children: React.ReactNode}) => {
  const [chatClient, setChatClient] = useState<StreamChat>();
  const [currentChannel, setCurrentChannel] = useState<Channel>();

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(Constants.chatApiKey);
      // external user
      await client.connectUser(
        {
          id: Constants.chatUserId,
          name: Constants.chatUserName,
          image: Constants.chatUserImage,
        },
        client.devToken(Constants.chatUserId),
      );

      setChatClient(client);

      // connect to global channel
      // Screen user
      const globalChannel = client.channel('messaging', 'global', {
        name: 'Abhishek Garg',
      });

      await globalChannel.watch();
    };
    initChat();
  }, []);

  useEffect(() => {
    return () => {
      if (chatClient) {
        chatClient?.disconnectUser();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chatClient) {
    return <ActivityIndicator style={styles.indicator} />;
  }

  const value = {
    chatClient,
    currentChannel,
    setCurrentChannel,
  };

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
      </Chat>
    </OverlayProvider>
  );
};

export default ChatContextProvider;

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
  },
});
