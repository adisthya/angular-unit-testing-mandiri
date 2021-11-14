# Sebelum Memulai

## Persiapan Awal

Clone project repository ini ke folder `Desktop` di laptop kalian, melalui [repository](https://github.com/adisthya/angular-unit-testing.git) ini.

```shell
git clone https://github.com/adisthya/angular-unit-testing.git 
```

Setelah selesai clone project, pastikan semua dependencies sudah di-install dengan cara sebagai berikut.

```shell
npm install
```

> Buka `terminal` atau `command prompt` pada laptop, dan pastikan kalian sudah berada di root project folder.

## Konfigurasi Project

### 1. Konfigurasi file `tsconfig.json`

Buka file `tsconfig.json` dan tambahkan line berikut setelah property `strict`.

```text
...
"strict": true,
"strictPropertyInitialization": false,
...
```

### 2. Konfigurasi file `karma.conf.js`

Install `devDependencies` berikut:

```shell
npm i --save-dev karma-firefox-launcher
```

> Browser yang akan digunakan adalah [Browser Firefox](https://www.mozilla.org/en-US/firefox/new).

> Untuk mengetahui browser yang didukung oleh karma, dapat [dilihat di sini](http://karma-runner.github.io/latest/config/browsers.html).

Untuk memastikan konsistensi output unit testing, perlu dilakukan beberapa perubahan pada file `karma.conf.js`. 

```js
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
        random: false,
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: false,
    restartOnFileChange: true
  });
};
```

> Pastikan konfigurasi di atas sudah sama dengan konfigurasi yang ada di project kalian.

---

[Kembali](../README.md) | [Berikutnya](./unit-test-intro.md)
