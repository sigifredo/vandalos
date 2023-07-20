# Vándalos

Este es un proyecto realizado por mi para el Observatorio de Contenidos Audiovisuales y Multimediales (OCAM) de la Universidad de Antioquia.

## Iniciar servidor de desarrollo

Para iniciar el servidor:

    $ npm run dev

## Preparar el proyecto para producción

Para instalar el ofuscador:

    $ npm install --save-dev javascript-obfuscator

Para usarlo:

    $ ./node_modules/javascript-obfuscator/bin/javascript-obfuscator <archivo a ofuscar>

Para minimizar el SCSS:

    $ sass --sourcemap=none --style=compressed scss/style.scss:css/style.css
