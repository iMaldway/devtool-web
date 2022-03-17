const state = {
    isCollapse: false
}
const mutations = {
    SET_IS_COLLAPSE: (state: any, isCollapse: boolean) => {
        state.isCollapse = isCollapse
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}