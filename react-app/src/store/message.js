//types
const LOAD_MESSAGES = 'messages/LOAD_MESSAGES';
const ADD_MESSAGE = 'messages/ADD_MESSAGE';
// const EDIT_MESSAGE = 'messages/EDIT_MESSAGE';

// POJO action creators:
const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

const addMessage = message => ({
    type: ADD_MESSAGE,
    message
});

// const editMessage = message => ({
//     type: EDIT_MESSAGE,
//     message
// });

// thunk action creators:
export const getChannelMessages = (channelId) => async dispatch => {
    const resMessages = await fetch(`/api/channels/${channelId}/messages`);

    // might need to query emojis based on url, only have ids on resMessages

    if (resMessages.ok) {
      const channelMessages = await resMessages.json();
      dispatch(loadMessages(channelMessages));
    }
};

export const createMessage = (message) => async dispatch => {
    const resMessage = await fetch(`/api/messages`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(message)
    });

    if (resMessage.ok) {
        const message = await resMessage.json();
        dispatch(addMessage(message));
        return message;
    }
};

// export const updateMessage = (message, messageId) => async dispatch => {

// };


// initial state for reducer:
const initialState = {};

// reducer:
const messageReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_MESSAGES:
            const messagesArr = Object.values(action.messages);
            messagesArr.forEach(message => {
                newState[message.id] = message;
            });
            return newState;
        case ADD_MESSAGE:
            newState = {...state};
            newState[action.message.id] = action.message;
            return newState;
        // case EDIT_MESSAGE:
        //     return {

        //     }
        default:
            return state;
    }
}

export default messageReducer;
