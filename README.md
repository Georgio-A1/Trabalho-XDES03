# Trabalho-XDES03
# Aplicativo Web de Avaliação de Jogos

Este projeto é um aplicativo web para avaliações de jogos. Ele permite que os usuários busquem informações detalhadas sobre um jogo específico, leiam avaliações de outros usuários e também submetam suas próprias avaliações. Seu funcionamento é fundamentado pelo  consumo da <a href="https://api-docs.igdb.com/#getting-started">API IGDB</a>

## Tecnologias Utilizadas

<p>Abaixo segue as tecnologias utilizadas para o desenvolvimento da aplicação:</p>

<h3>Front-end</h3>
- <strong><a href="https://pt-br.reactjs.org/">React</a></strong><br>
- <strong><a href="https://reactrouter.com/">React Router</a></strong><br>
- <strong><a href="https://vitejs.dev/">Vite</a></strong><br>
- CSS para estilização

<h3>Back-end</h3>
- <strong><a href="https://nodejs.org/pt-br/about">Node.JS</a></strong><br>
- <strong><a href="https://expressjs.com/">ExpressJS</a></strong><br>
- <strong><a href="https://www.npmjs.com/about">NPM</a></strong><br>
- <strong><a href="https://www.npmjs.com/package/igdb-api-node">igdb-api-node</a></strong>

## Recursos

- <strong>Exibição de informações do jogo</strong>
- <strong>Paginação de avaliações</strong>
- <strong>Formulário de envio de avaliações</strong>
- <strong>Classificação por estrelas para avaliações</strong>
- Hooks `useEffect` para buscar dados do jogo quando o componente é montado ou o parâmetro `id` muda
- Solicitação POST para enviar uma nova avaliação
- Paginação de avaliações

### CSS

O projeto usa CSS para estilização, fornecendo uma interface responsiva e limpa.

### Pré-requisitos
Para a execução dos comandos citados abaixo, é necessário possuir os ambientes React.JS e Node.JS configurados em sua máquina.

## Como Começar

Para executar este projeto localmente:

1. Clone este repositório: `git clone https://github.com/Georgio-A1/Trabalho-XDES03.git`
2. Instale as dependências do projeto executando no terminal dentro dos diretórios /front e /back o comando: `npm install`
3. Se necessário, instale também o React Router e o Vite:<br>
   `npm install react-router-dom`<br>`npm install -g create-vite`
5. Execute o aplicativo: `npm run dev`
6. Execute o backend: `npx nodemon`


## Contribuindo

Solicitações pull são bem-vindas. Para grandes alterações, abra uma issue primeiro para discutir o que você gostaria de alterar.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)