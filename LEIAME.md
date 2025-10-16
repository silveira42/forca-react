# Forca React (Jogo da Forca)

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/silveira42/forca-react/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/silveira42/forca-react/blob/main/LEIAME.md)

Um jogo da forca moderno e multilíngue construído com React e TypeScript. Jogue sozinho contra palavras geradas aleatoriamente ou desafie seus amigos no modo multiplayer!

**[🎮 Jogue aqui!](https://forca.thesilver.com.br)**

![Version](https://img.shields.io/badge/version-2.0.2-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.4.2-3178c6.svg)

## 🎮 Funcionalidades

### Modos de Jogo

- **Um Jogador**: Desafie-se com palavras selecionadas aleatoriamente de listas de palavras curadas
- **Multiplayer**: Jogue com amigos - um jogador define a palavra, outro tenta adivinhar

### Níveis de Dificuldade

- **Fácil**: Palavras comuns e frequentemente usadas
- **Médio**: Vocabulário moderadamente comum
- **Difícil**: Palavras incomuns e desafiadoras

### Internacionalização

- **Português (pt-BR)**: Usa listas de palavras ICF (Frequência Inversa de Corpus) para vocabulário português autêntico
- **Inglês (en)**: Integra-se com o repositório CEL (Common English Lexicon) para palavras de qualidade em inglês

### Funcionalidades Adicionais

- 🔒 **Entrada de Palavra Estilo Senha**: Entrada segura de palavra para o modo multiplayer com funcionalidade de segurar para revelar
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop e dispositivos móveis
- 🎨 **Interface Limpa**: Interface moderna e intuitiva com visualização da forca em ASCII art

## 🎯 Como Jogar

### Modo Um Jogador

1. Selecione seu nível de dificuldade preferido (Fácil, Médio ou Difícil)
2. Clique em "INICIAR" para começar com uma palavra gerada aleatoriamente
3. Adivinhe as letras uma por vez
4. Tente completar a palavra antes de ficar sem tentativas!

### Modo Multiplayer

1. Jogador 1 insere uma palavra secreta (oculta enquanto você digita)
2. Segure o ícone do olho para revelar a palavra temporariamente
3. Clique em "INICIAR" para começar
4. Jogador 2 tenta adivinhar a palavra letra por letra

## 🚀 Começando

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Docker (opcional, para implantação em container)

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/silveira42/forca-react.git
cd forca-react
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
```

A aplicação abrirá no seu navegador em `http://localhost:3000`

## 🐳 Implantação com Docker

### Modo de Desenvolvimento

```bash
npm run docker-dev-up
npm run docker-dev-down  # Para parar
```

### Modo de Produção

```bash
npm run docker-prod-build
npm run docker-prod-up
```

## 🛠️ Detalhes Técnicos

### Normalização de Palavras

O jogo inclui um sistema sofisticado de normalização de palavras que:

- Remove acentos e diacríticos (ç→c, á→a, ê→e, etc.)
- Remove caracteres numéricos
- Remove símbolos especiais
- Preserva o tratamento de maiúsculas e minúsculas

### Fontes de Palavras

- **Português**: [lista ICF pt-br](https://github.com/fserb/pt-br) - Palavras pontuadas por Frequência Inversa de Corpus
- **Inglês**: [Repositório CEL](https://github.com/Fj00/CEL) - Common English Lexicon com filtragem baseada em frequência

### Gerenciamento de Estado

- API de Contexto do React para gerenciamento de estado global
- Contextos separados para estado em nível de aplicação e de jogo
- Hooks personalizados para persistência em localStorage

## 🌐 Suporte a Navegadores

- Chrome (mais recente)
- Firefox (mais recente)
- Safari (mais recente)
- Edge (mais recente)

## 📄 Licença

Este projeto é open source e está disponível sob a [Licença MIT](LICENSE).

## 👨‍💻 Autores

Desenvolvido por: **Bruno Silveira**

- GitHub: [@silveira42](https://github.com/silveira42)
- LinkedIn: [@silveirabruno842](https://www.linkedin.com/in/silveirabruno842)

Design feito por: **Thamires Impalea**

- GitHub: [@impalea](https://github.com/impalea)
- LinkedIn: [@impalea](https://www.linkedin.com/in/impalea/)


## 🤝 Contribuindo

Contribuições, issues e solicitações de funcionalidades são bem-vindas! Sinta-se à vontade para verificar a [página de issues](https://github.com/silveira42/forca-react/issues).

## ⭐ Mostre seu Apoio

Dê uma ⭐️ se você gostou deste projeto!

## 📝 A FAZER

### Alta Prioridade

- [ ] **Rodapé**: Adicionar um rodapé adequado com créditos, links e informações de versão
- [ ] **Modais de Vitória/Derrota**: Criar modais de celebração/game over com estatísticas e opções de jogar novamente
- [ ] **Modal de Instruções**: Adicionar modal de ajuda/tutorial explicando as regras e controles do jogo
- [ ] **Melhor Responsividade Mobile**: Melhorar layout e interações touch para dispositivos móveis
- [ ] **Nomes de Jogadores no Multiplayer**: Adicionar entrada de nomes para jogadores e implementar sistema de pontuação

### Melhorias

- [ ] **Efeitos Sonoros**: Adicionar feedback de áudio para acertos/erros e fim de jogo
- [ ] **Animações**: Transições suaves para desenho da forca e revelação de letras
- [ ] **Painel de Estatísticas**: Rastrear vitórias, derrotas, sequências e dificuldade favorita
- [ ] **Sistema de Dicas**: Dicas opcionais para modo single-player (consome pontos/vidas)
- [ ] **Categorias de Palavras**: Permitir que jogadores escolham categorias (animais, comida, países, etc.)
- [ ] **Modo Cronometrado**: Desafios cronometrados opcionais para jogadores avançados
- [ ] **Atalhos de Teclado**: Navegação completa por teclado e melhorias de acessibilidade
- [ ] **Listas de Palavras Personalizadas**: Permitir que usuários importem/criem listas de palavras personalizadas
- [ ] **Sistema de Conquistas**: Desbloquear badges e conquistas por marcos alcançados
- [ ] **Compartilhar Resultados**: Compartilhar resultados do jogo em redes sociais sem spoilers
- [ ] **Progressive Web App (PWA)**: Habilitar jogo offline e instalação
- [ ] **Modo Daltônico**: Adicionar esquemas de cores alternativos para acessibilidade
- [ ] **Definições de Palavras**: Mostrar definições das palavras após completar o jogo (recurso educativo)

---

Feito com ❤️ usando React e TypeScript
