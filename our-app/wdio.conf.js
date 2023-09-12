const visualOptions = {
    apiKey: process.env.SCREENER_API_KEY,
    projectName: 'new-app-2',
    scrollAndStitchScreenshots: true
};

const sauceOptions = {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY
};

exports.config = {
    //runner: 'local',
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us',
    specs: ['./test/specs/**/*.js'],
    exclude: [],
    maxInstances: 10,
    capabilities: [
    {
        browserName: 'chrome',
        platform: 'windows 10',
        browserVersion: 'latest',
        'sauce-options': {
            ...sauceOptions,
        },
        'sauce-visual': {
            ...visualOptions,
            viewportSize: '1366x768'
        }
    },
    {
        browserName: 'safari',
        platform: 'macOS 10.15',
        browserVersion: 'latest',
        'sauce-options': {
            ...sauceOptions,
        },
        'sauce-visual': {
            ...visualOptions,
            viewportSize: '375x812'
        }
    }
    ],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost:3000/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        [
            'sauce',
            {
                sauceConnect: true,
                sauceConnectOpts: {
                    // Agrega las opciones de Sauce Connect aquí si es necesario
                    // Consulta más en https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy+Command-Line+Quick+Reference+Guide
                }
            }
        ],
        'screenshot',
        'visual-regression',
        {
            compare: new (require('wdio-visual-regression-service/compare/LocalCompare'))({
                referenceName: 'baseline',
                screenshotName: 'screenshot',
                diffName: 'diff'
            }),
            viewportChangePause: 300,
            viewports: [{ width: 1920, height: 1080 }],
            orientations: ['landscape']
        }
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
};
