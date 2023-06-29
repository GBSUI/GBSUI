import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import polyfills from "rollup-plugin-node-polyfills";
import json from "@rollup/plugin-json";
import pkg from "./package.json" assert {type: "json"};

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: pkg.main,
                format: "cjs",
                sourceMap: true
            },
            {
                file: pkg.module,
                format: "esm",
                sourceMap: true
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript( {
                tsconfig: "./tsconfig.json",
                exclude: ["**/*.test.ts", "./jest.config.ts"]
            }),
            polyfills(),
            json(),

        ],
        external: [
            "react",
            "react-dom",
            "react-helmet",
            "react-lottie",
            "tslib",
            "typescript",
            "styled-components",
        ]
    },
    {
        input: "lib/esm/types/index.d.ts",
        output: [
            {
                file: "lib/index.d.ts",
                format: "esm"
            }
        ],
        plugins: [
            dts()
        ]
    }
];