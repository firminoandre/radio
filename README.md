# Radio Browser

A aplicaçao esta hospedada na Vercel em:

Esta aplicação possibilita ao usuário ouvir rádios que estão disponíveis via API (https://www.radio-browser.info/)

## Tecnologias usadas

- TypeScript
- Vue.js 3
- TailwindCSS
- Axios (requisições HTTP)
- Lottie

## Sobre testes unitários

Disponíveis em src/tests

## Executando o projeto com Docker

Na raiz da aplicação, construa a imagem e o container com:

```sh
docker compose build
```

Para rodar a aplicação, execute:

```sh
docker run -it -p 8080:8080 --rm --name radio radio-vue-app
```

## Como executar o projeto sem Docker

Clone este repositório no seu ambiente, entre no diretório e rode:

```sh
npm install
```

### Execução para desenvolvimento local

```sh
npm run dev
```

### Type-Check, Compilação e minificação para Produção

```sh
npm run build
```

### Executar o lint do projeto [ESLint](https://eslint.org/)

```sh
npm run lint
```
