import {createVariableColors, variableColorsPlugin} from "tailwindcss-variable-colors";
import colors from "tailwindcss/colors"


module.exports = {
    content: [
        "./components/**/*.{vue,js,ts}",
        "./pages/**/*.vue",
        "./layouts/**/*.vue",
        "./app.vue",
    ],
    theme: {
        colors: createVariableColors(colors),
    },
    plugins: [variableColorsPlugin(colors)]
}