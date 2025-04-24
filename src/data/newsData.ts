
const news = [
  {
    id: "1",
    headline: "Global Markets Reach All-Time High as Economic Recovery Accelerates",
    summary: "Stock markets around the world hit new records as economic indicators show strong post-pandemic recovery.",
    content: "Global markets have reached unprecedented heights as economies worldwide show strong signs of recovery from the pandemic downturn. Major indices across the US, Europe, and Asia have posted record gains, buoyed by improving employment figures, consumer spending, and corporate earnings. Economic experts attribute the surge to successful vaccination campaigns, relaxed travel restrictions, and continued government stimulus. The technology and green energy sectors have been particularly strong performers, with investors showing increased confidence in future growth prospects.",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isPremium: false,
    date: "2023-10-15"
  },
  {
    id: "2",
    headline: "National Team Advances to World Cup Semifinals in Stunning Upset Victory",
    summary: "In a shocking turn of events, the national team defeated the top-ranked opponent to reach the World Cup semifinals.",
    content: "In a match that will be remembered for generations, the national soccer team pulled off one of the greatest upsets in World Cup history by defeating the tournament favorites in a nail-biting quarterfinal. The underdog squad, ranked 20th in the world, stunned spectators with their disciplined defense and clinical counterattacks against the number one team. The winning goal came in the 87th minute from a spectacular 25-yard strike into the top corner, sending fans into a frenzy of celebration. The team will now face another formidable opponent in the semifinals next Tuesday, with the entire nation rallying behind their unlikely heroes.",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isPremium: false,
    date: "2023-10-17"
  },
  {
    id: "3",
    headline: "Revolutionary AI Model Shows Human-Like Understanding of Complex Languages",
    summary: "A breakthrough in artificial intelligence demonstrates unprecedented comprehension of nuanced language concepts.",
    content: "Computer scientists at a leading research university have unveiled a revolutionary artificial intelligence system that demonstrates a remarkable understanding of complex language patterns and concepts. The AI model, which has been in development for over five years, can process and interpret nuanced literary texts, idiomatic expressions, and cultural references with near-human accuracy. This breakthrough represents a significant leap forward in natural language processing technology, with potential applications ranging from advanced translation services to more sophisticated virtual assistants. While previous AI models have struggled with contextual understanding and metaphorical language, this new system utilizes a novel neural network architecture that can recognize subtle linguistic patterns and infer implied meanings.",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1677442135740-a406823e8145?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    isPremium: true,
    date: "2023-10-12"
  },
  {
    id: "4",
    headline: "Award-Winning Director Announces Ambitious New Film Series",
    summary: "The acclaimed filmmaker has revealed plans for an epic trilogy exploring humanity's relationship with technology.",
    content: "One of Hollywood's most celebrated directors has announced an ambitious new film project that will span three feature-length movies exploring the complex relationship between humanity and technology. The Academy Award-winning filmmaker, known for visually stunning and thought-provoking works, described the trilogy as 'a cinematic journey through our past, present, and possible future with the technologies we create.' The project has already attracted an impressive ensemble cast featuring several A-list actors and will be shot across five continents. Production is scheduled to begin early next year, with the first installment targeting a major festival premiere before a worldwide theatrical release.",
    category: "Entertainment",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80",
    isPremium: false,
    date: "2023-10-10"
  },
  {
    id: "5",
    headline: "Scientists Discover Promising Compound That May Slow Aging Process",
    summary: "Research team identifies a natural molecule that shows remarkable results in extending cell lifespan.",
    content: "A team of international researchers has identified a naturally occurring compound that appears to significantly slow the aging process at the cellular level. The molecule, extracted from a rare deep-sea organism, has shown promising results in laboratory studies, extending the lifespan of test cells by up to 40%. Scientists are particularly excited by the compound's ability to preserve telomere length—a key factor in cellular aging—and its apparent lack of negative side effects in early testing. While human clinical trials are still several years away, the discovery has generated considerable excitement in the medical community for its potential applications in treating age-related diseases and possibly extending human healthspan. The research team emphasizes that their work focuses on improving quality of life in older age rather than simply extending longevity.",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    isPremium: true,
    date: "2023-10-08"
  },
  {
    id: "6",
    headline: "Astronomers Detect Mysterious Radio Signals from Distant Galaxy",
    summary: "An international team of scientists has recorded unusual radio bursts from a galaxy 3 billion light-years away.",
    content: "Astronomers using a network of radio telescopes have detected a series of unusual and powerful radio signals originating from a galaxy approximately 3 billion light-years from Earth. The fast radio bursts (FRBs), lasting only milliseconds but releasing enormous amounts of energy, have a distinctive pattern that has scientists intrigued. While FRBs have been observed before, this particular series exhibits properties that don't match known astrophysical phenomena. The research team has ruled out common explanations such as pulsar emissions or stellar flares. The discovery has prompted increased observation time on major telescopes worldwide as scientists attempt to gather more data on these mysterious signals. While some researchers speculate about the possibility of artificial origins, the scientific consensus remains focused on undiscovered natural phenomena as the most likely explanation.",
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1611&q=80",
    isPremium: false,
    date: "2023-10-14"
  },
  {
    id: "7",
    headline: "Major Tech Company Unveils Revolutionary Smartphone Design",
    summary: "The innovative device features a fully expandable display and breakthrough battery technology.",
    content: "A leading technology company has unveiled what may be the most significant redesign of the smartphone in years. The revolutionary device features a display that can expand from a standard phone size to a tablet-like 10 inches through an innovative folding mechanism. Beyond the expandable screen, the phone introduces groundbreaking battery technology that promises a full week of usage on a single charge and can reach 100% battery in just ten minutes. Other notable features include an under-display camera system that eliminates the need for notches or punch holes, enhanced AI capabilities for unprecedented computational photography, and a new haptic system that can simulate different textures when touching the screen. Industry analysts are calling it a potential game-changer for the mobile market, though its premium price point may limit initial adoption to enthusiasts and early adopters.",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    isPremium: true,
    date: "2023-10-11"
  },
  {
    id: "8",
    headline: "Global Tourism Industry Shows Strong Recovery as Travel Restrictions Ease",
    summary: "Tourist destinations worldwide are reporting a surge in visitors as pandemic-related travel barriers continue to fall.",
    content: "The global tourism sector is experiencing a robust recovery as countries continue to lift travel restrictions and travelers regain confidence in international journeys. Popular destinations across Europe, Asia, and the Americas are reporting visitor numbers approaching or even exceeding pre-pandemic levels, providing vital economic relief to regions heavily dependent on tourism revenue. Industry data shows particularly strong growth in adventure tourism and nature-focused travel, suggesting a shift in traveler preferences following extended lockdowns. Hotels and airlines are responding by increasing capacity and services, though many have implemented permanent changes based on health protocols developed during the pandemic. Tourism officials note that while business travel remains below historical averages, leisure travel's strong rebound has compensated for this gap in many markets.",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
    isPremium: false,
    date: "2023-10-09"
  },
  {
    id: "9",
    headline: "Unprecedented Climate Agreement Reached as Nations Commit to Bold Targets",
    summary: "World leaders have signed a landmark climate accord with legally binding emission reduction goals.",
    content: "In what environmentalists are calling a watershed moment for climate action, leaders from 195 countries have signed a groundbreaking environmental agreement that establishes legally binding targets for greenhouse gas reductions. The accord, reached after two weeks of intense negotiations, commits signatory nations to cutting emissions by 60% below 2005 levels by 2035 and achieving carbon neutrality by 2050. Unlike previous climate agreements, this pact includes robust enforcement mechanisms, financial penalties for non-compliance, and substantial funding for developing nations transitioning to clean energy. The deal also incorporates unprecedented commitments from the world's largest carbon emitters, which had previously resisted firm reduction targets. Environmental experts are cautiously optimistic about the agreement's potential to meaningfully address climate change, though they emphasize that implementation will require sustained political will and significant economic transformation.",
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4518e6b423?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1557&q=80",
    isPremium: true,
    date: "2023-10-16"
  }
];

export default news;
