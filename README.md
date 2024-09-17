# Teste - Kruzer

Integração entre Api do PipeDrive para inserir Deals quando estiverem ganhas como uma venda na Api da Bling

## Requirements

- Receber atualizações de status de Deals da Plataforma PipeDrive
- Enviar os deals com status Ganho como produto na Plataforma Bling
- Agregar o valor dos Produtos inseridos por dia
- Rota para pegar o valor agregado dos produtos

## Rotas

- `/webhook/pipe-drive/deal-update`: Rota disponibilizada para o pipedrive bater quando tiver atualização de uma oportunidade
- `/bling/autenticate`: Fazer autentição no Bling com usuario
- `/webhook/bling/authorization-code`: Recebe webhook com o authorization code

## Como testar

-
