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

- `/bling/request-authorization-code`: Vai ser redirecionado para logar com o seu usuario da bling para liberar o authenticationCode
- `/webhook/bling/authorization-code/callback`: Receberá o authenticationCode da Bling, com o qual fará outra requisição para a bling pegando os tokens de acesso
- `/webhook/pipe-drive/webhook-deal-update`: recebe as atualizações dos deals que acontecem no pipeDrive, e envia uma requisição para inserir produto na Bling caso ele tenha o status "won" e o ultimo status estava "open" e cria uma agregação de produtos ou atualiza uma já existente para aquele dia.
