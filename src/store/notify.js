export default {
    state: {
        messages: [],
        loadMore: 0,
        step: 2,
    },
    getters: {
        getMessage(state) {
            return state.messages;
        },
        getMessageToShow(state) {
            const mainMessages = state.messages.filter(mes => mes.main === true) || [];
            let moreMessages = [];
            if (state.loadMore > 0) {
                moreMessages = state.messages
                    .filter(mes => mes.main === false)
                    .slice(0, state.loadMore * state.step);
            } 
            return [
                ...mainMessages, 
                ...moreMessages
            ];
        },    
    },    
    mutations: {
        setMessage(state, payload) {
            state.messages = payload;
        },
        loadMoreMessages(state) {           
            state.loadMore += 1;
        }
    },
    actions: {
        setMessage({commit}, payload) {
            commit('setMessage', payload);
        },
        loadMoreMessages({commit, getters}) {
            commit('loadMoreMessages');
        }
    },
}