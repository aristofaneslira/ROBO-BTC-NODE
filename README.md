# ROBO-BTC-NODE

## Criar uma conta no exchange

Para conseguir usar esse robo você deve ter uma conta criada na Mercado Bitcoin, o maior exchange brasileiro e o mais confiável até onde sei. Eles possuem uma API REST muito completa que usaremos para monitorar e operar no mercado de criptomoedas. Sim, porque você não precisa apenas operar bitcoins, mas também outras criptos que eles possuem.

Como esse processo de criação de conta pode mudar com o tempo, não vou entrar em detalhes aqui. Crie sua conta e faça todo o processo de validação, com selfie e tudo mais. Após o cadastro, você precisa depositar dinheiro na sua conta Mercado Bitcoin. Esse depósito inicial possui taxa, esteja ciente disso. Na verdade, com exceção de depósito, tudo que você for fazer possui taxa: comprar, vender e sacar. Como essas taxas variam ao longo do tempo, consulte a página oficial, mas devido ao risco de day trade com BTC, recomendo apenas operar quando o spread estiver acima de 6%, para você conseguir no mínimo 1% ao dia.

Após estar com a sua conta 100% aprovada, habilite todos os mecanismos de segurança (na área de configurações da sua conta) como uma senha forte, Two Factor Authentication, palavra-segura e PIN. Nem todos estes itens são necessários para fazer este tutorial, mas sugiro que faça todos eles pois estes exchanges são atacados por hackers o tempo todo e você não vai querer facilitar, não é mesmo?

Após criar o seu PIN, você pode criar uma chave de segurança que será utilizada depois para se autenticar na API de negociações do Mercado Bitcoin. O link para criação da chave é esse(https://www.mercadobitcoin.com.br/trade-api/configuracoes/), mas caso não funcione, procure as instruções neste artigo deles(https://www.mercadobitcoin.com.br/trade-api/).

## Criar o projeto Node.js

Crie uma pasta no seu computador com o nome de nodejs-bitcoin e dentro dela coloque um arquivo index.js vazio e via console execute um ‘npm init -y’ nesta pasta para fazer as configurações iniciais de um projeto Node.js.

Vamos instalar alguns pacotes via NPM pra deixar nosso projeto preparado. Seguem os comandos de instalação:

npm i dotenv-safe axios querystring

O módulo dotenv-safe serve para carregar automaticamente variáveis de ambiente na sua aplicação Node.js. Usaremos estes variáveis de ambiente para colocar as configurações do nosso bot.

Crie um arquivo “.env.example” na raiz do seu projeto com o seguinte conteúdo dentro, representando o modelo de arquivo de configuração que vamos precisar:

#.env.example, committed to repo
CRAWLER_INTERVAL=

#Exchange Configs
KEY=
SECRET=
PIN=
#1.01 se perdem com taxas
PROFITABILITY=

Agora crie um arquivo “.env” na raiz do seu projeto usando o mesmo conteúdo do .env.example como base, mas colocando os seus valores de verdade ao lado do sinal de igualdade de cada uma das variáveis de ambiente. Uma rápida explicação de cada variável:

CRAWLER_INTERVAL: milissegundos entre cada execução do bot, sendo que o Mercado Bitcoin não tolera mais de 60 chamadas por minuto e pode lhe bloquear se tentar usar mais a API deles do que isso;
KEY: sua API Key (alfanumérico), criada no Mercado Bitcoin;
SECRET: o seu API Secret (alfanumérico), criado no Mercado Bitcoin;
PIN: o seu PIN (quatro números), criado nas configurações do Mercado Bitcoin;
PROFITABILITY: a rentabilidade desejada que seu bot deve alcançar em decimal, ou seja, 1.1 representa 10%, 1.05 representa 5% e assim por diante;

Tenha em mente que as informações de KEY, SECRET e PIN são secretas e você não deve compartilhar com ninguém, caso contrário quem descobri-las poderá comprar e vender bitcoins em seu nome, usando seu dinheiro.

Sobre a variável PROFITABILITY (rentabilidade ou lucratividade), entenda que quanto maior a rentabilidade desejada, mais irá demorar para que você consiga ter retorno com seu bot e às vezes isso pode nunca acontecer. Exemplo, se sua PROFITABILITY é 1.2 (20%) e você compra bitcoin hoje, vai demorar 20 dias para o bot vender se a moeda estiver valorizando 1% ao dia. Claro que diversas técnicas podem reduzir ou aumentar esse prazo (como uma queda da moeda ao invés de valorização), e cabe a você estudá-las (como analisar os gráficos da moeda, por exemplo).

Além disso, uma PROFITABILITY inferior a 1.01 (1%) não é muito interessante pois você gasta isso com as taxas do Mercado Bitcoin para compra e venda da moeda, fora a taxa que vai ter de pagar quando for sacar o dinheiro.

Se você for versionar o seu projeto ou mesmo compartilhar o seu código com outras pessoas via Git, coloque um .gitignore na raiz do seu projeto incluindo a pasta node_modules (padrão) e o arquivo .env, que é mantido localmente só no seu projeto.

Para carregar estas configurações na sua aplicação, dentro do seu index.js na raiz do seu projeto adicione a seguinte linha de código:

require("dotenv-safe").config()

Caso você tenha se esquecido de alguma variável ou o arquivo .env não esteja presente na raiz do projeto, ao chamar esta função config do dotenv-safe, sua aplicação não iniciará.

Note que cabe a você entender as melhores configurações para os seus objetivos financeiros, a sua situação financeira, a situação do mercado de criptomoedas no momento que você está atuando nele, etc. Me focarei aqui na construção do robô de compra e venda de bitcoins, não na sua configuração.


