Integrantes:
Kauã Gabriel da Silva Antunes RA: 22453704


Um PWA (Progressive Web App) de timer Pomodoro construído com HTML/CSS/JS, utilizando o Service Worker para suporte offline e conectado a um backend Node.js. Este projeto demonstra a orquestração de microsserviços com Docker Compose, consumo de API externa e automação de deploy com CI/CD.Este projeto foi desenvolvido como parte dos requisitos da disciplina de Bootcamp II e atende às especificações de ter uma camada de API, testes e integração contínua.
Arquitetura e Orquestração:
O projeto adota uma arquitetura de microsserviços e é inteiramente containerizado e orquestrado com Docker Compose. Ele é dividido em dois serviços principais que se comunicam internamente:Serviço web (Frontend PWA)O frontend é um PWA estático (HTML, CSS, JavaScript) servido por um container Nginx. Sua responsabilidade é fornecer a interface do usuário, registrar o manifest.webmanifest (para instalação) e o sw.js (para cache e funcionalidade offline). O PWA faz requisições HTTP para o serviço api (backend).Serviço api (Backend Node.js/Express)O backend é uma API RESTful desenvolvida em Node.js/Express. Ele serve como um proxy para a API pública Quotable. A principal função do backend é receber a requisição do frontend, fazer a chamada segura à API externa e retornar apenas os dados necessários ao PWA.
Fluxo de Comunicação:
O PWA (rodando no navegador do usuário) se comunica diretamente com a porta exposta do nosso backend (http://localhost:3001 na execução local) para solicitar a citação.
Como Rodar Localmente:
Para iniciar a aplicação, é necessário ter o Docker Desktop ou o Docker Engine e Docker Compose instalados.
Navegue até a pasta raiz:Bashcd seu-repositorio
Suba os containers e faça o build:Bashdocker-compose up --build
Acesse a Aplicação e a API:PWA (Frontend): O serviço web está disponível em http://localhost:8080.API (Backend): O serviço de API pode ser acessado em http://localhost:3001/api.
Endpoints da API:
Os endpoints expostos pelo serviço api (backend) em Node.js.MétodoRotaDescriçãoGET/apiRota de "health check" para confirmar que o servidor Node.js está ativo.GET/api/get-quoteRota principal. Consome a API pública Quotable para buscar uma citação aleatória e a retorna.
Testes e Qualidade:
O projeto incorpora Jest para testes unitários no backend e Playwright para testes End-to-End (E2E) no frontend (PWA), garantindo a qualidade da lógica e da jornada do usuário.Testes Unitários (Backend - Jest)Os testes são executados dentro do container api e verificam a funcionalidade das rotas e a manipulação de dados.Comando para execução:Bashdocker-compose exec api npm test
Testes End-to-End (Frontend - Playwright)Os testes E2E validam a interação completa do usuário no navegador (ex: clicar em iniciar, pausar, verificar se o contador da tela diminui e se a citação da API é exibida após o ciclo).O comando de execução será adicionado após a implementação dos scripts de teste.
Deploy (CI/CD):
O processo de entrega é automatizado utilizando GitHub Actions para CI/CD (Integração e Entrega Contínua).Pipeline de CI/CDO workflow é definido em .github/workflows/deploy.yml e é disparado a cada push para a branch main.Build e Teste: O pipeline constrói os containers (Docker) e executa os testes unitários e E2E.Deploy: Somente se todos os testes passarem, o frontend (PWA) é publicado automaticamente no GitHub Pages.
