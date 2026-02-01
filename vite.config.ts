import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        games: resolve(__dirname, 'pages/games.html'),
        missing_letters: resolve(__dirname, 'pages/missing_letters.html'),
        word_hunt: resolve(__dirname, 'pages/word_hunt.html'),
        video_tutorials: resolve(__dirname, 'pages/video_tutorials.html'),
        ideas_mnemonics: resolve(__dirname, 'pages/ideas_mnemonics.html'),
        challenges: resolve(__dirname, 'pages/challenges.html'),
      },
    },
  },
});
