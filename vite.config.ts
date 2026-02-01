import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        games_page: resolve(__dirname, 'pages/games.html'),
        missing_letters_page: resolve(__dirname, 'pages/missing_letters.html'),
        word_hunt_page: resolve(__dirname, 'pages/word_hunt.html'),
        video_tutorials_page: resolve(__dirname, 'pages/video_tutorials.html'),
        ideas_mnemonics_page: resolve(__dirname, 'pages/ideas_mnemonics.html'),
        challenges_page: resolve(__dirname, 'pages/challenges.html'),
        components: resolve(__dirname, 'assets/js/components.js'),
        dashboard: resolve(__dirname, 'assets/js/dashboard.js'),
        games: resolve(__dirname, 'assets/js/games.js'),
        i18n: resolve(__dirname, 'assets/js/i18n.js'),
        ideasMnemonics: resolve(__dirname, 'assets/js/ideasMnemonics.js'),
        missingLetters: resolve(__dirname, 'assets/js/missingLetters.js'),
        safariAudio: resolve(__dirname, 'assets/js/safariAudio.js'),
        videoTutorials: resolve(__dirname, 'assets/js/videoTutorials.js'),
        wordHunt: resolve(__dirname, 'assets/js/wordHunt.js'),
      },
    },
  },
});