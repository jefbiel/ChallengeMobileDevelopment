# Pasta de assets
Coloque aqui os arquivos de imagem do app, ex.: `NewCareLogoHorizontal.png` e `bell.png`.

Estrutura recomendada:

```
src/
	assets/
		img/
			NewCareLogoHorizontal.png
			bell.png
```

Observações de uso no código (arquivos dentro de `src/screens`):

- Para referenciar uma imagem local em `src/screens/HomeScreen.tsx` ou `LoginScreen.tsx` use:
	- `source={require('../assets/img/NewCareLogoHorizontal.png')}`
	- `source={require('../assets/img/bell.png')}`

- Após adicionar as imagens, reinicie o Metro bundler (com cache limpo se necessário):
```bash
npx react-native start --reset-cache
```

Remova o arquivo `src/types/react-navigation.d.ts` quando as dependências `@react-navigation/*` estiverem instaladas corretamente.

Se preferir manter imagens remotas por enquanto, deixe os `Image` apontando para `uri` até adicionar arquivos locais.
