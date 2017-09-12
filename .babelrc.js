'use strict';

const babel = {
    presets: [
        [
            'env',
            {
                targets: {
                    node: '4.0.0',
                },
                useBuiltIns: true,
            },
        ],
    ],
};

module.exports = babel;
