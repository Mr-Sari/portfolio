import type { Bilingual, PortfolioData } from './types.ts';

/**
 * Single source of truth for all portfolio content, in English and Arabic.
 * Extracted from the CV ("Sari Alsulami - Data Science"). Nothing is invented:
 * where the CV gives no detail (a problem statement, a repository, a demo)
 * the field is omitted or left empty and the UI adapts.
 *
 * Figures (10+, 25+, 93% …) appear only where the CV states them.
 */
export const content: Bilingual<PortfolioData> = {
  personal: {
    name: { en: 'Sari Owaid Alsulami', ar: 'ساري عويض السلمي' },
    shortName: { en: 'Sari Alsulami', ar: 'ساري السلمي' },
    /** The name in the other language, shown beside it in the hero. */
    altName: { en: 'ساري عويض السلمي', ar: 'Sari Owaid Alsulami' },
    initials: 'SA',
    title: { en: 'Data Analyst', ar: 'محلل بيانات' },
    headline: {
      en: 'Turning data into actionable insights and data-driven decisions.',
      ar: 'أحوّل البيانات إلى رؤى قابلة للتنفيذ وقرارات مبنية على البيانات.',
    },
    location: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
    email: 'sarialsulami@gmail.com',
    phone: '+966 54 934 4220',
    summary: {
      en: 'I turn data into actionable insights and better decisions — through dashboards, KPIs and clear analytical reporting.',
      ar: 'أحوّل البيانات إلى رؤى قابلة للتنفيذ وقرارات أفضل، عبر لوحات المعلومات ومؤشرات الأداء والتقارير التحليلية الواضحة.',
    },
    linkedin: 'https://www.linkedin.com/in/sari-alsulami',
    github: 'https://github.com/Mr-Sari',
    resume: 'assets/Sari-Owaid-Alsulami-Resume.pdf',
    languages: [
      { name: { en: 'Arabic', ar: 'العربية' }, level: { en: 'Native', ar: 'اللغة الأم' } },
      { name: { en: 'English', ar: 'الإنجليزية' } },
    ],
  },

  statements: {
    tagline: { en: 'Turning data into decisions.', ar: 'من البيانات إلى القرار.' },
    intro: {
      en: 'I turn data into actionable insights and better decisions — through Power BI dashboards, KPI reporting and reliable data, backed by a degree in Data Science.',
      ar: 'أحوّل البيانات إلى رؤى قابلة للتنفيذ وقرارات أفضل، عبر لوحات Power BI وتقارير مؤشرات الأداء وبيانات موثوقة، مستندًا إلى شهادة في علم البيانات.',
    },
    philosophy: { en: 'Data tells a story. I turn it into action.', ar: 'البيانات تحكي قصة، وأنا أحوّلها إلى أثر.' },
    interlude: {
      lead: { en: 'From raw data', ar: 'من البيانات الخام' },
      accent: { en: 'to meaningful insights.', ar: 'إلى رؤى ذات قيمة.' },
    },
    closing: {
      en: 'Have data that should be driving better decisions? I’d be glad to hear about it.',
      ar: 'لديك بيانات يمكن أن تقود قرارات أفضل؟ يسعدني أن أسمع عنها.',
    },
  },

  /** Real figures from the CV, each with its source. */
  heroStats: [
    { value: 10, suffix: '+', label: { en: 'Power BI dashboards', ar: 'لوحة Power BI' }, source: { en: 'Holy Makkah Municipality', ar: 'أمانة العاصمة المقدسة' } },
    { value: 25, suffix: '+', label: { en: 'KPIs tracked', ar: 'مؤشر أداء متابَع' }, source: { en: 'Holy Makkah Municipality', ar: 'أمانة العاصمة المقدسة' } },
    { value: 15, suffix: '+', label: { en: 'Automated dashboards', ar: 'لوحة آلية' }, source: { en: 'Saudi Ground Services', ar: 'الخدمات الأرضية السعودية' } },
    { value: 20, suffix: '+', label: { en: 'Executive reports', ar: 'تقرير تنفيذي' }, source: { en: 'Saudi Ground Services', ar: 'الخدمات الأرضية السعودية' } },
  ],

  heroStack: ['Power BI', 'DAX', 'Power Query', 'Excel', 'SQL', 'Python'],

  about: {
    paragraphs: [
      {
        en: 'I’m a Data Analyst in Saudi Arabia, currently with Holy Makkah Municipality, where I build Power BI dashboards and KPI reporting. Before that I worked on SAP data and executive reporting at Saudi Ground Services, and I started as a data engineering intern at the National Center for Meteorology.',
        ar: 'أنا محلل بيانات في المملكة العربية السعودية، أعمل حاليًا لدى أمانة العاصمة المقدسة على بناء لوحات Power BI وتقارير مؤشرات الأداء. وقبلها عملت على بيانات SAP والتقارير التنفيذية في الشركة السعودية للخدمات الأرضية، وبدأت متدربًا في هندسة البيانات في المركز الوطني للأرصاد.',
      },
      {
        en: 'My degree is in Data Science from the University of Jeddah. Day to day, much of the work happens before the dashboard: bringing data from several sources into one clean model with SQL, Power Query and ETL checks, so the final report can be read in a minute and trusted.',
        ar: 'تخرجت في علم البيانات من جامعة جدة. وفي عملي اليومي، يحدث جزء كبير من العمل قبل لوحة المعلومات: جمع البيانات من مصادر متعددة في نموذج واحد نظيف عبر SQL وPower Query وفحوصات ETL، ليُقرأ التقرير النهائي في دقيقة ويُوثق به.',
      },
      {
        en: 'Alongside analytics I keep building with machine learning and LLMs — a computer-vision pipeline on 23,000+ images for my graduation project, and RAG and resume-matching tools in 2026. They extend my analytics work rather than replace it.',
        ar: 'وإلى جانب التحليل أواصل البناء بتعلم الآلة والنماذج اللغوية: خط رؤية حاسوبية على أكثر من 23,000 صورة في مشروع تخرجي، وأدوات RAG ومطابقة السير الذاتية في 2026. وهي امتداد لعملي في التحليل لا بديل عنه.',
      },
    ],
    chain: [
      {
        title: { en: 'Data Analytics', ar: 'تحليل البيانات' },
        description: { en: 'Cleaning, querying and analysing data with SQL, Python and Excel.', ar: 'تنظيف البيانات والاستعلام عنها وتحليلها بـ SQL وPython وExcel.' },
      },
      {
        title: { en: 'Business Intelligence', ar: 'ذكاء الأعمال' },
        description: { en: 'Turning analysis into Power BI dashboards and KPIs people act on.', ar: 'تحويل التحليل إلى لوحات Power BI ومؤشرات أداء تُبنى عليها القرارات.' },
      },
      {
        title: { en: 'Data Science', ar: 'علم البيانات' },
        description: { en: 'Machine-learning models when a question needs prediction or classification.', ar: 'نماذج تعلم الآلة حين يحتاج السؤال إلى تنبؤ أو تصنيف.' },
      },
      {
        title: { en: 'AI & ML', ar: 'الذكاء الاصطناعي' },
        description: { en: 'LLMs, RAG and computer vision where they make analysis faster.', ar: 'النماذج اللغوية وRAG والرؤية الحاسوبية حين تختصر وقت التحليل.' },
      },
    ],
  },

  experience: [
    {
      id: 'makkah-municipality',
      company: { en: 'Holy Makkah Municipality', ar: 'أمانة العاصمة المقدسة' },
      via: { en: 'Al-Khaleej Company', ar: 'شركة الخليج' },
      role: { en: 'Data Analyst', ar: 'محلل بيانات' },
      location: { en: 'Makkah', ar: 'مكة المكرمة' },
      start: '2025-12',
      end: null,
      sector: { en: 'Government', ar: 'قطاع حكومي' },
      summary: {
        en: 'Power BI dashboards, KPI development and reporting, built on data from multiple sources.',
        ar: 'لوحات Power BI وتطوير مؤشرات الأداء والتقارير، مبنية على بيانات من مصادر متعددة.',
      },
      achievements: [
        {
          en: 'Designed 10+ Power BI dashboards tracking 25+ KPIs, automating reporting and reducing manual effort.',
          ar: 'تصميم أكثر من 10 لوحات Power BI تتابع أكثر من 25 مؤشر أداء، مع أتمتة التقارير وتقليل الجهد اليدوي.',
        },
        {
          en: 'Model and analyse data with Power BI, DAX, Power Query and Excel, and turn it into clear visualizations and reports.',
          ar: 'نمذجة البيانات وتحليلها باستخدام Power BI وDAX وPower Query وExcel، وتحويلها إلى عروض بصرية وتقارير واضحة.',
        },
        {
          en: 'Run ETL across multiple data sources, with data processing and quality checks so every report rests on reliable data.',
          ar: 'تنفيذ عمليات ETL من مصادر بيانات متعددة، مع معالجة البيانات وفحص جودتها لتستند كل التقارير إلى بيانات موثوقة.',
        },
      ],
      responsibilities: [
        {
          en: 'Built database views and optimized SQL queries in Toad for extraction, analysis and Power BI.',
          ar: 'بناء عروض قواعد البيانات وتحسين استعلامات SQL عبر Toad للاستخراج والتحليل وربطها بـ Power BI.',
        },
        {
          en: 'Built the “Maarefah Plus” knowledge platform with Python and SQLite to centralize knowledge across teams.',
          ar: 'بناء منصة «معرفة بلس» بـ Python وSQLite لمركزة المعرفة بين الفرق.',
        },
        {
          en: 'Contributed to Digital Transformation Measurement to improve digital maturity, efficiency and productivity.',
          ar: 'المساهمة في قياس التحول الرقمي لرفع النضج الرقمي والكفاءة والإنتاجية.',
        },
      ],
      technologies: ['Power BI', 'DAX', 'Power Query', 'Excel', 'SQL', 'Toad', 'ETL', 'Python', 'SQLite'],
    },
    {
      id: 'sgs',
      company: { en: 'Saudi Ground Services (SGS)', ar: 'الشركة السعودية للخدمات الأرضية (SGS)' },
      role: { en: 'Data Analyst', ar: 'محلل بيانات' },
      location: { en: 'Jeddah', ar: 'جدة' },
      start: '2025-10',
      end: '2025-12',
      employmentType: { en: 'Tamheer program', ar: 'برنامج تمهير' },
      sector: { en: 'Aviation services', ar: 'خدمات الطيران' },
      summary: {
        en: 'SAP data, dashboards and executive reporting.',
        ar: 'بيانات SAP ولوحات المعلومات والتقارير التنفيذية.',
      },
      achievements: [
        {
          en: 'Developed 15+ automated dashboards and reporting solutions using SAP and BI tools.',
          ar: 'تطوير أكثر من 15 لوحة وحل تقارير آلي باستخدام SAP وأدوات BI.',
        },
        {
          en: 'Generated 20+ executive reports from business and operational analysis.',
          ar: 'إعداد أكثر من 20 تقريرًا تنفيذيًا من تحليل الأعمال والعمليات.',
        },
        {
          en: 'Preprocessed, cleansed and validated SAP data, working with SAP queries and workflows for reporting.',
          ar: 'معالجة بيانات SAP وتنظيفها والتحقق منها، والعمل على استعلامات SAP ومسارات عملها لأغراض التقارير.',
        },
      ],
      responsibilities: [
        {
          en: 'Collaborated with cross-functional teams to implement data-driven solutions.',
          ar: 'التعاون مع فرق متعددة التخصصات لتطبيق حلول مبنية على البيانات.',
        },
      ],
      technologies: ['SAP', { en: 'SAP queries', ar: 'استعلامات SAP' }, { en: 'BI tools', ar: 'أدوات BI' }, { en: 'Data validation', ar: 'التحقق من البيانات' }],
    },
    {
      id: 'ncm',
      company: { en: 'National Center for Meteorology (NCM)', ar: 'المركز الوطني للأرصاد (NCM)' },
      role: { en: 'Data Engineer Intern', ar: 'متدرب هندسة بيانات' },
      location: { en: 'Jeddah', ar: 'جدة' },
      start: '2024-06',
      end: '2024-08',
      employmentType: { en: 'Internship', ar: 'تدريب تعاوني' },
      sector: { en: 'Government', ar: 'قطاع حكومي' },
      summary: {
        en: 'Meteorological ETL, ICAO aviation-message processing and query optimization.',
        ar: 'عمليات ETL لبيانات الأرصاد، ومعالجة رسائل الطيران ICAO، وتحسين الاستعلامات.',
      },
      achievements: [
        {
          en: 'Automated hourly weather-report processing with Python (Pandas, Regex), eliminating manual entry.',
          ar: 'أتمتة معالجة تقارير الطقس الساعية بـ Python عبر Pandas وRegex، وإلغاء الإدخال اليدوي.',
        },
        {
          en: 'Developed an ICAO message classification system for flight arrivals using time-series analysis.',
          ar: 'تطوير نظام لتصنيف رسائل ICAO لوصول الرحلات باستخدام تحليل السلاسل الزمنية.',
        },
        {
          en: 'Optimized SQL queries in DuckDB, improving database performance.',
          ar: 'تحسين استعلامات SQL في DuckDB ورفع أداء قاعدة البيانات.',
        },
      ],
      responsibilities: [
        {
          en: 'Implemented Docker containers and Git for environment consistency and version control.',
          ar: 'استخدام حاويات Docker وGit لتوحيد البيئات وإدارة الإصدارات.',
        },
      ],
      technologies: ['Python', 'Pandas', 'Regex', 'Delta Lake', 'DuckDB', 'SQL', { en: 'OOP', ar: 'البرمجة الكائنية' }, 'Docker', 'Git'],
    },
  ],

  projectCategories: [
    { id: 'analytics', label: { en: 'BI & Dashboards', ar: 'ذكاء الأعمال' } },
    { id: 'data-engineering', label: { en: 'Data Engineering', ar: 'هندسة البيانات' } },
    { id: 'data-science', label: { en: 'Data Science', ar: 'علم البيانات' } },
    { id: 'ai', label: { en: 'AI & ML', ar: 'الذكاء الاصطناعي' } },
  ],

  projects: [
    {
      id: 'rag-qa',
      title: { en: 'RAG Q&A System', ar: 'نظام أسئلة وأجوبة RAG' },
      shortDescription: {
        en: 'Answers questions over documents with source-grounded LLM responses, through a Gradio chatbot.',
        ar: 'يجيب عن الأسئلة من المستندات بإجابات موثّقة المصدر عبر واجهة محادثة Gradio.',
      },
      context: { en: 'Personal project', ar: 'مشروع شخصي' },
      kind: 'personal',
      start: '2026-05',
      end: '2026-06',
      categories: ['ai'],
      visual: 'rag',
      technologies: ['LangChain', 'ChromaDB', 'OpenAI', 'Gradio', 'Python'],
      brief: {
        problem: { en: 'Answers buried in long documents are slow to find — and hard to trust without a source.', ar: 'الإجابات داخل المستندات الطويلة يصعب العثور عليها، ويصعب الوثوق بها دون مصدر.' },
        approach: { en: 'Documents chunked into ChromaDB; LangChain retrieves the relevant passages to ground the LLM.', ar: 'تقسيم المستندات وتخزينها في ChromaDB، واسترجاع المقاطع المناسبة عبر LangChain لتأسيس إجابة النموذج.' },
        result: { en: 'A Gradio chatbot whose answers cite their source documents.', ar: 'واجهة محادثة Gradio تستشهد إجاباتها بمستنداتها المصدرية.' },
      },
      metrics: [],
      overview: {
        en: 'An end-to-end retrieval-augmented generation system, from document ingestion to an interactive chatbot.',
        ar: 'نظام RAG متكامل من إدخال المستندات حتى واجهة المحادثة التفاعلية.',
      },
      solution: {
        en: 'Documents are chunked and stored in a vector database; retrieved passages ground the LLM so each answer cites its sources.',
        ar: 'تُقسَّم المستندات وتُخزَّن في قاعدة بيانات متجهية، ثم تُبنى إجابات النموذج على المقاطع المسترجعة مع ذكر مصادرها.',
      },
      methodology: [
        { en: 'Document ingestion and chunking', ar: 'إدخال المستندات وتقسيمها' },
        { en: 'OpenAI embeddings stored in ChromaDB', ar: 'تضمينات OpenAI مخزّنة في ChromaDB' },
        { en: 'Semantic retrieval with LangChain', ar: 'استرجاع دلالي عبر LangChain' },
        { en: 'Source-grounded LLM answers', ar: 'إجابات مستندة إلى المصادر' },
        { en: 'Interactive Gradio chatbot', ar: 'واجهة محادثة تفاعلية عبر Gradio' },
      ],
      githubUrl: 'https://github.com/Mr-Sari/Retrieval-Augmented-Generation-RAG-Q-A-System',
      demoUrl: '',
    },
    {
      id: 'resume-ai-assistant',
      title: { en: 'Resume AI Assistant', ar: 'مساعد السيرة الذاتية بالذكاء الاصطناعي' },
      shortDescription: {
        en: 'Matches a resume to a job, analyzes skill gaps, and generates an ATS-optimized resume and tailored cover letter.',
        ar: 'يطابق السيرة الذاتية مع الوظيفة، ويحلّل فجوات المهارات، ويولّد سيرة متوافقة مع ATS وخطاب تقديم مخصصًا.',
      },
      context: { en: 'Personal project', ar: 'مشروع شخصي' },
      kind: 'personal',
      start: '2026-03',
      end: '2026-04',
      categories: ['ai'],
      visual: 'resume',
      technologies: ['OpenAI API', 'Claude API', 'Pydantic', 'Python'],
      brief: {
        problem: { en: 'Tailoring a resume and cover letter to every job posting is slow, manual work.', ar: 'مواءمة السيرة الذاتية وخطاب التقديم مع كل وظيفة عمل يدوي يستغرق وقتًا.' },
        approach: { en: 'A structured LLM pipeline with Pydantic-validated outputs for skill extraction and gap analysis.', ar: 'خط معالجة بنماذج لغوية ومخرجات يتحقق منها Pydantic لاستخراج المهارات وتحليل الفجوات.' },
        result: { en: 'Gap analysis, an ATS-optimized resume and a tailored cover letter in one run.', ar: 'تحليل للفجوات وسيرة متوافقة مع ATS وخطاب تقديم مخصص في تشغيل واحد.' },
      },
      metrics: [],
      overview: {
        en: 'An LLM assistant for resume–job matching and optimization, unified in one pipeline (run_resume_rocket).',
        ar: 'مساعد مبني على النماذج اللغوية لمطابقة السيرة مع الوظيفة وتحسينها، موحَّد في خط معالجة واحد هو run_resume_rocket.',
      },
      solution: {
        en: 'Structured LLM outputs validated with Pydantic drive skill extraction, gap analysis and job alignment, then resume rewriting and cover-letter generation.',
        ar: 'مخرجات منظّمة يتم التحقق منها عبر Pydantic تقود استخراج المهارات وتحليل الفجوات والمواءمة مع الوظيفة، ثم إعادة صياغة السيرة وكتابة خطاب التقديم.',
      },
      methodology: [
        { en: 'Structured outputs with Pydantic', ar: 'مخرجات منظّمة عبر Pydantic' },
        { en: 'Skill extraction, gap analysis, job alignment', ar: 'استخراج المهارات وتحليل الفجوات والمواءمة مع الوظيفة' },
        { en: 'ATS-optimized resume rewriting', ar: 'إعادة صياغة السيرة لتتوافق مع ATS' },
        { en: 'Cover letters tailored to each job', ar: 'خطاب تقديم مخصص لكل وظيفة' },
      ],
      githubUrl: 'https://github.com/Mr-Sari/Resume-AI-Assistant',
      demoUrl: '',
    },
    {
      id: 'kpi-dashboards',
      title: { en: 'KPI Dashboards & Reporting Automation', ar: 'لوحات مؤشرات الأداء وأتمتة التقارير' },
      shortDescription: {
        en: 'Power BI dashboards that automate KPI reporting, built on SQL views optimized in Toad.',
        ar: 'لوحات Power BI تؤتمت تقارير مؤشرات الأداء، مبنية على عروض SQL محسّنة عبر Toad.',
      },
      context: { en: 'Holy Makkah Municipality', ar: 'أمانة العاصمة المقدسة' },
      kind: 'professional',
      start: '2025-12',
      end: 'Present',
      categories: ['analytics'],
      visual: 'dashboard',
      technologies: ['Power BI', 'SQL', 'Toad'],
      brief: {
        problem: { en: 'KPI reporting relied on manual effort.', ar: 'تقارير مؤشرات الأداء كانت تعتمد على جهد يدوي.' },
        approach: { en: 'Database views and optimized SQL in Toad, feeding Power BI dashboards built around the KPIs.', ar: 'عروض قواعد بيانات واستعلامات SQL محسّنة عبر Toad تغذّي لوحات Power BI مصممة حول المؤشرات.' },
        result: { en: '10+ dashboards tracking 25+ KPIs, with reporting automated.', ar: 'أكثر من 10 لوحات تتابع أكثر من 25 مؤشرًا، مع أتمتة التقارير.' },
      },
      metrics: [
        { value: '10+', label: { en: 'Power BI dashboards', ar: 'لوحة Power BI' } },
        { value: '25+', label: { en: 'KPIs tracked', ar: 'مؤشر أداء' } },
      ],
      overview: { en: 'A suite of Power BI dashboards that automates KPI reporting.', ar: 'مجموعة لوحات Power BI تؤتمت تقارير مؤشرات الأداء.' },
      problem: { en: 'Reporting relied on manual effort.', ar: 'اعتماد التقارير على جهد يدوي.' },
      solution: {
        en: 'Database views and optimized queries in Toad and SQL feed Power BI dashboards designed around the organization’s KPIs.',
        ar: 'عروض قواعد بيانات واستعلامات محسّنة عبر Toad وSQL تغذّي لوحات Power BI مصممة حول مؤشرات الأداء.',
      },
      methodology: [
        { en: 'Database views and query optimization (Toad, SQL)', ar: 'عروض قواعد البيانات وتحسين الاستعلامات عبر Toad وSQL' },
        { en: 'Data extraction and analysis for Power BI', ar: 'استخراج البيانات وتحليلها لـ Power BI' },
        { en: 'KPI-driven dashboard design', ar: 'تصميم لوحات حول مؤشرات الأداء' },
      ],
      impact: [{ en: 'Automated reporting and reduced manual effort.', ar: 'أتمتة التقارير وتقليل الجهد اليدوي.' }],
      githubUrl: '',
      demoUrl: '',
    },
    {
      id: 'sgs-reporting',
      title: { en: 'Automated Executive Reporting', ar: 'التقارير التنفيذية الآلية' },
      shortDescription: {
        en: 'Automated dashboards and executive reports from business and operational analysis on SAP data.',
        ar: 'لوحات آلية وتقارير تنفيذية من تحليل الأعمال والعمليات على بيانات SAP.',
      },
      context: { en: 'Saudi Ground Services', ar: 'الشركة السعودية للخدمات الأرضية' },
      kind: 'professional',
      start: '2025-10',
      end: '2025-12',
      categories: ['analytics'],
      visual: 'reporting',
      technologies: ['SAP', { en: 'BI tools', ar: 'أدوات BI' }],
      brief: {
        problem: { en: 'Business and operational data in SAP needed to reach leadership as clear reporting.', ar: 'بيانات الأعمال والعمليات في SAP كانت بحاجة إلى أن تصل للإدارة في تقارير واضحة.' },
        approach: { en: 'Automated dashboards and reporting on SAP and BI tools, built with cross-functional teams.', ar: 'لوحات وتقارير آلية عبر SAP وأدوات BI بالتعاون مع فرق متعددة التخصصات.' },
        result: { en: '15+ automated dashboards and 20+ executive reports.', ar: 'أكثر من 15 لوحة آلية وأكثر من 20 تقريرًا تنفيذيًا.' },
      },
      metrics: [
        { value: '15+', label: { en: 'Automated dashboards', ar: 'لوحة آلية' } },
        { value: '20+', label: { en: 'Executive reports', ar: 'تقرير تنفيذي' } },
      ],
      overview: {
        en: 'Automated dashboards and executive reporting for business and operations.',
        ar: 'لوحات آلية وتقارير تنفيذية لتحليل الأعمال والعمليات.',
      },
      solution: {
        en: 'Automated dashboards and reporting solutions on SAP and BI tools, built with cross-functional teams.',
        ar: 'لوحات وحلول تقارير آلية عبر SAP وأدوات BI بالتعاون مع فرق متعددة التخصصات.',
      },
      methodology: [
        { en: 'Business and operational analysis', ar: 'تحليل الأعمال والعمليات' },
        { en: 'Automated dashboards on SAP data', ar: 'لوحات آلية على بيانات SAP' },
        { en: 'Executive reports for leadership', ar: 'تقارير تنفيذية للإدارة' },
      ],
      githubUrl: '',
      demoUrl: '',
    },
    {
      id: 'maarefah-plus',
      title: { en: 'Maarefah Plus Platform', ar: 'منصة معرفة بلس' },
      shortDescription: {
        en: 'Internal knowledge platform centralizing access across teams, built with Python and SQLite.',
        ar: 'منصة معرفية داخلية تمركز الوصول إلى المعرفة بين الفرق، مبنية بـ Python وSQLite.',
      },
      context: { en: 'Holy Makkah Municipality', ar: 'أمانة العاصمة المقدسة' },
      kind: 'professional',
      start: '2025-12',
      end: 'Present',
      categories: ['data-engineering'],
      visual: 'platform',
      technologies: ['Python', 'SQLite', { en: 'Full-stack web', ar: 'تطوير ويب متكامل' }],
      brief: {
        problem: { en: 'Knowledge was scattered across teams.', ar: 'المعرفة كانت مشتتة بين الفرق.' },
        approach: { en: 'A Python and SQLite platform with a full-stack web interface.', ar: 'منصة بـ Python وSQLite مع واجهة ويب متكاملة.' },
        result: { en: 'One central place for knowledge, and better collaboration.', ar: 'مرجع مركزي واحد للمعرفة وتعاون أفضل.' },
      },
      metrics: [],
      overview: { en: 'A centralized knowledge platform for municipality teams.', ar: 'منصة معرفية مركزية لفرق الأمانة.' },
      problem: {
        en: 'Knowledge access was not centralized, limiting collaboration across teams.',
        ar: 'الوصول إلى المعرفة لم يكن مركزيًا، مما حدّ من التعاون بين الفرق.',
      },
      solution: {
        en: 'A Python and SQLite platform with a full-stack web interface as one place to find knowledge.',
        ar: 'منصة بـ Python وSQLite وواجهة ويب متكاملة كمرجع واحد للمعرفة.',
      },
      methodology: [
        { en: 'Python application layer', ar: 'طبقة تطبيق بـ Python' },
        { en: 'SQLite storage', ar: 'تخزين في SQLite' },
        { en: 'Full-stack web interface', ar: 'واجهة ويب متكاملة' },
      ],
      impact: [{ en: 'Centralized knowledge access and better collaboration.', ar: 'مركزة الوصول إلى المعرفة وتحسين التعاون.' }],
      githubUrl: '',
      demoUrl: '',
    },
    {
      id: 'car-damage',
      title: { en: 'Car Damage Analysis Pipeline', ar: 'نظام تحليل أضرار المركبات' },
      shortDescription: {
        en: 'Detects damage, grades severity and identifies the part, then estimates cost and generates PDF reports.',
        ar: 'يكتشف الضرر ويصنّف شدته ويحدد القطعة، ثم يقدّر التكلفة ويولّد تقارير PDF.',
      },
      context: { en: 'Graduation project · University of Jeddah', ar: 'مشروع التخرج · جامعة جدة' },
      kind: 'graduation',
      start: '2024-10',
      end: '2025-01',
      categories: ['ai'],
      visual: 'vision',
      technologies: ['YOLOv8', 'EfficientNetB0', 'OpenCV', 'Pandas', 'Streamlit'],
      brief: {
        problem: { en: 'Assessing vehicle damage — what, how severe, which part, what cost — takes several manual steps.', ar: 'تقييم ضرر المركبة، بنوعه وشدته والقطعة المتضررة وتكلفته، يمر بعدة خطوات يدوية.' },
        approach: { en: 'YOLOv8 and EfficientNetB0 models on 23,000+ processed images, combined by a rule-based cost estimator.', ar: 'نماذج YOLOv8 وEfficientNetB0 على أكثر من 23,000 صورة معالجة، يجمعها مقدِّر تكلفة قائم على القواعد.' },
        result: { en: 'One workflow from an uploaded photo to a PDF damage report.', ar: 'مسار واحد من الصورة المرفوعة حتى تقرير PDF للأضرار.' },
      },
      metrics: [
        { value: '81%', label: { en: 'Damage detection', ar: 'اكتشاف الضرر' } },
        { value: '93%', label: { en: 'Severity classification', ar: 'تصنيف الشدة' } },
        { value: '100%', label: { en: 'Part identification', ar: 'تحديد القطعة' } },
        { value: '21', label: { en: 'Car parts covered', ar: 'قطعة مركبة' } },
        { value: '23K+', label: { en: 'Images processed', ar: 'صورة معالجة' } },
      ],
      overview: {
        en: 'A unified platform for damage detection, severity grading, part identification and repair-cost estimation, delivered as a Streamlit app.',
        ar: 'منصة موحّدة لاكتشاف الضرر وتصنيف شدته وتحديد القطعة وتقدير تكلفة الإصلاح، عبر تطبيق Streamlit.',
      },
      solution: {
        en: 'YOLOv8 and EfficientNetB0 models handle detection, severity and part identification; a rule-based estimator combines their outputs.',
        ar: 'نماذج YOLOv8 وEfficientNetB0 للاكتشاف والشدة وتحديد القطعة، ومقدِّر قائم على القواعد يجمع مخرجاتها.',
      },
      methodology: [
        { en: 'Processed 23,000+ images with OpenCV and Pandas', ar: 'معالجة أكثر من 23,000 صورة عبر OpenCV وPandas' },
        { en: 'Trained YOLOv8 and EfficientNetB0 models', ar: 'تدريب نماذج YOLOv8 وEfficientNetB0' },
        { en: 'Rule-based cost estimator over all model outputs', ar: 'مقدِّر تكلفة قائم على القواعد يدمج مخرجات النماذج' },
        { en: 'Streamlit app with automated PDF reports', ar: 'تطبيق Streamlit مع تقارير PDF آلية' },
      ],
      impact: [{ en: 'One workflow from uploaded image to PDF report.', ar: 'مسار واحد من الصورة حتى تقرير PDF.' }],
      githubUrl: 'https://github.com/Mr-Sari/Car-Damage-Analysis-Pipeline',
      demoUrl: '',
    },
    {
      id: 'weather-automation',
      title: { en: 'Weather Report Automation', ar: 'أتمتة تقارير الطقس' },
      shortDescription: {
        en: 'Python automation of hourly weather reports, with DuckDB query tuning and Docker environments.',
        ar: 'أتمتة تقارير الطقس الساعية بـ Python، مع تحسين استعلامات DuckDB وبيئات Docker.',
      },
      context: { en: 'National Center of Meteorology', ar: 'المركز الوطني للأرصاد' },
      kind: 'professional',
      start: '2024-06',
      end: '2024-08',
      categories: ['data-engineering'],
      visual: 'pipeline',
      technologies: ['Python', 'Pandas', 'Regex', 'DuckDB', 'Docker'],
      brief: {
        problem: { en: 'Hourly weather reports were entered by hand.', ar: 'تقارير الطقس الساعية كانت تُدخل يدويًا.' },
        approach: { en: 'Reports parsed with Pandas and Regex; SQL tuned in DuckDB; Docker for consistent environments.', ar: 'تحليل التقارير بـ Pandas وRegex، وتحسين SQL في DuckDB، وDocker لتوحيد البيئات.' },
        result: { en: 'Manual entry eliminated and database performance improved.', ar: 'إلغاء الإدخال اليدوي وتحسين أداء قاعدة البيانات.' },
      },
      metrics: [],
      overview: { en: 'Automated processing of hourly weather reports.', ar: 'أتمتة معالجة تقارير الطقس الساعية.' },
      problem: { en: 'Hourly weather reports were entered manually.', ar: 'كانت تقارير الطقس الساعية تُدخل يدويًا.' },
      solution: {
        en: 'Reports parsed with Pandas and Regex, queries optimized in DuckDB, environments standardized with Docker and Git.',
        ar: 'تحليل التقارير عبر Pandas وRegex، وتحسين الاستعلامات في DuckDB، وتوحيد البيئات عبر Docker وGit.',
      },
      methodology: [
        { en: 'Report parsing (Regex, Pandas)', ar: 'تحليل التقارير عبر Regex وPandas' },
        { en: 'SQL optimization in DuckDB', ar: 'تحسين SQL في DuckDB' },
        { en: 'Docker and Git', ar: 'Docker وGit' },
      ],
      impact: [
        { en: 'Eliminated manual entry.', ar: 'إلغاء الإدخال اليدوي.' },
        { en: 'Improved database performance.', ar: 'تحسين أداء قاعدة البيانات.' },
      ],
      githubUrl: '',
      demoUrl: '',
    },
    {
      id: 'icao-classification',
      title: { en: 'ICAO Message Classification', ar: 'تصنيف رسائل ICAO' },
      shortDescription: {
        en: 'Classifies flight-arrival ICAO messages using time-series analysis.',
        ar: 'تصنيف رسائل ICAO لوصول الرحلات باستخدام تحليل السلاسل الزمنية.',
      },
      context: { en: 'National Center of Meteorology', ar: 'المركز الوطني للأرصاد' },
      kind: 'professional',
      start: '2024-06',
      end: '2024-08',
      categories: ['data-science'],
      visual: 'timeseries',
      technologies: ['Python', 'Pandas', { en: 'Time-series analysis', ar: 'السلاسل الزمنية' }],
      brief: {
        problem: { en: 'Flight-arrival ICAO messages needed to be classified automatically.', ar: 'رسائل ICAO الخاصة بوصول الرحلات كانت بحاجة إلى تصنيف آلي.' },
        approach: { en: 'Time-series analysis of ICAO messages with Python and Pandas.', ar: 'تحليل السلاسل الزمنية لرسائل ICAO باستخدام Python وPandas.' },
        result: { en: 'A classification system for flight-arrival messages.', ar: 'نظام لتصنيف رسائل وصول الرحلات.' },
      },
      metrics: [],
      overview: { en: 'A system that classifies ICAO messages for flight arrivals.', ar: 'نظام يصنّف رسائل ICAO الخاصة بوصول الرحلات.' },
      solution: {
        en: 'Time-series analysis applied to classify ICAO messages related to flight arrivals.',
        ar: 'تطبيق تحليل السلاسل الزمنية لتصنيف رسائل ICAO المتعلقة بوصول الرحلات.',
      },
      methodology: [
        { en: 'Time-series analysis of ICAO messages', ar: 'تحليل السلاسل الزمنية لرسائل ICAO' },
        { en: 'Flight-arrival classification', ar: 'تصنيف رسائل الوصول' },
      ],
      githubUrl: '',
      demoUrl: '',
    },
  ],

  skillCategories: [
    {
      id: 'analytics',
      label: { en: 'Data Analytics', ar: 'تحليل البيانات' },
      description: { en: 'Querying, analysing and reporting', ar: 'الاستعلام والتحليل وإعداد التقارير' },
      primary: true,
    },
    {
      id: 'bi',
      label: { en: 'Business Intelligence', ar: 'ذكاء الأعمال' },
      description: { en: 'Modelling, dashboards and KPIs', ar: 'النمذجة ولوحات المعلومات ومؤشرات الأداء' },
    },
    {
      id: 'ai',
      label: { en: 'Data Science & AI', ar: 'علم البيانات والذكاء الاصطناعي' },
      description: { en: 'Models, LLMs and computer vision', ar: 'النماذج والنماذج اللغوية والرؤية الحاسوبية' },
    },
    {
      id: 'engineering',
      label: { en: 'Data Engineering', ar: 'هندسة البيانات' },
      description: { en: 'Pipelines, integration and tooling', ar: 'مسارات البيانات والتكامل والأدوات' },
    },
  ],

  skills: [
    { name: 'Power BI', icon: 'powerbi', category: 'analytics' },
    { name: 'Excel', icon: 'excel', category: 'analytics' },
    { name: 'SQL', icon: 'sql', category: 'analytics' },
    { name: 'Python', icon: 'python', category: 'analytics' },

    { name: 'DAX', icon: 'sigma', category: 'bi' },
    { name: 'Power Query', icon: 'filter', category: 'bi' },
    { name: { en: 'Data Visualization', ar: 'تصوير البيانات' }, icon: 'dashboard', category: 'bi' },

    { name: { en: 'Machine Learning', ar: 'تعلم الآلة' }, icon: 'brain', category: 'ai' },
    { name: 'NLP', icon: 'message', category: 'ai' },
    { name: { en: 'Computer Vision', ar: 'الرؤية الحاسوبية' }, icon: 'eye', category: 'ai' },
    { name: { en: 'Generative AI', ar: 'الذكاء الاصطناعي التوليدي' }, icon: 'sparkles', category: 'ai' },
    { name: 'RAG', icon: 'search', category: 'ai' },
    { name: 'LLMs', icon: 'bot', category: 'ai' },

    { name: 'ETL', icon: 'workflow', category: 'engineering' },
    { name: 'APIs', icon: 'terminal', category: 'engineering' },
    { name: 'Docker', icon: 'docker', category: 'engineering' },
    { name: 'Git', icon: 'git', category: 'engineering' },
  ],

  /** Other tools from the CV and roles, listed without emphasis. */
  tools: [
    'SAP',
    'Toad',
    'Pandas',
    'DuckDB',
    'SQLite',
    'Delta Lake',
    'Streamlit',
    'LangChain',
    'YOLOv8',
    'OpenCV',
    { en: 'Deep Learning', ar: 'التعلم العميق' },
    { en: 'Prompt Engineering', ar: 'هندسة الأوامر' },
    'JavaScript',
    'TypeScript',
  ],

  softSkills: [
    { en: 'Problem Solving', ar: 'حل المشكلات' },
    { en: 'Analytical Thinking', ar: 'التفكير التحليلي' },
    { en: 'Collaboration', ar: 'العمل الجماعي' },
    { en: 'Business Understanding', ar: 'فهم الأعمال' },
    { en: 'Time Management', ar: 'إدارة الوقت' },
  ],

  education: [
    {
      id: 'uj-bsc',
      degree: { en: 'Bachelor of Data Science', ar: 'بكالوريوس علم البيانات' },
      institution: { en: 'University of Jeddah', ar: 'جامعة جدة' },
      college: { en: 'College of Computer Science and Engineering', ar: 'كلية علوم وهندسة الحاسب' },
      location: { en: 'Jeddah', ar: 'جدة' },
      start: '2020-08',
      end: '2025-01',
      gpa: { value: 4.43, scale: 5 },
      honors: { en: 'Second Class Honors', ar: 'مرتبة الشرف الثانية' },
      coursework: [
        { en: 'Machine Learning', ar: 'تعلم الآلة' },
        { en: 'Data Mining', ar: 'التنقيب في البيانات' },
        { en: 'Big Data Analytics', ar: 'تحليلات البيانات الضخمة' },
        { en: 'Database Systems', ar: 'نظم قواعد البيانات' },
        { en: 'Cloud Computing', ar: 'الحوسبة السحابية' },
        { en: 'NLP', ar: 'معالجة اللغة الطبيعية' },
      ],
    },
  ],

  certifications: [
    {
      id: 'google-ada',
      name: { en: 'Google Advanced Data Analytics Specialization', ar: 'تخصص Google المتقدم في تحليل البيانات' },
      issuer: 'Google',
      issuerIcon: 'google',
      date: '2024-02',
      category: { en: 'Data Analytics', ar: 'تحليل البيانات' },
    },
    {
      id: 'datacamp-ada',
      name: { en: 'Associate Data Analyst', ar: 'محلل بيانات مشارك' },
      issuer: 'DataCamp',
      issuerIcon: 'datacamp',
      date: '2025-04',
      category: { en: 'Data Analytics', ar: 'تحليل البيانات' },
    },
    {
      id: 'ibm-ds',
      name: { en: 'IBM Data Science Specialization', ar: 'تخصص IBM في علم البيانات' },
      issuer: 'IBM',
      issuerIcon: 'ibm',
      date: '2023-05',
      category: { en: 'Data Science', ar: 'علم البيانات' },
    },
    {
      id: 'dlai-nlp',
      name: { en: 'Natural Language Processing Specialization', ar: 'تخصص معالجة اللغة الطبيعية' },
      issuer: 'DeepLearning.AI',
      issuerIcon: 'deeplearningai',
      date: '2024-02',
      category: { en: 'NLP', ar: 'معالجة اللغة' },
    },
    {
      id: 'ibm-tuwaiq-genai',
      name: {
        en: 'Using Generative AI for Software Development (Guided Learning, 1Q 2025)',
        ar: 'الذكاء الاصطناعي التوليدي في تطوير البرمجيات (تعلّم موجّه، الربع الأول 2025)',
      },
      issuer: { en: 'IBM & Tuwaiq Camp', ar: 'IBM ومعسكر طويق' },
      issuerIcon: 'ibm',
      date: '2025-02',
      category: { en: 'Generative AI', ar: 'الذكاء الاصطناعي التوليدي' },
    },
  ],

  seo: {
    title: { en: 'Sari Alsulami — Data Analyst', ar: 'ساري السلمي — محلل بيانات' },
    description: {
      en: 'Portfolio of Sari Owaid Alsulami, a Data Analyst in Saudi Arabia: Power BI dashboards, SQL, Python and business intelligence, with data engineering and applied AI.',
      ar: 'ملف أعمال ساري عويض السلمي، محلل بيانات في المملكة العربية السعودية: لوحات Power BI وSQL وPython وذكاء الأعمال، مع هندسة البيانات والذكاء الاصطناعي.',
    },
    keywords: [
      'Sari Alsulami',
      'Data Analyst',
      'Business Intelligence',
      'Power BI',
      'SQL',
      'Python',
      'Excel',
      'Data Science',
      'Data Engineering',
      'Machine Learning',
      'LLM',
      'RAG',
      'Saudi Arabia',
      'محلل بيانات',
      'ذكاء الأعمال',
    ],
  },
};
