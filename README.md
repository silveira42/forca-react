# Forca React (Hangman Game)

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/silveira42/forca-react/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/silveira42/forca-react/blob/main/LEIAME.md)

A modern, multilingual Hangman game built with React and TypeScript. Play solo against randomly generated words or challenge your friends in multiplayer mode!

**[🎮 Play it here!](https://hangman.thesilver.com.br)**

![Version](https://img.shields.io/badge/version-2.0.1-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.4.2-3178c6.svg)

## 🎮 Features

### Game Modes

- **Single Player**: Challenge yourself with randomly selected words from curated word lists
- **Multiplayer**: Play with friends - one player sets the word, another guesses

### Difficulty Levels

- **Easy**: Common, frequently used words
- **Medium**: Moderately common vocabulary
- **Hard**: Uncommon and challenging words

### Internationalization

- **Portuguese (pt-BR)**: Uses ICF (Inverse Corpus Frequency) word lists for authentic Portuguese vocabulary
- **English (en)**: Integrates with CEL (Common English Lexicon) repository for quality English words

### Additional Features

- 🔒 **Password-style Word Input**: Secure word entry for multiplayer mode with hold-to-reveal functionality
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Clean UI**: Modern, intuitive interface with ASCII art hangman visualization

## 🎯 How to Play

### Single Player Mode

1. Select your preferred difficulty level (Easy, Medium, or Hard)
2. Click "START" to begin with a randomly generated word
3. Guess letters one at a time
4. Try to complete the word before running out of attempts!

### Multiplayer Mode

1. Player 1 enters a secret word (hidden as you type)
2. Hold the eye icon to reveal the word temporarily
3. Click "START" to begin
4. Player 2 attempts to guess the word letter by letter

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/silveira42/forca-react.git
cd forca-react
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## 🐳 Docker Deployment

### Development Mode

```bash
npm run docker-dev-up
npm run docker-dev-down  # To stop
```

### Production Mode

```bash
npm run docker-prod-build
npm run docker-prod-up
```

## 🛠️ Technical Details

### Word Normalization

The game includes a sophisticated word normalization system that:

- Removes accents and diacritics (ç→c, á→a, ê→e, etc.)
- Strips numerical characters
- Removes special symbols
- Preserves case sensitivity handling

### Word Sources

- **Portuguese**: [pt-br ICF list](https://github.com/fserb/pt-br) - Inverse Corpus Frequency scored words
- **English**: [CEL Repository](https://github.com/Fj00/CEL) - Common English Lexicon with frequency-based filtering

### State Management

- React Context API for global state management
- Separate contexts for app-level and game-level state
- Custom hooks for localStorage persistence

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Authors

Developed by: **Bruno Silveira**

- GitHub: [@silveira42](https://github.com/silveira42)
- LinkedIn: [@silveirabruno842](https://www.linkedin.com/in/silveirabruno842)

Designed by: **Thamires Impalea**

- GitHub: [@impalea](https://github.com/impalea)
- LinkedIn: [@impalea](https://www.linkedin.com/in/impalea/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/silveira42/forca-react/issues).

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

## 📝 TODO

### High Priority

- [ ] **Footer**: Add a proper footer with credits, links, and version info
- [ ] **Game Won/Lost Modals**: Create celebration/game over modals with statistics and replay options
- [ ] **Instructions Modal**: Add a help/tutorial modal explaining game rules and controls
- [ ] **Better Mobile Responsivity**: Improve layout and touch interactions for mobile devices
- [ ] **Multiplayer Player Names**: Add name input for players and implement score tracking system

### Enhancements

- [ ] **Sound Effects**: Add audio feedback for correct/incorrect guesses and game end
- [ ] **Animations**: Smooth transitions for hangman drawing and letter reveals
- [ ] **Statistics Dashboard**: Track wins, losses, streaks, and favorite difficulty
- [ ] **Hint System**: Optional hints for single-player mode (consume points/lives)
- [ ] **Word Categories**: Allow players to choose word categories (animals, food, countries, etc.)
- [ ] **Timer Mode**: Optional timed challenges for advanced players
- [ ] **Keyboard Shortcuts**: Full keyboard navigation and accessibility improvements
- [ ] **Custom Word Lists**: Allow users to import/create custom word lists
- [ ] **Achievement System**: Unlock badges and achievements for milestones
- [ ] **Share Results**: Share game results on social media with spoiler-free formatting
- [ ] **Progressive Web App (PWA)**: Enable offline play and installation
- [ ] **Colorblind Mode**: Add alternative color schemes for accessibility
- [ ] **Word Definitions**: Show word definitions after game completion (educational feature)

---

Made with ❤️ using React and TypeScript
