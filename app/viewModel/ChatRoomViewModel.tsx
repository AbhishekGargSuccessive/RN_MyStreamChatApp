import React, {useEffect} from 'react';
import ChatRoomScreen from '../views/chat/ChatRoomScreen';
import {useChatContext} from '../customHooks/ChatContext';

const ChatRoomViewModel = ({navigation}: any) => {
  const {currentChannel} = useChatContext();

  useEffect(() => {
    navigation.setOptions({
      title: currentChannel?.data?.name || 'Channel',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannel?.data?.name]);

  return <ChatRoomScreen />;
};

export default ChatRoomViewModel;
