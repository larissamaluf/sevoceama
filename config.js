/**
 * ÁREA EDITÁVEL DA CAMPANHA
 * A equipe pode alterar textos, perguntas, respostas, fontes e link final aqui.
 * `correct` aceita uma ou mais espécies. O conteúdo científico é provisório e
 * deve ser revisado pela equipe técnica da SVB antes da publicação oficial.
 */
window.SVB_GAME_CONFIG = {
  campaign: "Se Você Ama Um, Por Que Come o Outro?",
  finalLink: "https://querovirarvegano.com.br",
  shareText: "Eu fiz o desafio ‘Se Você Ama Um’. Você conhece os animais tão bem quanto imagina? 🐶🐷🐮🐔",
  texts: {
    introTitle: "Você conhece mesmo os animais?",
    introSubtitle: "Faça o teste. São só 60 segundos.",
    start: "COMEÇAR",
    next: "PRÓXIMA",
    confirm: "CONFIRMAR",
    finalBody: "Você não precisa mudar tudo de uma vez. Mas pode começar olhando para eles de um jeito diferente.",
    finalCta: "QUERO SABER COMO COMEÇAR 💚",
    share: "Compartilhar esse desafio",
    replay: "Jogar novamente"
  },
  animals: [
    { id: "dog", name: "Cachorro", emoji: "🐶" },
    { id: "pig", name: "Porco", emoji: "🐷" },
    { id: "cow", name: "Vaca", emoji: "🐮" },
    { id: "chicken", name: "Galinha", emoji: "🐔" }
  ],
  questions: [
    {
      id: "learn-recognize",
      prompt: "Quem consegue aprender associações e reconhecer indivíduos?",
      instruction: "Marque todos que você acha que conseguem.",
      correct: ["dog", "pig", "cow", "chicken"],
      reveal: "É uma habilidade compartilhada.",
      explanation: "As quatro espécies aprendem com a experiência e distinguem indivíduos ou sinais familiares — cada uma à sua maneira.",
      sources: [
        { label: "Farm Animal Cognition — Nawroth et al. (2019)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6383588/" },
        { label: "Thinking Chickens — Marino (2017)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5306232/" }
      ]
    },
    {
      id: "spatial-memory",
      prompt: "Quem usa a memória para lembrar onde encontrou comida?",
      instruction: "Pode haver mais de uma resposta.",
      correct: ["pig", "cow"],
      reveal: "Porcos e vacas guardam mapas da experiência.",
      explanation: "Estudos descrevem memória espacial em porcos e decisões de busca por alimento baseadas no lugar e na qualidade em bovinos.",
      sources: [
        { label: "Learning and memory in pigs — Gieling et al. (2011)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3040303/" },
        { label: "Farm Animal Cognition — Nawroth et al. (2019)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6383588/" }
      ]
    },
    {
      id: "play",
      prompt: "Quem brinca mais quando se sente seguro e estimulado?",
      instruction: "Marque todos que você acha que brincam.",
      correct: ["dog", "pig", "cow"],
      reveal: "Brincar não é exclusividade dos cães.",
      explanation: "Porcos e bovinos também exibem comportamentos de brincadeira, especialmente em contextos positivos e enriquecidos.",
      sources: [
        { label: "Environmental enrichment and pig play — review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6325398/" },
        { label: "Cognition of dairy cattle — review (2025)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12766594/" }
      ]
    },
    {
      id: "social-bonds",
      prompt: "Quem prefere a companhia de parceiros conhecidos?",
      instruction: "Escolha as espécies que formam vínculos sociais.",
      correct: ["dog", "pig", "cow", "chicken"],
      reveal: "Todos têm uma vida social própria.",
      explanation: "Essas espécies reconhecem companheiros e ajustam seu comportamento de acordo com relações e familiaridade.",
      sources: [
        { label: "Social behavior in farm animals — Rault et al. (2022)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9411962/" },
        { label: "Thinking Chickens — Marino (2017)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5306232/" }
      ]
    },
    {
      id: "individuality",
      prompt: "Quem tem preferências e um jeito próprio de reagir ao mundo?",
      instruction: "Marque todos que podem variar de indivíduo para indivíduo.",
      correct: ["dog", "pig", "cow", "chicken"],
      reveal: "Espécie não apaga individualidade.",
      explanation: "A pesquisa comportamental encontra diferenças individuais consistentes nas quatro espécies.",
      sources: [
        { label: "Farm Animal Cognition — Nawroth et al. (2019)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6383588/" },
        { label: "Thinking Chickens — Marino (2017)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5306232/" }
      ]
    },
    {
      id: "food-calls",
      prompt: "Quem chama os filhotes quando encontra algo bom para comer?",
      instruction: "Escolha um animal.",
      correct: ["chicken"],
      reveal: "A galinha tem um chamado para isso.",
      explanation: "Galinhas emitem vocalizações de alimento que atraem a atenção dos pintinhos e orientam sua aproximação.",
      sources: [
        { label: "Maternal food calling — Wauters & Richard-Yris (2002)", url: "https://pubmed.ncbi.nlm.nih.gov/12115288/" }
      ]
    },
    {
      id: "mother-young",
      prompt: "Quem reconhece a própria mãe ou o próprio filhote por sinais individuais?",
      instruction: "Pode haver mais de uma resposta.",
      correct: ["cow", "chicken"],
      reveal: "Vozes ajudam a manter famílias conectadas.",
      explanation: "Vacas e bezerros formam vínculos e se reconhecem; pintinhos aprendem a responder ao chamado familiar da mãe.",
      sources: [
        { label: "Cow–calf bonding — Mota-Rojas et al. (2021)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8300112/" },
        { label: "Maternal clucking recognition — Tuculescu & Griswold (1983)", url: "https://pubmed.ncbi.nlm.nih.gov/24925863/" }
      ]
    },
    {
      id: "problem-solving",
      prompt: "Quem aprende a resolver tarefas para chegar a uma recompensa?",
      instruction: "Marque todos que você acha que aprendem.",
      correct: ["dog", "pig", "cow", "chicken"],
      reveal: "A resposta atravessa espécies.",
      explanation: "As quatro espécies aprendem por associação e ajustam escolhas com base nas consequências.",
      sources: [
        { label: "Farm Animal Cognition — Nawroth et al. (2019)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6383588/" },
        { label: "Dog Cognition — Udell et al. (2016)", url: "https://www.psychologicalscience.org/journals/current-directions/0963721416657540/" }
      ]
    }
  ]
};
