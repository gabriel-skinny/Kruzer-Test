# Teste - Kruzer

Integração entre Api do PipeDrive para inserir Deals quando estiverem ganhas como uma venda na Api da Bling

## Requirements

- Receber atualizações de status de Deals da Plataforma PipeDrive
- Enviar os deals com status Ganho como produto na Plataforma Bling
- Agregar o valor dos Produtos inseridos por dia
- Rota para pegar o valor agregado dos produtos

## Rotas

- `POST - /webhook/pipe-drive/deal-update`: Rota disponibilizada para o pipedrive bater quando tiver atualização de uma oportunidade
- `GET - /bling/request-authorization-code`: Fazer autentição no Bling com usuario
- `POST - /webhook/bling/authorization-code/callback`: Recebe webhook com o authorization code
- `GET - /products/agregation`: Listagem dos produtos agregados por dia
- `POST - /pipe-drive/retry-product-creation`: Retentativa de recriar produtos para webhooks com erro em sua criação

## Fluxo

- Bater no Browser nessa rota `/bling/request-authorization-code` e entrar com uma conta do bling, para autorizar o aplicativo
- Agora é so alterar algum Deal no PipeDrive para "Won" e verificar no Bling os produtos sendo inseridos.
