import React from 'react';
import {useChatContext} from '../../customHooks/ChatContext';
import {
  Channel,
  MessageList,
  MessageInput,
  useMessageInputContext,
  useMessageContext,
  AutoCompleteInput,
} from 'stream-chat-react-native';
import CustomHeader from '../../components/CustomerHeader';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icons} from '../../assets/icons';
import {Constants} from '../../config/Constant';
import Colors from '../../theme/Colors';

const StreamButton = () => {
  const {sendMessage, text, imageUploads, fileUploads} =
    useMessageInputContext();
  const isDisabled = !text && !imageUploads.length && !fileUploads.length;

  return (
    <TouchableOpacity disabled={isDisabled} onPress={sendMessage}>
      <Image {...Icons.SEND} />
    </TouchableOpacity>
  );
};

const CustomAvatar = () => {
  const {message} = useMessageContext();

  return <Image source={{uri: message?.user?.image}} />;
};

const CustomMessage = () => {
  const {message, isMyMessage} = useMessageContext();
  //   console.log('message', message.user?.name);

  return (
    <>
      <View
        style={[
          style.chatStyle,
          //   {backgroundColor: isMyMessage ? 'skyblue' : 'white'},
        ]}>
        <Image {...Icons.AVATAR} />
        {/* <Image source={{uri: message.user?.image}} /> */}
        <Text style={style.userName}>
          {message?.user?.name} {'\n'}
          <Text style={style.chatText}>{message?.text}</Text>
        </Text>
        <View style={style.flex} />
        <TouchableOpacity>
          <Image {...Icons.DELETE} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const CustomInput = () => {
  const {sendMessage, text} = useMessageInputContext();

  return (
    <View style={style.fullWidth}>
      {/* <ImageUploadPreview />
      <FileUploadPreview /> */}

      <View style={style.row}>
        <TouchableOpacity onPress={sendMessage}>
          <Image {...Icons.BACKWARD} />
        </TouchableOpacity>

        <AutoCompleteInput
          additionalTextInputProps={{
            placeholder: Constants.ENTER_MESSAGE,
            placeholderTextColor: Colors.placeholder,
            style: [style.inputText, style.fullWidth],
          }}
        />

        <TouchableOpacity onPress={sendMessage} disabled={!text}>
          <Image {...Icons.SEND} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ChatRoomScreen = () => {
  const {currentChannel} = useChatContext();
  return (
    <View style={style.mainContainer}>
      <CustomHeader
        title={currentChannel?.data?.name}
        enableImage={true}
        // image={{uri: currentChannel?.data?.image}}
        image={Icons.PLANHUB}
      />
      <Channel
        channel={currentChannel}
        disableTypingIndicator
        enforceUniqueReaction
        initialScrollToFirstUnreadMessage
        MessageAvatar={CustomAvatar}
        MessageSimple={CustomMessage}
        Input={CustomInput}>
        <MessageList />
        <View style={style.upperMessageInput}>
          <View style={style.messageInput}>
            <MessageInput SendButton={StreamButton} />
          </View>
        </View>
      </Channel>
    </View>
  );
};

export default ChatRoomScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: '20%',
    backgroundColor: Colors.white,
  },
  chatStyle: {
    padding: 10,
    margin: 6,
    flexDirection: 'row',
  },
  userName: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
    marginLeft: 10,
  },
  chatText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.black,
  },
  upperMessageInput: {
    paddingHorizontal: 16,
  },
  messageInput: {
    padding: 16,
    borderRadius: 6,
    backgroundColor: Colors.lightGrey,
  },
  fullWidth: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    height: 30,
  },
  inputText: {
    fontWeight: '400',
    fontSize: 14,
    // color: '#BEC1C5',
  },
  flex: {
    flex: 1,
  },
});
