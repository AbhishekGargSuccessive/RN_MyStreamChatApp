import React from 'react';
import {ChannelList, ChannelPreviewMessenger} from 'stream-chat-react-native';
import {Channel} from 'stream-chat';
import CustomHeader from '../../components/CustomerHeader';
import {Text, View} from 'react-native';

interface ChatScreenProps {
  onSelect: (channel: Channel) => void;
}

const CustomListItem = (props: any) => {
  const {unread} = props;
  const backgroundColor = unread ? '#e6f7ff' : '#fff';

  return (
    <View style={{backgroundColor}}>
      <ChannelPreviewMessenger {...props} />
    </View>
  );
};

// const CustomPreviewTitle = ({ channel }) => (
//     <Text>
//       {channel.data.customProperty} - {channel.data.name}
//     </Text>
//   );

const ChatScreen = (props: ChatScreenProps) => {
  return (
    <>
      <CustomHeader title="All Chat" enableSearch={true} />
      <ChannelList onSelect={props.onSelect} Preview={CustomListItem} />
    </>
  );
};

export default ChatScreen;
