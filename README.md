# Sistema de Monitoramento de Preço em Tempo Real (Serverless)

### **Objetivo do Projeto**

Este projeto consiste em um sistema de alerta autônomo e de baixo custo, construído sobre uma arquitetura **serverless**. O objetivo é monitorar o preço de um ativo financeiro específico (como o Bitcoin) e enviar notificações por SMS para o usuário quando um preço-alvo de compra ou venda for atingido ou estiver próximo.

A solução utiliza uma arquitetura **event-driven** na AWS, garantindo alta disponibilidade, escalabilidade e um modelo de pagamento por uso, resultando em um custo de operação praticamente zero.

---

### **Tecnologias e Arquitetura**

* **Backend:** Node.js
* **Função Serverless:** **AWS Lambda** (processa a lógica de negócios sem a necessidade de um servidor dedicado)
* **Agendamento:** **AWS EventBridge** (utilizado para disparar a função Lambda a cada 15 segundos, seguindo uma regra cron)
* **Fonte de Dados:** **CoinGecko API** (API pública e RESTful para obter dados de preço)
* **Serviço de Notificação:** **Twilio** (API de terceiros para o envio de mensagens SMS)

---

### **Fluxo de Dados e Lógica**

1.  O **AWS EventBridge** dispara um evento a cada 15 segundos, invocando a função **AWS Lambda**.
2.  A função executa o código em Node.js, fazendo uma requisição HTTP para a API pública da **CoinGecko** via `axios` para obter o preço atual do ativo.
3.  O preço retornado é analisado e comparado com os valores de alerta e alvo definidos em variáveis de ambiente.
4.  Com base na condição de preço (aproximação ou batimento do alvo), a função utiliza a API da **Twilio** para enviar uma mensagem SMS.
5.  O processo é finalizado, e a função Lambda aguarda a próxima invocação agendada.

---

### **Habilidades Demonstradas**

Este projeto demonstra proficiência em:

* **Desenvolvimento Cloud-Native e Serverless:** Experiência prática com a arquitetura serverless da AWS.
* **Integração de APIs:** Capacidade de consumir e processar dados de APIs externas.
* **Manuseio de Variáveis de Ambiente:** Conhecimento em boas práticas de segurança para chaves e tokens de acesso.
* **Arquitetura de Software:** Capacidade de separar a lógica do projeto em módulos (checagem, notificação) para facilitar a manutenção.
* **DevOps Básico:** Configuração de agendamentos e automação de tarefas em um ambiente de nuvem.
