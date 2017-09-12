/* eslint strict:off, global-require:off */

'use strict';

module.exports = wallaby => {
    return {
        files: [
            {
                pattern: 'src/**/__sandbox__/**/*',
                instrument: false,
            },
            'src/**/*.js',
            'jest.config.js',
            '.env',
            '.babelrc',
            '.babelrc.js',
            'src/**/*.snap',
            '!src/**/*.test.js',
        ],
        tests: [
            'src/**/*.test.js',
        ],

        compilers: {
            '**/*.js': wallaby.compilers.babel(),
        },

        hints: {
            ignoreCoverage: /ignore coverage/,
        },

        env: {
            type: 'node',
            runner: 'node',
        },

        testFramework: 'jest',

        setup: w => {
            /**
             * https://github.com/wallabyjs/public/issues/1268#issuecomment-323237993
             */
            if (w.projectCacheDir !== process.cwd()) {
                process.chdir(w.projectCacheDir);
            }

            process.env.NODE_ENV = 'test';
            const jestConfig = require('./jest.config');
            jestConfig.transform = { '__sandbox__.+\\.jsx?$': 'babel-jest' };
            w.testFramework.configure(jestConfig);

            // require('babel-polyfill');
            // w.testFramework.configure(
            //     Object.assign({}, jestConfig, {
            //         globals: {
            //             regeneratorRuntime: global.regeneratorRuntime,
            //         },
            //     })
            // );
        },
    };
};
