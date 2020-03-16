module.exports = {
    "extends": "eslint:recommended",
    "plugins": [
        "standard",
        "promise"
    ],
    rules: {
        "strict": "warn",
        "complexity": ["error", 4],
        "default-case": "error",
        "no-alert": "warn",
        "no-self-compare": "error",
        "indent": [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": "error",
        "quotes": ["error", "double"],
        "curly": ["warn", "all"],
        "no-mixed-spaces-and-tabs": "error"
    }
};