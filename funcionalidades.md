# Funcionalidades

## Recuperação de senha

**RF**

- O usuário poderá recuperar sua senha informando o seu e-mail;
- O usuário poderá receber um e-mail com instruções de recuperação de senha;
- O usuário poderá resetar senha senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em duas horas;
- O usuário precisa confirmar a nova senha ao confirmar a sua;

## Atualização de perfil

**RF**

- O usuário poderá atualizar seu nome, e-email e senha;

**RNF**

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar senha senha, o usuário precisa informar a nova senha;

## Painel de prestador

**RF**

- O usuário poderá listar seus agendamentos de um dia específico;
- O prestador receberá uma notificação sempre que houver um novo agendamento;
- O Prestador poderá vizualizar as notificações não lidas;


**RNF**

- Os agendamentos do prestador devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando o Socket.io;

**RN**

- A notificação deverá ter um status de lida ou não lida para que o prestador possa controlar;

## Agendamento de serviços

**RF**

- O usuário poderá listar todos os prestadores de serviço cadastrados;
- O usuário poderá listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário poderá listar horários disponíveis em um dia específico de um prestador;
- O usuário poderá realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os horários devem estar disponíveis entre as 8h as 18h (inicio ás 8h, fim ás 17:00);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
