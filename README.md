# DATABASE-GRANULARITY
## Concluído

Link para o artigo a descrever uma explicação sobre a PoC: https://blog.acidineydias.me/2020/09/26/um-pouco-sobre-offline-first-e-granularidade/

Prova de conceito usando granularidade de banco de dados, permitindo que a aplicação nunca fique sem os ultimos dados atualizados. 

### Motivação

Dado o crescente uso das PWA's, usando cache de informações estaticas, decidi fazer uma prova de conceito usando o indexDB para armazenar dados de uma chamada ajax de uma API, de modo a que quando o usuário esteja offline ele tenha os ultimos dados que ele geriou, de igual modo a pretenção de o usuário mesmo offline poder realizar ações que serão posteriormente sincronizadas quando ele voltar a estar online com o servidor.

### Arquitectura

O segredo da minha POC é o uso de proxies para prever o comportamento do usuário e o estado da maquina atual do mesmo

#### Proxies

As proxies permiter que eu criei armadinha ou um caminho alternativo ao original que eu posso adicionar novas lógicas de négocio enquanto a app segue o fluxo... considere um middleware de duas vias se ficar mais simples de entender.

### Techs
 - Dexie ( Wrapper para o indexDB )
 - Proxies
 - SVELTE
 - EXPRESS
 - SQLITE
 - PWA
 
 ### Roadmap
 
 - [X] nectar com o JSONFAKEAPI
 - [X] Criar db com o dexie
 - [X] Construir o fluxo de Proxies
 - [X] Criar granularidade de banco de dados usando dexie
 - [X] Criar storie para os eventos de delete e create quando offline
 - [X] Criar rotina de sync sempre que a maquina mudar para o estado online
 - [X] Habilitar PWA
 
 

 
