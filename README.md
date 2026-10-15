# Data-Playground

Página estática que demonstra as APIs públicas e externas testadas antes de serem usadas no ConectAgro. Acesse em https://conectagro-usp.github.io/Data-Playground/ ou abra o `index.html` no navegador.

## APIs testadas

- **[BrasilAPI - CEP v2](https://brasilapi.com.br/docs)** - consulta endereço e coordenadas (latitude/longitude) a partir de um CEP, em uma única chamada.
  ```
  GET https://brasilapi.com.br/api/cep/v2/01310200
  ```

- **[OSRM](https://project-osrm.org)** - cálculo de rota entre dois pontos (servidor de demonstração público).
  ```
  GET https://router.project-osrm.org/route/v1/driving/-46.633309,-23.550520;-46.625290,-23.533773?overview=false
  ```

- **[CNPJá](https://cnpja.com/api/open)** - dados cadastrais de um CNPJ.
  ```
  GET https://open.cnpja.com/office/58622614000195
  ```