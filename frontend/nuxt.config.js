import colors from 'vuetify/es5/util/colors'


export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        titleTemplate: '%s',
        title: 'frontend',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/icon?family=Material+Icons"
            }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: ["~plugins/vuetify.js", '~/plugins/vue-formulate'],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: ['@nuxtjs/axios',   '@nuxtjs/localforage',],
    auth: {
        localStorage: {
            prefix: 'auth.'
        }
    },

    // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            // default theme is light mode
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue,
                    secondary: colors.teal.darken4,
                    accent: colors.teal.accent4,
                    error: colors.deepOrange.accent2,
                    info: colors.grey.darken3,
                    success: colors.green.accent3,
                    warning: colors.amber.base,
                },
                light: {
                    primary: '#1976D2',
                    secondary: colors.teal.lighten3,
                    accent: colors.teal.accent4,
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',

                }
            }
        }
    },
    axios: {
        baseURL: 'https://ucam-it.herokuapp.com', // Used as fallback if no runtime config is provided
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {}
}