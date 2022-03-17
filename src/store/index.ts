import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import config from './config'

const modulesFiles = require.context('./modules', true, /\.js|\.ts$/);
let obj: any = {}
const modules: any = modulesFiles.keys().reduce((modules, modulePath): any => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, obj)


export default createStore({
    state: {
        serviceName: 'devtool-web',
        config
    },
    mutations: {},
    actions: {},
    getters: {},
    modules,
    plugins: [
        createPersistedstate({
            key: 'saveInfo',
            paths: ['app', 'layout']
        })
    ]
})