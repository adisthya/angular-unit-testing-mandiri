// fungsi untuk mengkonversi rgb value ke hex value color code.
const rgb2hex = (rgb: any) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map((n: any) => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

describe('5. IntroPageComponent test scenario', () => {

});
