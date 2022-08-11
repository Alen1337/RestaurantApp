/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './client/scripts/**.js',
    './client/scripts/**/**.js',
    './client/scripts/**/**/**.js',
    './client/scripts/**/**/**/**.js',
    './client/views/*.ejs'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    }
  ],
}
