import type { Bilingual, PortfolioData } from './types.ts';

/**
 * Single source of truth for all portfolio content, in English and Arabic.
 * Extracted from the CV ("Sari Alsulami - Data Science"). Nothing is invented:
 * where the CV gives no detail (a problem statement, a repository, a demo)
 * the field is omitted or left empty and the UI adapts.
 *
 * Each figure has one home: work metrics live in Experience, project results
 * in the project modal, GPA in Education.
 */
export const content: Bilingual<PortfolioData> = {
  personal: {
    name: { en: 'Sari Owaid Alsulami', ar: 'ساري عويض السلمي' },
    shortName: { en: 'Sari Alsulami', ar: 'ساري السلمي' },
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
    hero: { en: 'Turning data into decisions.', ar: 'أحوّل البيانات إلى قرارات.' },
    heroSub: {
      en: 'I turn data into actionable insights and better decisions.',
      ar: 'أحوّل البيانات إلى رؤى قابلة للتنفيذ وقرارات أفضل.',
    },
    philosophy: { en: 'Data tells a story. I turn it into action.', ar: 'البيانات تحكي قصة، وأنا أحوّلها إلى أثر.' },
    interlude: {
      lead: { en: 'From raw data', ar: 'من البيانات الخام' },
      accent: { en: 'to meaningful insights.', ar: 'إلى رؤى ذات قيمة.' },
    },
    closing: {
      lead: { en: 'Analyze. Understand.', ar: 'حلّل. افهم.' },
      accent: { en: 'Improve.', ar: 'طوّر.' },
      sub: {
        en: 'Have data that should be driving better decisions? Let’s talk.',
        ar: 'لديك بيانات يمكن أن تقود قرارات أفضل؟ لنتحدث.',
      },
    },
  },

  heroStack: ['Power BI + DAX', 'SQL + Python', 'Excel + Power Query', 'ETL + Data Quality', 'RAG + LLMs'],

  about: {
    paragraphs: [
      {
        en: 'A Data Analyst working across government and enterprise. I turn raw data into dashboards, KPIs and reports that leaders can act on — backed by data engineering, and by AI and LLMs where they make analysis faster.',
        ar: 'محلل بيانات أعمل في القطاعين الحكومي والخاص. أحوّل البيانات الخام إلى لوحات معلومات ومؤشرات أداء وتقارير يمكن للقيادات أن تتخذ قراراتها بناءً عليها، مدعومًا بهندسة البيانات، وبالذكاء الاصطناعي والنماذج اللغوية حين تختصر وقت التحليل.',
      },
    ],
    keywords: [
      { en: 'Data Analyst', ar: 'محلل بيانات' },
      { en: 'dashboards, KPIs and reports', ar: 'لوحات معلومات ومؤشرات أداء وتقارير' },
      { en: 'data engineering', ar: 'بهندسة البيانات' },
      { en: 'AI and LLMs', ar: 'بالذكاء الاصطناعي والنماذج اللغوية' },
    ],
    focusAreas: [
      {
        title: { en: 'Analytics & BI', ar: 'التحليل وذكاء الأعمال' },
        description: { en: 'Power BI dashboards, KPIs, reporting', ar: 'لوحات Power BI ومؤشرات وتقارير' },
        icon: 'dashboard',
      },
      {
        title: { en: 'Data Engineering', ar: 'هندسة البيانات' },
        description: { en: 'SQL, ETL, automation', ar: 'SQL وETL والأتمتة' },
        icon: 'workflow',
      },
      {
        title: { en: 'AI & LLMs', ar: 'الذكاء الاصطناعي والنماذج اللغوية' },
        description: { en: 'RAG, structured LLM outputs', ar: 'أنظمة RAG ومخرجات منظّمة' },
        icon: 'brain',
      },
      {
        title: { en: 'Machine Learning', ar: 'تعلم الآلة' },
        description: { en: 'Detection & classification models', ar: 'نماذج الاكتشاف والتصنيف' },
        icon: 'scan',
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
        en: 'Data analysis, dashboard development and KPI reporting.',
        ar: 'تحليل البيانات وتطوير لوحات المعلومات وتقارير مؤشرات الأداء.',
      },
      achievements: [
        {
          en: 'Designed 10+ Power BI dashboards tracking 25+ KPIs, automating reporting and cutting manual effort.',
          ar: 'تصميم أكثر من 10 لوحات Power BI تتابع أكثر من 25 مؤشر أداء، مع أتمتة التقارير وتقليل الجهد اليدوي.',
        },
        {
          en: 'Analyze operational data with Power BI (DAX, Power Query), Excel (Pivot Tables) and SAP for data-driven reporting.',
          ar: 'تحليل البيانات التشغيلية باستخدام Power BI (DAX وPower Query) وExcel (Pivot Tables) وSAP لإعداد تقارير مبنية على البيانات.',
        },
        {
          en: 'Run ETL and data-quality checks so every report rests on clean, reliable data.',
          ar: 'تنفيذ عمليات ETL وفحوصات جودة البيانات لتستند كل التقارير إلى بيانات نظيفة وموثوقة.',
        },
      ],
      responsibilities: [
        {
          en: 'Built database views and optimized SQL queries (Toad) for extraction, analysis and Power BI.',
          ar: 'بناء عروض قواعد البيانات وتحسين استعلامات SQL (Toad) للاستخراج والتحليل وربطها بـ Power BI.',
        },
        {
          en: 'Built the “Maarefah Plus” knowledge platform (Python, SQLite) to centralize knowledge across teams.',
          ar: 'بناء منصة «معرفة بلس» (Python وSQLite) لمركزة المعرفة بين الفرق.',
        },
        {
          en: 'Contributed to Digital Transformation Measurement to raise digital maturity and productivity.',
          ar: 'المساهمة في قياس التحول الرقمي لرفع النضج الرقمي والإنتاجية.',
        },
      ],
      technologies: ['Power BI', 'DAX', 'Power Query', 'Excel', 'SAP', 'SQL', 'ETL'],
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
        en: 'Automated dashboards and executive reporting on SAP data.',
        ar: 'لوحات آلية وتقارير تنفيذية على بيانات SAP.',
      },
      achievements: [
        {
          en: 'Developed 15+ automated dashboards and reporting solutions with SAP and BI tools.',
          ar: 'تطوير أكثر من 15 لوحة وحل تقارير آلي عبر SAP وأدوات BI.',
        },
        {
          en: 'Produced 20+ executive reports from business and operational analysis.',
          ar: 'إعداد أكثر من 20 تقريرًا تنفيذيًا من تحليل الأعمال والعمليات.',
        },
      ],
      responsibilities: [
        {
          en: 'Worked with cross-functional teams to implement data-driven solutions.',
          ar: 'التعاون مع فرق متعددة التخصصات لتطبيق حلول مبنية على البيانات.',
        },
      ],
      technologies: ['SAP', { en: 'BI tools', ar: 'أدوات BI' }],
    },
    {
      id: 'ncm',
      company: { en: 'National Center of Meteorology (NCM)', ar: 'المركز الوطني للأرصاد (NCM)' },
      role: { en: 'Data Engineer Intern', ar: 'متدرب هندسة بيانات' },
      location: { en: 'Jeddah', ar: 'جدة' },
      start: '2024-06',
      end: '2024-08',
      employmentType: { en: 'Internship', ar: 'تدريب تعاوني' },
      sector: { en: 'Government', ar: 'قطاع حكومي' },
      summary: {
        en: 'Weather-report automation and ICAO message classification.',
        ar: 'أتمتة تقارير الطقس وتصنيف رسائل ICAO.',
      },
      achievements: [
        {
          en: 'Automated hourly weather-report processing with Python (Pandas, Regex), eliminating manual entry.',
          ar: 'أتمتة معالجة تقارير الطقس الساعية بـ Python (Pandas وRegex) وإلغاء الإدخال اليدوي.',
        },
        {
          en: 'Optimized SQL queries in DuckDB, improving database performance.',
          ar: 'تحسين استعلامات SQL في DuckDB ورفع أداء قاعدة البيانات.',
        },
      ],
      responsibilities: [
        {
          en: 'Built an ICAO message classification system for flight arrivals using time-series analysis.',
          ar: 'بناء نظام لتصنيف رسائل ICAO لوصول الرحلات باستخدام تحليل السلاسل الزمنية.',
        },
        {
          en: 'Used Docker and Git for consistent environments and version control.',
          ar: 'استخدام Docker وGit لتوحيد البيئات وإدارة الإصدارات.',
        },
      ],
      technologies: ['Python', 'Pandas', 'DuckDB', 'SQL', 'Docker', 'Git'],
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
        problem: { en: 'KPI reporting relied on manual work.', ar: 'تقارير المؤشرات كانت تعتمد على عمل يدوي.' },
        solution: { en: 'Power BI dashboards on optimized SQL views.', ar: 'لوحات Power BI على عروض SQL محسّنة.' },
        result: { en: 'Automated, always-current KPI reporting.', ar: 'تقارير مؤشرات آلية ومحدّثة دائمًا.' },
      },
      metrics: [],
      overview: { en: 'A suite of Power BI dashboards that automates KPI reporting.', ar: 'مجموعة لوحات Power BI تؤتمت تقارير مؤشرات الأداء.' },
      problem: { en: 'Reporting relied on manual effort.', ar: 'اعتماد التقارير على جهد يدوي.' },
      solution: {
        en: 'Database views and optimized queries in Toad and SQL feed Power BI dashboards designed around the organization’s KPIs.',
        ar: 'عروض قواعد بيانات واستعلامات محسّنة عبر Toad وSQL تغذّي لوحات Power BI مصممة حول مؤشرات الأداء.',
      },
      methodology: [
        { en: 'Database views and query optimization (Toad, SQL)', ar: 'عروض قواعد البيانات وتحسين الاستعلامات (Toad وSQL)' },
        { en: 'Data extraction and analysis for Power BI', ar: 'استخراج البيانات وتحليلها لـ Power BI' },
        { en: 'KPI-driven dashboard design', ar: 'تصميم لوحات حول مؤشرات الأداء' },
      ],
      impact: [{ en: 'Automated reporting and reduced manual effort.', ar: 'أتمتة التقارير وتقليل الجهد اليدوي.' }],
      githubUrl: '',
      demoUrl: '',
    },
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
        solution: { en: 'Semantic retrieval with LangChain and ChromaDB.', ar: 'استرجاع دلالي عبر LangChain وChromaDB.' },
        result: { en: 'Answers that cite their source documents.', ar: 'إجابات تستشهد بمصادرها.' },
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
        solution: { en: 'Structured LLM pipeline with Pydantic outputs.', ar: 'خط معالجة بنماذج لغوية ومخرجات Pydantic منظّمة.' },
        result: { en: 'Gap analysis, tailored resume and cover letter in one run.', ar: 'تحليل الفجوات وسيرة وخطاب مخصصان في تشغيل واحد.' },
      },
      metrics: [],
      overview: {
        en: 'An LLM assistant for resume–job matching and optimization, unified in one pipeline (run_resume_rocket).',
        ar: 'مساعد مبني على النماذج اللغوية لمطابقة السيرة مع الوظيفة وتحسينها، موحَّد في خط معالجة واحد (run_resume_rocket).',
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
        solution: { en: 'YOLOv8 + EfficientNetB0 models and a rule-based cost estimator.', ar: 'نماذج YOLOv8 وEfficientNetB0 ومقدِّر تكلفة بالقواعد.' },
        result: { en: 'From one photo to a full PDF damage report.', ar: 'من صورة واحدة إلى تقرير PDF كامل.' },
      },
      metrics: [
        { value: '81%', label: { en: 'Damage detection', ar: 'اكتشاف الضرر' } },
        { value: '93%', label: { en: 'Severity classification', ar: 'تصنيف الشدة' } },
        { value: '100%', label: { en: 'Part identification', ar: 'تحديد القطعة' } },
        { value: '21', label: { en: 'Car parts covered', ar: 'قطعة مركبة' } },
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
        solution: { en: 'Automated dashboards on SAP and BI tools.', ar: 'لوحات آلية على SAP وأدوات BI.' },
        result: { en: 'Executive-ready reporting for leadership.', ar: 'تقارير جاهزة للإدارة التنفيذية.' },
      },
      metrics: [],
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
        solution: { en: 'Python parsing (Pandas, Regex) and tuned DuckDB queries.', ar: 'تحليل بـ Python (Pandas وRegex) واستعلامات DuckDB محسّنة.' },
        result: { en: 'Manual entry eliminated.', ar: 'إلغاء الإدخال اليدوي.' },
      },
      metrics: [],
      overview: { en: 'Automated processing of hourly weather reports.', ar: 'أتمتة معالجة تقارير الطقس الساعية.' },
      problem: { en: 'Hourly weather reports were entered manually.', ar: 'كانت تقارير الطقس الساعية تُدخل يدويًا.' },
      solution: {
        en: 'Reports parsed with Pandas and Regex, queries optimized in DuckDB, environments standardized with Docker and Git.',
        ar: 'تحليل التقارير عبر Pandas وRegex، وتحسين الاستعلامات في DuckDB، وتوحيد البيئات عبر Docker وGit.',
      },
      methodology: [
        { en: 'Report parsing (Regex, Pandas)', ar: 'تحليل التقارير (Regex وPandas)' },
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
        solution: { en: 'A Python + SQLite web platform.', ar: 'منصة ويب بـ Python وSQLite.' },
        result: { en: 'One central place for knowledge.', ar: 'مرجع مركزي واحد للمعرفة.' },
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
        solution: { en: 'Time-series analysis of flight-arrival ICAO messages.', ar: 'تحليل السلاسل الزمنية لرسائل ICAO لوصول الرحلات.' },
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
    { id: 'analytics', label: { en: 'Data Analytics', ar: 'تحليل البيانات' }, primary: true },
    { id: 'bi', label: { en: 'Business Intelligence', ar: 'ذكاء الأعمال' } },
    { id: 'data', label: { en: 'Data Processing', ar: 'معالجة البيانات' } },
    { id: 'ai', label: { en: 'Data Science & AI', ar: 'علم البيانات والذكاء الاصطناعي' } },
    { id: 'engineering', label: { en: 'Engineering & Tools', ar: 'الهندسة والأدوات' } },
  ],

  skills: [
    { name: 'Power BI', icon: 'powerbi', category: 'analytics' },
    { name: 'Excel', icon: 'excel', category: 'analytics' },
    { name: 'SQL', icon: 'sql', category: 'analytics' },
    { name: 'Python', icon: 'python', category: 'analytics' },

    { name: 'DAX', icon: 'sigma', category: 'bi' },
    { name: 'Power Query', icon: 'filter', category: 'bi' },
    { name: 'Pivot Tables', icon: 'table', category: 'bi' },
    { name: { en: 'Data Visualization', ar: 'تصوير البيانات' }, icon: 'dashboard', category: 'bi' },
    { name: { en: 'Dashboards & KPIs', ar: 'لوحات ومؤشرات أداء' }, icon: 'gauge', category: 'bi' },
    { name: 'SAP', icon: 'sap', category: 'bi' },

    { name: 'Pandas', icon: 'pandas', category: 'data' },
    { name: 'ETL', icon: 'workflow', category: 'data' },
    { name: { en: 'Data Cleaning', ar: 'تنظيف البيانات' }, icon: 'sparkles', category: 'data' },
    { name: { en: 'Data Processing', ar: 'معالجة البيانات' }, icon: 'layers', category: 'data' },
    { name: 'DuckDB', icon: 'duckdb', category: 'data' },
    { name: 'SQLite', icon: 'sqlite', category: 'data' },
    { name: 'Toad', icon: 'database', category: 'data' },

    { name: { en: 'Machine Learning', ar: 'تعلم الآلة' }, icon: 'brain', category: 'ai' },
    { name: 'NLP', icon: 'message', category: 'ai' },
    { name: { en: 'Computer Vision', ar: 'الرؤية الحاسوبية' }, icon: 'eye', category: 'ai' },
    { name: { en: 'Generative AI', ar: 'الذكاء الاصطناعي التوليدي' }, icon: 'sparkles', category: 'ai' },
    { name: 'RAG', icon: 'search', category: 'ai' },
    { name: 'LLMs', icon: 'bot', category: 'ai' },
    { name: { en: 'Deep Learning', ar: 'التعلم العميق' }, icon: 'network', category: 'ai' },
    { name: 'YOLOv8', icon: 'yolo', category: 'ai' },
    { name: 'OpenCV', icon: 'opencv', category: 'ai' },
    { name: 'LangChain', icon: 'langchain', category: 'ai' },
    { name: { en: 'Prompt Engineering', ar: 'هندسة الأوامر' }, icon: 'terminal', category: 'ai' },

    { name: 'Docker', icon: 'docker', category: 'engineering' },
    { name: 'Git', icon: 'git', category: 'engineering' },
    { name: 'GitHub', icon: 'github', category: 'engineering' },
    { name: 'APIs', icon: 'terminal', category: 'engineering' },
    { name: { en: 'Data Pipelines', ar: 'خطوط البيانات' }, icon: 'workflow', category: 'engineering' },
    { name: 'Streamlit', icon: 'streamlit', category: 'engineering' },
    { name: 'JavaScript', icon: 'javascript', category: 'engineering' },
    { name: 'TypeScript', icon: 'typescript', category: 'engineering' },
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
      id: 'datacamp-ada',
      name: { en: 'Associate Data Analyst', ar: 'محلل بيانات مشارك' },
      issuer: 'DataCamp',
      issuerIcon: 'datacamp',
      date: '2025-04',
      category: { en: 'Data Analytics', ar: 'تحليل البيانات' },
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
    {
      id: 'dlai-nlp',
      name: { en: 'Natural Language Processing Specialization', ar: 'تخصص معالجة اللغة الطبيعية' },
      issuer: 'DeepLearning.AI',
      issuerIcon: 'deeplearningai',
      date: '2024-02',
      category: { en: 'NLP', ar: 'معالجة اللغة' },
    },
    {
      id: 'google-ada',
      name: { en: 'Google Advanced Data Analytics Specialization', ar: 'تخصص Google المتقدم في تحليل البيانات' },
      issuer: 'Google',
      issuerIcon: 'google',
      date: '2024-02',
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
