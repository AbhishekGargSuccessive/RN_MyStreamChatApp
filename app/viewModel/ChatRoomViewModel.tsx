import React, {useEffect, useState} from 'react';
import ChatRoomScreen from '../views/chat/ChatRoomScreen';
import {useChatContext} from '../customHooks/ChatContext';
import {MessageType} from 'stream-chat-react-native';

const ChatRoomViewModel = ({navigation}: any) => {
  const {currentChannel} = useChatContext();
  const [thread, setThread] = useState<MessageType | null>();

  useEffect(() => {
    navigation.setOptions({
      title: currentChannel?.data?.name || 'Channel',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannel?.data?.name]);

  return <ChatRoomScreen {...{currentChannel, thread, setThread}} />;
};

export default ChatRoomViewModel;
