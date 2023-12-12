### Mocks:
- Mocks, por outro lado, são objetos predefinidos com expectativas específicas sobre como eles serão usados. Em outras palavras, um mock é um objeto simulado que permite que você verifique se métodos específicos foram chamados com argumentos específicos durante o teste.

- Em DDD, você pode usar mocks para verificar se os objetos de domínio estão sendo usados corretamente pelas outras partes do sistema. Por exemplo, você pode criar um mock de um objeto de domínio para verificar se os serviços de aplicação estão chamando os métodos corretos desse objeto durante o teste.

- Para resumir:

- Stubs são usados para substituir componentes reais do sistema e fornecer respostas controladas durante os testes.
Mocks são usados para verificar se os métodos específicos de um objeto são chamados corretamente durante os testes.
Ambos são essenciais para garantir que os testes sejam isolados e confiáveis, permitindo que você identifique e corrija problemas no código de maneira eficaz.