import {browser, Config} from "protractor";

export let config: Config = {
    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome'
    },
    specs: ['./specs/tag-manager.e2e.spec.js'],
    seleniumAddress: 'http://localhost:4444/wd/hub',
    onPrepare() {
        browser.driver.manage().window().maximize()},
    allScriptsTimeout: 60000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000,
    },
    noGlobals: true
};