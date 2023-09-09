# Sistema de Atualização de Preços

Este é um sistema desenvolvido para realizar a validação e atualização de preços de produtos com base em um arquivo de precificação. Ele inclui um back-end desenvolvido em Node.js e um front-end construído com React.js. 
O sistema utiliza um banco de dados MySQL versão 8 para armazenar as informações dos produtos.

## 💻 Requisitos
Para executar este sistema, você deve atender aos seguintes requisitos:

-    Node.js (versão 18.13 ou superior)
-    npm 
-    Banco de Dados MySql (versão 8)

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([React](https://reactjs.org/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Axios](https://github.com/axios/axios)**


#### **Server**  ([NodeJS](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[dotENV](https://www.npmjs.com/package/dotenv)**
-   **[Multer](https://github.com/expressjs/multer)**
-   **[CSVParser](https://csv.js.org/parse/)**


## ⚙️ Configuração 

1. Clone o repositório:
```
git clone https://github.com/igorfmontenegro/teste-shopper
```
2. Acesse a pasta do projeto:
```
cd Shopper
```
3. Instale as dependências do back-end:
```
cd backend
npm install
```
4. Instale as dependências do front-end:
```
cd frontend
npm install
```
5. Configure o banco de dados MySQL com as informações necessárias e crie um arquivo **./env** na pasta raiz do back-end com as variáveis de ambiente necessárias:
```
HOST = ""
USER = ""
PASSWORD = ""
DATABASE = "products"
```
6. Inicie o back-end:
```
cd backend
npm run dev
```

7. Inicie o front-end:
```
cd frontend
npm run dev
```
Agora, o sistema deve estar em execução e acessível no seu navegador em **_http://localhost:3000_**


## 🚀 Uso

O sistema permite ao usuário carregar um arquivo de precificação e realizar a validação dos produtos. Siga os passos abaixo:

1. Na página inicial, clique no botão "Enviar Arquivo" para selecionar o arquivo de precificação. Só estarão disponíveis arquivos com a extensão **.csv**.
2. Após selecionar o arquivo, clique no botão "Validar" para iniciar a validação.
3. O sistema verificará se todos os campos necessários são válidos e se os códigos de produtos existem no banco de dados.
4. Os dados validados serão apresentados na tabela, os inválidos serão descartados.

## 🚧 Dificuldades

Encontrei algumas dificuldades na elaboração do projeto, me impedindo de terminar em tempo hábil. Pretendo me empenhar para solucioná-las de forma a complementar meus conhecimentos. Alguns delas foram:
* A falta de um roadmap, acabei refazendo o código diversas vezes por um caminho conflitar com o outro.
* Minha ideia foi criar uma coluna temporária no banco de dados com os dados da coluna do arquivo carregado. Porém, os dados só eram inseridos após atualizar a página e carregar o documento pela segunda vez.
* Com a dificuldade citada acima, me impediu de prosseguir com a minha ideia, que era excluir essa coluna temporária após a página ser atualizada ou ter seu fluxo concluído (todos os dados validados, para assim, poder atualizar).
* Tratar os erros e retorná-los no front-end. A implementação de um middleware talvez fosse o ideal, mas não consegui fazê-lo a tempo.

## 👋🏽 Agradecimentos

De toda forma, agradeço a oportunidade. Foram dias bastante intensos, de muitas horas codando, e de uma sensação ótima de realmente estar trabalhando na área. 
Continuarei me empenhando e me aperfeiçoando para conseguir concluir a tempo no próximo desafio.

