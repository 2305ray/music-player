[README.md](https://github.com/user-attachments/files/32347941/README.md)
# music-player

Um player de música feito em React, com uma playlist simples, barra de progresso clicável e controles de play/pause, próxima e anterior. Dando dois cliques rápidos no botão de voltar, ele pula pra faixa anterior; um clique só reinicia a música atual.

## 🚀 Tecnologias utilizadas

- React
- TypeScript
- Vite
- styled-components
- phosphor-react (ícones)

## 📦 Como rodar o projeto

```bash
# clone o repositório
git clone https://github.com/2305ray/music-player.git
cd music-player

# instale as dependências
npm install

# rode em modo desenvolvimento
npm run dev
```

Outros scripts disponíveis:

- `npm run build` — gera a versão de produção
- `npm run preview` — visualiza o build de produção localmente
- `npm run lint` — roda o ESLint

## 📁 Estrutura

As músicas e capas usadas no player ficam em `src/assets/resources` e `public/`, e a lista de faixas tocadas é definida em `src/components/musics.tsx`. Toda a lógica de tocar/pausar/avançar/voltar fica no componente `src/components/audioPlayer.tsx`.
