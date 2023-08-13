# Dependencias

- Note 18+
- npm 9.8.0 (A que estou usando, mais atual)

# Bibliotecas importantes

Não precisa baixar pois já ta nas dependências

- [React Navigation](https://reactnavigation.org/) - usando a forma [Stack](https://reactnavigation.org/docs/stack-navigator)
- [React Native Paper](https://callstack.github.io/react-native-paper/) - "Material UI"

## Rodar na sua máquina

### Crie um arquivo `.env` no diretório princial

```bash

# colocar url do server correto em um arquivo .env no diretório principal
BASE_SERVER_URL="http://localhost:8080"

```

### No terminal

```bash
# Clone este repositório
$ git clone https://github.com/gustavohmbarbosa/patinha-pet-app.git


# Para instalar dependências:
$ npm install

# Para rodar o projeto, deve usar:
$ npx expo start


# Para ter acesso a lista de comandos, basta usar
$ npx expo -h
```

> Expo Go - Para rodar o código no seu celular é so baixar o expo go e pode usar sem conta, para usar basta ler o QRCode que aparece ao rodar a aplicação ou digitar a URL.

## Outros

- Os components de tela devem ser adicionadas no mesmo estilo de `Home` : `src/screens/NomeDaTela/index.tsx`
- Pode ser criado arquivo separado para style (no mesmo diretório) caso necessário: `src/screens/NomeDaTela/styles.ts`

```bash
# no index.tsx do component, importe os styles
  import { styles } from "./styles";
```

- Prestar atenção no arquivo `src/routers/stack.tsx`, deve ser adicionado as telas sempre que criadas para uso.
