const STATE = {
  currentResult: null,
  analysisCount: Number(localStorage.getItem("pb_count") || 0),
  isPro: localStorage.getItem("pb_plan") === "pro"
};

let isDemoMode = false;
let currentLang = getInitialLanguage();

const translations = {
  en: {
    documentLang: "en",
    free: "Free",
    proVersion: "Pro Version",
    proActive: "Pro Active",
    demoMode: "◈ Demo Mode",
    demoOn: "◈ Demo ON",
    demoBanner: "DEMO MODE ACTIVE - Simulated AI responses",
    heroEyebrow: "Hackathon Edition",
    heroTitle: "ProjectBoost AI",
    heroSubtitle: "AI-powered project evaluator built specifically for hackathons. Get scored, get roasted, get better.",
    tagHackathons: "Hackathons",
    tagStartups: "Startups",
    tagMvp: "MVP",
    tagPitch: "Pitch",
    tagBusinessIdeas: "Business Ideas",
    tagPresentations: "Presentations",
    hackathonMode: "Hackathon Mode",
    startupMode: "Startup Mode",
    coreInformation: "Core information",
    hackathonDetails: "Hackathon details",
    marketAudience: "Market and audience",
    businessTeam: "Business and team",
    projectName: "Project name",
    projectDescription: "Project description",
    category: "Category",
    hackathonDuration: "Hackathon duration",
    teamSize: "Team size",
    projectGoal: "Project goal",
    technologiesUsed: "Technologies used",
    problemSolved: "Problem solved",
    stage: "Stage",
    developmentStage: "Development stage",
    targetAudience: "Target audience",
    monetization: "Monetization",
    marketProblem: "Market problem",
    productUniqueness: "Product uniqueness",
    competitors: "Competitors",
    mvpStatus: "MVP status",
    fundingStage: "Funding stage",
    growthPotential: "Growth potential",
    analyzeProject: "✦ Analyze Project",
    freeNote: "Free plan: 2 analyses per day. Upgrade for unlimited.",
    loadingDefault: "Analyzing your idea...",
    loadingDemo: "Simulating AI analysis...",
    loadingSubtitle: "This takes 5-15 seconds",
    scoreBreakdown: "Score Breakdown",
    scoreBreakdownPlaceholder: "Score breakdown will appear after analysis",
    scoreBreakdownLabels: {
      idea: "Idea",
      innovation: "Innovation",
      feasibility: "Feasibility",
      design: "Design",
      presentation: "Presentation",
      technicalQuality: "Technical Quality",
      marketProblem: "Market Problem",
      productValue: "Product Value",
      monetization: "Monetization",
      scalability: "Scalability",
      competition: "Competition",
      mvpReadiness: "MVP Readiness"
    },
    strongPoints: "Strong Points",
    weakPoints: "Weak Points",
    improvements: "Improvements",
    betterVersion: "Better Version",
    mvpPlan: "MVP Plan",
    teamRoles: "Team Roles",
    upgradeUnlock: "Upgrade to Pro to unlock",
    upgradeToPro: "Upgrade to Pro",
    thirtySecondPitch: "30-Second Pitch",
    oneMinutePitch: "1-Minute Pitch",
    copy: "Copy",
    copied: "Copied!",
    techStack: "Tech Stack",
    judgeReason: "Why Judges Will Choose This",
    ideaDna: "Idea DNA",
    demoIdea: "Demo Idea",
    demoWarning: "Demo Warning",
    compareMode: "Compare Mode",
    originalIdea: "Your Original Idea",
    improvedVersion: "Improved Version",
    analyzeAnother: "Analyze Another",
    copyReport: "Copy Full Report",
    qualityCollapsed: "AI Quality Check - click to expand",
    qualityExpanded: "AI Quality Check - click to collapse",
    runQuality: "Run Quality Check",
    running: "Running...",
    qualityFailed: "Quality check failed.",
    tableTestName: "Test Name",
    tableExpectedRange: "Expected Range",
    tableActualScore: "Actual Score",
    tableStatus: "Status",
    fallbackWarning: "Offline fallback analysis is active",
    descriptionTooShort: "Description too short",
    freeLimit: "Free limit reached. Switch to Pro to continue.",
    serverUnavailable: "Server is not responding. Make sure app.py is running on localhost:5000.",
    analysisUnavailable: "Analysis is unavailable right now. Turn on Demo Mode for an offline presentation.",
    analysisFailed: "Analysis failed",
    retry: "Retry",
    modalTitle: "Upgrade to Pro",
    modalClose: "Close",
    freeVersion: "Free Version",
    proVersionTier: "Pro Version",
    freeForever: "free forever",
    proPeriod: "per month, cancel anytime",
    limitedAiAnalysis: "Limited AI analysis",
    fullAiAnalysis: "Full AI analysis",
    fullAiProjectAnalysis: "Full AI project analysis",
    startupHackathonModes: "Startup + Hackathon modes",
    fastResponses: "Fast responses",
    deepStartupAnalysis: "Deep startup analysis",
    competitorAnalysis: "Competitor analysis",
    pitchPreparation: "Pitch preparation",
    monetizationAnalysis: "Monetization analysis",
    startupRoadmap: "Startup roadmap",
    basicIdeaAnalysis: "Basic idea analysis",
    twoAnalyses: "2 analyses per day",
    demoModeFeature: "Demo Mode",
    unlimitedRequests: "Unlimited requests",
    priceMonthly: "$6.79/month",
    upgradePrice: "✦ Upgrade to Pro - $6.79/month",
    promptLanguageInstruction: "Respond in English. Analyze the project in English.",
    startupModeEvaluation: "Startup mode evaluation",
    notSpecified: "Not specified",
    archetype: "Archetype",
    closestStartup: "Closest startup",
    differentiation: "Differentiation",
    month1: "Month 1",
    month6: "Month 6",
    year1: "Year 1",
    score: "Score",
    testsPassed: "tests passed",
    placeholders: {
      projectName: "e.g. CityPulse AI",
      projectDescription: "Describe your idea in detail... What problem does it solve? How does it work? What makes it unique?",
      startupName: "e.g. MedAssist AI",
      startupDescription: "What are you building, who is it for, and what makes it unique?",
      targetAudience: "B2C / B2B, segment, buyer...",
      marketProblem: "What does not work today?",
      uniqueness: "Your competitive advantage...",
      competitors: "Airbnb, Booking.com, Uber..."
    },
    options: {
      projectCategory: ["Smart City", "Government", "Healthcare", "Education", "Finance", "Transport", "Environment", "Productivity", "Other"],
      projectStage: ["Idea", "Concept", "Prototype", "MVP"],
      hackathonDuration: ["24 hours", "48 hours", "72 hours", "1 week"],
      devStage: ["Idea", "Prototype", "MVP", "Early traction", "Growth", "Scale"],
      monetization: ["Subscription (SaaS)", "Freemium", "Marketplace", "Enterprise", "Ads", "Other"],
      mvpStatus: ["No MVP", "In development", "Ready, no users yet", "First users", "Revenue generating"],
      fundingStage: ["Bootstrapped", "Pre-seed", "Seed", "Series A", "Series B+"],
      startupTeamSize: ["1 solo founder", "2-3 people", "4-6 people", "7-15 people", "15+ people"],
      growthPotential: ["Local market", "National market", "Global market", "Network effects"]
    },
    loadingMessages: [
      "Analyzing your idea...",
      "Checking uniqueness...",
      "Building MVP plan...",
      "Optimizing for hackathon...",
      "Scoring by judge criteria..."
    ]
  },
  ru: {
    documentLang: "ru",
    free: "Free",
    proVersion: "Pro-версия",
    proActive: "Pro активен",
    demoMode: "◈ Демо-режим",
    demoOn: "◈ Демо ON",
    demoBanner: "ДЕМО-РЕЖИМ АКТИВЕН - симулированные AI-ответы",
    heroEyebrow: "Режим хакатона",
    heroTitle: "ProjectBoost AI",
    heroSubtitle: "AI-платформа для оценки хакатон-проектов. Получи оценку, честную критику и план улучшений.",
    tagHackathons: "Хакатоны",
    tagStartups: "Стартапы",
    tagMvp: "MVP",
    tagPitch: "Питч",
    tagBusinessIdeas: "Бизнес-идеи",
    tagPresentations: "Презентации",
    hackathonMode: "Режим хакатона",
    startupMode: "Режим стартапа",
    coreInformation: "Основная информация",
    hackathonDetails: "Детали хакатона",
    marketAudience: "Рынок и аудитория",
    businessTeam: "Бизнес и команда",
    projectName: "Название проекта",
    projectDescription: "Описание проекта",
    category: "Категория",
    hackathonDuration: "Продолжительность хакатона",
    teamSize: "Размер команды",
    projectGoal: "Цель проекта",
    technologiesUsed: "Используемые технологии",
    problemSolved: "Какая проблема решается",
    stage: "Этап",
    developmentStage: "Этап разработки",
    targetAudience: "Целевая аудитория",
    monetization: "Монетизация",
    marketProblem: "Проблема рынка",
    productUniqueness: "Уникальность продукта",
    competitors: "Конкуренты",
    mvpStatus: "Статус MVP",
    fundingStage: "Этап финансирования",
    growthPotential: "Потенциал роста",
    analyzeProject: "✦ Проанализировать проект",
    freeNote: "Free план: 2 анализа в день. Перейдите на Pro для безлимита.",
    loadingDefault: "Анализируем идею...",
    loadingDemo: "Симулируем AI-анализ...",
    loadingSubtitle: "Это занимает 5-15 секунд",
    scoreBreakdown: "Разбивка оценки",
    scoreBreakdownPlaceholder: "Разбор оценок появится после анализа",
    hackathonScoreLabels: ["Идея", "Инновации", "Реализуемость", "Дизайн", "Презентация", "Техническое качество"],
    startupScoreLabels: ["Проблема рынка", "Ценность продукта", "Монетизация", "Масштабируемость", "Конкуренция", "Готовность MVP"],
    strongPoints: "Сильные стороны",
    weakPoints: "Слабые стороны",
    improvements: "Улучшения",
    betterVersion: "Улучшенная версия",
    mvpPlan: "MVP-план",
    teamRoles: "Роли в команде",
    upgradeUnlock: "Перейдите на Pro, чтобы открыть",
    upgradeToPro: "Перейти на Pro",
    thirtySecondPitch: "30-секундный питч",
    oneMinutePitch: "1-минутный питч",
    copy: "Копировать",
    copied: "Скопировано!",
    techStack: "Технологический стек",
    judgeReason: "Почему судьи выберут это",
    ideaDna: "ДНК идеи",
    demoIdea: "Идея демо",
    demoWarning: "Предупреждение для демо",
    compareMode: "Режим сравнения",
    originalIdea: "Исходная идея",
    improvedVersion: "Улучшенная версия",
    analyzeAnother: "Проанализировать ещё",
    copyReport: "Копировать отчёт",
    qualityCollapsed: "AI Quality Check - открыть",
    qualityExpanded: "AI Quality Check - свернуть",
    runQuality: "Запустить проверку качества",
    running: "Запуск...",
    qualityFailed: "Проверка качества не удалась.",
    tableTestName: "Тест",
    tableExpectedRange: "Ожидаемый диапазон",
    tableActualScore: "Фактическая оценка",
    tableStatus: "Статус",
    fallbackWarning: "Активен offline fallback-анализ",
    descriptionTooShort: "Описание слишком короткое",
    freeLimit: "Лимит Free достигнут. Перейдите на Pro, чтобы продолжить.",
    serverUnavailable: "Сервер не отвечает. Убедитесь, что app.py запущен на localhost:5000.",
    analysisUnavailable: "Анализ сейчас недоступен. Включите Демо-режим для offline-презентации.",
    analysisFailed: "Анализ не удался",
    retry: "Повторить",
    modalTitle: "Перейти на Pro",
    modalClose: "Закрыть",
    freeVersion: "Бесплатная версия",
    proVersionTier: "Pro-версия",
    freeForever: "бесплатно навсегда",
    proPeriod: "в месяц, отменить можно в любой момент",
    limitedAiAnalysis: "Ограниченный AI-анализ",
    fullAiAnalysis: "Полный AI-анализ",
    fullAiProjectAnalysis: "Полный AI-анализ проекта",
    startupHackathonModes: "Режимы стартапа и хакатона",
    fastResponses: "Быстрые ответы",
    deepStartupAnalysis: "Глубокий анализ стартапа",
    competitorAnalysis: "Анализ конкурентов",
    pitchPreparation: "Подготовка к питчу",
    monetizationAnalysis: "Анализ монетизации",
    startupRoadmap: "Roadmap стартапа",
    basicIdeaAnalysis: "Базовый анализ идеи",
    twoAnalyses: "2 анализа в день",
    demoModeFeature: "Демо-режим",
    unlimitedRequests: "Безлимитные запросы",
    priceMonthly: "$6.79/месяц",
    upgradePrice: "✦ Перейти на Pro - $6.79/месяц",
    promptLanguageInstruction: "Отвечай на русском языке. Анализируй проект на русском языке.",
    startupModeEvaluation: "Оценка в режиме стартапа",
    notSpecified: "Не указано",
    archetype: "Архетип",
    closestStartup: "Ближайший стартап",
    differentiation: "Отличие",
    month1: "Месяц 1",
    month6: "Месяц 6",
    year1: "Год 1",
    score: "Оценка",
    testsPassed: "тестов пройдено",
    placeholders: {
      projectName: "например: CityPulse AI",
      projectDescription: "Опишите идею подробно... Какую проблему она решает? Как работает? В чём уникальность?",
      startupName: "например: MedAssist AI",
      startupDescription: "Что вы строите, для кого и в чём уникальность?",
      targetAudience: "B2C / B2B, сегмент, покупатель...",
      marketProblem: "Что сейчас не работает?",
      uniqueness: "Ваше конкурентное преимущество...",
      competitors: "Airbnb, Booking.com, Uber..."
    },
    options: {
      projectCategory: ["Умный город", "Государство", "Здравоохранение", "Образование", "Финансы", "Транспорт", "Экология", "Продуктивность", "Другое"],
      projectStage: ["Идея", "Концепт", "Прототип", "MVP"],
      hackathonDuration: ["24 часа", "48 часов", "72 часа", "1 неделя"],
      devStage: ["Идея", "Прототип", "MVP", "Первые пользователи", "Рост", "Масштабирование"],
      monetization: ["Подписка (SaaS)", "Freemium", "Marketplace", "Enterprise", "Реклама", "Другое"],
      mvpStatus: ["Нет MVP", "В разработке", "Готово, но пользователей нет", "Есть первые пользователи", "Есть выручка"],
      fundingStage: ["Bootstrapped", "Pre-seed", "Seed", "Series A", "Series B+"],
      startupTeamSize: ["1 соло-фаундер", "2-3 человека", "4-6 человек", "7-15 человек", "15+ человек"],
      growthPotential: ["Локальный рынок", "Национальный рынок", "Глобальный рынок", "Сетевой эффект"]
    },
    loadingMessages: [
      "Анализируем идею...",
      "Проверяем уникальность...",
      "Собираем MVP-план...",
      "Оптимизируем под хакатон...",
      "Оцениваем по критериям судей..."
    ]
  }
};

const DEMO_DATA = {
  project_name: "HealthSync AI",
  score: 87,
  summary: "A compelling AI-powered health monitoring platform with strong market potential and a clear user value proposition. The team demonstrates solid technical execution and a realistic go-to-market path.",
  radar: {
    labels: ["Innovation", "Technical Depth", "Market Fit", "Presentation", "Feasibility", "Impact"],
    scores: [85, 90, 82, 78, 88, 91]
  },
  strong_points: [
    "Offline-first AI health monitoring gives the product a sharp and memorable differentiator.",
    "The wearable integration strategy creates a credible path to useful real-world data.",
    "Clear user value for chronic patients, care teams, and pilot clinics.",
    "Strong technical story with local inference, sync logic, and privacy-aware architecture."
  ],
  weak_points: [
    "No clear monetization strategy beyond the initial subscription model.",
    "Regulatory pathway for FDA or CE approval is not addressed in the current roadmap.",
    "Competitor analysis is shallow and misses several direct competitors.",
    "MVP needs stronger proof that offline insights remain clinically useful."
  ],
  improvements: [
    "Add a freemium tier to accelerate user acquisition and network effects.",
    "Include a regulatory compliance timeline with an FDA 510(k) pre-submission milestone.",
    "Conduct a SWOT analysis highlighting differentiation from Apple Health and Fitbit.",
    "Build an offline-first PWA mode using IndexedDB for resilient data caching."
  ],
  winner_version: {
    score: 96,
    title: "HealthSync AI - Enhanced Pitch",
    changes: [
      "Reframed value prop: 'The only health AI that works without internet'.",
      "Added a $2.4B TAM breakdown with bottom-up analysis.",
      "Included 3 signed LOIs from pilot hospital partners.",
      "Demonstrated live integration with 7 wearable APIs."
    ]
  },
  compare: {
    original_score: 87,
    improved_score: 96,
    delta: "+9 points",
    key_delta_areas: ["Market Fit: +14", "Presentation: +18", "Impact: +8"]
  },
  pitch: `Good morning, judges. Imagine being a chronic patient who loses access to their health data the moment they step outside their city. That's 2.3 billion people globally. HealthSync AI solves this.

We built an AI health monitoring platform that works fully offline, syncs intelligently when connected, and gives patients and doctors actionable insights - not just raw data. Our model, trained on 14M anonymized records, achieves 94.2% accuracy on early-warning cardiac events.

We're not asking you to imagine the future. We have 3 hospital LOIs signed, 847 beta users, and a clear path to $1M ARR by Q2 next year. We're HealthSync AI. Thank you.`,
  mvp_plan: {
    timeline: "8 weeks",
    phases: [
      {week: "Weeks 1-2", task: "Core offline data engine plus local ML model compression."},
      {week: "Weeks 3-4", task: "Wearable API integrations for Fitbit, Apple Health, and Garmin."},
      {week: "Weeks 5-6", task: "Doctor dashboard, alert system, and HIPAA-aware storage flow."},
      {week: "Weeks 7-8", task: "Beta launch with 3 pilot clinics and a structured feedback loop."}
    ],
    stack: ["React Native offline-first", "FastAPI", "TensorFlow Lite", "PostgreSQL plus SQLite fallback"],
    cost_estimate: "$0 with open-source stack; cloud costs start around $120/mo at scale"
  }
};

const MESSAGES = [
  "🔍 Analyzing your idea...",
  "🧬 Checking uniqueness...",
  "📐 Building MVP plan...",
  "🎯 Optimizing for hackathon...",
  "⚖️ Scoring by judge criteria..."
];

const els = {};
let msgIndex = 0;
let messageInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  createProPanel();
  initializePageState();
  bindEvents();
  initializeButtonRipples();
  applyLanguage(currentLang);
});

function getInitialLanguage() {
  const saved = localStorage.getItem("pb_lang");
  if (saved === "en" || saved === "ru") return saved;
  return navigator.language && navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}

function t(key) {
  return translations[currentLang]?.[key] ?? translations.en[key] ?? key;
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem("pb_lang", lang);
  applyLanguage(lang);
}

function setText(selector, key) {
  const node = document.querySelector(selector);
  if (node) node.textContent = t(key);
}

function setAllText(selector, key) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = t(key);
  });
}

function setPlaceholder(selector, key) {
  const node = document.querySelector(selector);
  const value = translations[currentLang]?.placeholders?.[key];
  if (node && value) node.placeholder = value;
}

function setOptions(selectId, key) {
  const select = document.getElementById(selectId);
  const options = translations[currentLang]?.options?.[key];
  if (!select || !options) return;
  Array.from(select.options).forEach((option, index) => {
    if (!option.dataset.valueSet) {
      option.value = option.value || option.textContent;
      option.dataset.valueSet = "true";
    }
    if (options[index]) option.textContent = options[index];
  });
}

function applyLanguage(lang = currentLang) {
  currentLang = translations[lang] ? lang : "en";
  document.documentElement.lang = t("documentLang");

  document.querySelectorAll("[data-lang-choice]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.langChoice === currentLang);
  });

  setText('[data-plan-choice="free"]', "free");
  setText('[data-plan-choice="pro"]', "proVersion");
  setText(".pro-badge", "proActive");
  updateDemoButtonText();
  updateDemoBannerText();

  const eyebrow = document.querySelector(".hero-eyebrow");
  if (eyebrow) {
    let dot = eyebrow.querySelector(".dot");
    if (!dot) {
      dot = document.createElement("span");
      dot.className = "dot";
    }
    eyebrow.textContent = "";
    eyebrow.append(dot, document.createTextNode(` ${t("heroEyebrow")}`));
  }
  setText("#heroTitle", "heroTitle");
  setText(".hero-sub", "heroSubtitle");

  const tagKeys = ["tagHackathons", "tagStartups", "tagMvp", "tagPitch", "tagBusinessIdeas", "tagPresentations"];
  document.querySelectorAll(".hero-tag").forEach((tag, index) => {
    if (tagKeys[index]) tag.textContent = t(tagKeys[index]);
  });

  setText("#btn-hackathon", "hackathonMode");
  setText("#btn-startup", "startupMode");
  restoreModeButtonIcons();

  const sectionTitles = document.querySelectorAll(".form-section-title");
  const sectionTitleKeys = ["coreInformation", "hackathonDetails", "coreInformation", "marketAudience", "businessTeam"];
  sectionTitles.forEach((node, index) => {
    if (sectionTitleKeys[index]) node.textContent = t(sectionTitleKeys[index]);
  });

  setLabel("projectName", "projectName");
  setLabel("projectDescription", "projectDescription");
  setLabel("projectCategory", "category");
  setLabel("hackathonDuration", "hackathonDuration");
  setLabel("teamSize", "teamSize");
  setLabel("projectStage", "stage");
  setLabel("startupName", "projectName");
  setLabel("startupDescription", "projectDescription");
  setLabel("devStage", "developmentStage");
  setLabel("targetAudience", "targetAudience");
  setLabel("marketProblem", "marketProblem");
  setLabel("uniqueness", "productUniqueness");
  setLabel("competitors", "competitors");
  setLabel("monetization", "monetization");
  setLabel("mvpStatus", "mvpStatus");
  setLabel("fundingStage", "fundingStage");
  setLabel("startupTeamSize", "teamSize");
  setLabel("growthPotential", "growthPotential");

  setPlaceholder("#projectName", "projectName");
  setPlaceholder("#projectDescription", "projectDescription");
  setPlaceholder("#startupName", "startupName");
  setPlaceholder("#startupDescription", "startupDescription");
  setPlaceholder("#targetAudience", "targetAudience");
  setPlaceholder("#marketProblem", "marketProblem");
  setPlaceholder("#uniqueness", "uniqueness");
  setPlaceholder("#competitors", "competitors");

  setOptions("projectCategory", "projectCategory");
  setOptions("projectStage", "projectStage");
  setOptions("hackathonDuration", "hackathonDuration");
  setOptions("devStage", "devStage");
  setOptions("monetization", "monetization");
  setOptions("mvpStatus", "mvpStatus");
  setOptions("fundingStage", "fundingStage");
  setOptions("startupTeamSize", "startupTeamSize");
  setOptions("growthPotential", "growthPotential");

  setText("#submitBtn", "analyzeProject");
  setText(".free-note", "freeNote");
  setText("#loadingMessage", isDemoMode ? "loadingDemo" : "loadingDefault");
  setText(".loading-subtitle", "loadingSubtitle");
  setText("#fallbackWarning", "fallbackWarning");
  setText("#scoreBreakdownPlaceholder", "scoreBreakdownPlaceholder");
  if (STATE.currentResult && els.levelBadge) {
    els.levelBadge.textContent = levelLabel(String(STATE.currentResult.level || "Average"));
    renderIdeaDna(STATE.currentResult.idea_dna || {});
    renderGrowthPotential(STATE.currentResult.growth_potential || {});
    renderScoreBreakdown(STATE.currentResult, STATE.currentInput || {});
  }
  setText(".chart-wrap .section-title", "scoreBreakdown");

  const resultTitleKeys = ["strongPoints", "weakPoints", "improvements", "betterVersion"];
  document.querySelectorAll(".result-grid .result-card h3").forEach((node, index) => {
    const prefix = node.textContent.trim().split(" ")[0];
    if (resultTitleKeys[index]) node.textContent = `${prefix} ${t(resultTitleKeys[index])}`;
  });
  setText("article.full-card:nth-of-type(3) .section-title", "mvpPlan");
  setText("article.full-card:nth-of-type(4) .section-title", "teamRoles");
  setAllText(".lock-box p", "upgradeUnlock");
  setAllText("[data-upgrade-button]", "upgradeToPro");

  const proTitleKeys = ["thirtySecondPitch", "oneMinutePitch", "techStack", "judgeReason", "ideaDna", "growthPotential", "demoIdea", "demoWarning"];
  document.querySelectorAll(".pro-grid .result-card h3").forEach((node, index) => {
    const prefix = node.textContent.trim().split(" ")[0];
    if (proTitleKeys[index]) node.textContent = `${prefix} ${t(proTitleKeys[index])}`;
  });
  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    if (!button.dataset.copying) button.textContent = t("copy");
  });
  setText(".compare-card .section-title", "compareMode");
  setText(".compare-panel:first-child h4", "originalIdea");
  setText(".compare-panel:last-child h4", "improvedVersion");
  setText("#analyzeAnotherBtn", "analyzeAnother");
  setText("#copyReportBtn", "copyReport");
  updateQualityToggleText(els.qualityPanel?.classList.contains("is-expanded"));
  setText("#runQualityCheckBtn", "runQuality");

  const thKeys = ["tableTestName", "tableExpectedRange", "tableActualScore", "tableStatus"];
  document.querySelectorAll("thead th").forEach((node, index) => {
    if (thKeys[index]) node.textContent = t(thKeys[index]);
  });

  applyModalTranslations();
}

function setLabel(forId, key) {
  const label = document.querySelector(`label[for="${forId}"]`);
  if (label) label.textContent = t(key);
}

function restoreModeButtonIcons() {
  const hBtn = document.getElementById("btn-hackathon");
  const sBtn = document.getElementById("btn-startup");
  if (hBtn && !hBtn.querySelector("svg")) {
    hBtn.insertAdjacentHTML("afterbegin", '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>');
  }
  if (sBtn && !sBtn.querySelector("svg")) {
    sBtn.insertAdjacentHTML("afterbegin", '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>');
  }
}

function applyModalTranslations() {
  setText("#proModalTitle", "modalTitle");
  const close = document.querySelector(".modal-close");
  if (close) close.setAttribute("aria-label", t("modalClose"));
  const tiers = document.querySelectorAll(".price-tier");
  if (tiers[0]) tiers[0].textContent = t("freeVersion");
  if (tiers[1]) tiers[1].textContent = t("proVersionTier");
  const periods = document.querySelectorAll(".price-period");
  if (periods[0]) periods[0].textContent = t("freeForever");
  if (periods[1]) periods[1].textContent = t("proPeriod");

  const freeKeys = ["limitedAiAnalysis", "startupHackathonModes", "competitorAnalysis", "pitchPreparation", "monetizationAnalysis", "startupRoadmap", "basicIdeaAnalysis", "twoAnalyses", "demoModeFeature"];
  const proKeys = ["fullAiProjectAnalysis", "startupHackathonModes", "fastResponses", "deepStartupAnalysis", "competitorAnalysis", "pitchPreparation", "monetizationAnalysis", "startupRoadmap", "unlimitedRequests"];
  const freeItems = document.querySelectorAll(".price-card:not(.pro) .feature-list li");
  const proItems = document.querySelectorAll(".price-card.pro .feature-list li");
  translateFeatureItems(freeItems, freeKeys);
  translateFeatureItems(proItems, proKeys);
  setText("[data-pro-modal-upgrade]", "upgradePrice");
}

function translateFeatureItems(items, keys) {
  items.forEach((item, index) => {
    const icon = item.querySelector(".fi")?.cloneNode(true);
    const span = item.querySelector(".striked");
    item.textContent = "";
    if (icon) item.append(icon, document.createTextNode(" "));
    if (span) {
      const newSpan = document.createElement("span");
      newSpan.className = "striked";
      newSpan.textContent = t(keys[index]);
      item.append(newSpan);
    } else {
      item.append(document.createTextNode(t(keys[index])));
    }
  });
}

function updateDemoButtonText() {
  const btn = document.getElementById("btn-demo-mode");
  if (btn) btn.textContent = isDemoMode ? t("demoOn") : t("demoMode");
}

function updateDemoBannerText() {
  const banner = document.getElementById("demo-banner");
  if (!banner) return;
  const dots = banner.querySelectorAll(".demo-banner-dot");
  banner.textContent = "";
  if (dots[0]) banner.append(dots[0]);
  banner.append(document.createTextNode(` ${t("demoBanner")} `));
  if (dots[1]) banner.append(dots[1]);
}

function cacheElements() {
  els.form = document.getElementById("analysisForm");
  els.submitBtn = document.getElementById("submitBtn");
  els.formError = document.getElementById("formError");
  els.loadingOverlay = document.getElementById("loadingOverlay");
  els.loadingMessage = document.getElementById("loadingMessage");
  els.resultsSection = document.getElementById("resultsSection");
  els.scoreNumber = document.getElementById("scoreNumber");
  els.levelBadge = document.getElementById("levelBadge");
  els.summaryText = document.getElementById("summaryText");
  els.fallbackWarning = document.getElementById("fallbackWarning");
  els.strongPointsList = document.getElementById("strongPointsList");
  els.weakPointsList = document.getElementById("weakPointsList");
  els.improvementsList = document.getElementById("improvementsList");
  els.betterVersionText = document.getElementById("betterVersionText");
  els.mvpPlanTimeline = document.getElementById("mvpPlanTimeline");
  els.teamRolesTags = document.getElementById("teamRolesTags");
  els.thirtySecondPitchText = document.getElementById("thirtySecondPitchText");
  els.oneMinutePitchText = document.getElementById("oneMinutePitchText");
  els.techStackList = document.getElementById("techStackList");
  els.judgeReasonText = document.getElementById("judgeReasonText");
  els.ideaDnaGrid = document.getElementById("ideaDnaGrid");
  els.growthPotentialGrid = document.getElementById("growthPotentialGrid");
  els.demoIdeaText = document.getElementById("demoIdeaText");
  els.demoWarningText = document.getElementById("demoWarningText");
  els.originalIdeaText = document.getElementById("originalIdeaText");
  els.improvedIdeaText = document.getElementById("improvedIdeaText");
  els.qualityPanel = document.getElementById("qualityPanel");
  els.qualityToggle = document.getElementById("qualityToggle");
  els.runQualityCheckBtn = document.getElementById("runQualityCheckBtn");
  els.qualityResultsBody = document.getElementById("qualityResultsBody");
  els.qualitySummaryText = document.getElementById("qualitySummaryText");
  els.analyzeAnotherBtn = document.getElementById("analyzeAnotherBtn");
  els.copyReportBtn = document.getElementById("copyReportBtn");
  els.analysisMode = document.getElementById("analysis_mode");
  els.scoreBreakdownChart = document.getElementById("scoreBreakdownChart");
  els.scoreBreakdownPlaceholder = document.getElementById("scoreBreakdownPlaceholder");
}

function initializePageState() {
  setPlan(STATE.isPro ? "pro" : "free", false);
  hideResults();
  hideLoading();
  hideError();

  const qcExpanded = localStorage.getItem("qc_expanded") === "true";
  els.qualityPanel?.classList.toggle("is-expanded", qcExpanded);
  updateQualityToggleText(qcExpanded);
}

function bindEvents() {
  document.querySelectorAll("[data-plan-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      setPlan(button.dataset.planChoice, true);
      if (button.dataset.planChoice === "pro") {
        openProPanel();
      }
    });
  });

  document.querySelectorAll("[data-upgrade-button]").forEach((button) => {
    button.addEventListener("click", () => {
      setPlan("pro", true);
      openProPanel();
    });
  });

  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", () => handleCopyButton(button));
  });

  document.querySelectorAll("[data-lang-choice]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.langChoice));
  });

  els.form?.addEventListener("submit", handleSubmit);
  els.qualityToggle?.addEventListener("click", toggleQualityPanel);
  els.runQualityCheckBtn?.addEventListener("click", runQualityCheck);
  els.analyzeAnotherBtn?.addEventListener("click", analyzeAnother);
  els.copyReportBtn?.addEventListener("click", copyFullReport);
  document.querySelector("[data-pro-modal-upgrade]")?.addEventListener("click", () => {
    setPlan("pro", true);
    closeProModal();
  });
  document.getElementById("pro-modal")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeProModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProPanel();
      closeProModal();
    }
  });
}

function setPlan(plan, persist) {
  STATE.isPro = plan === "pro";
  document.body.dataset.plan = STATE.isPro ? "pro" : "free";

  document.querySelectorAll("[data-plan-choice]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.planChoice === document.body.dataset.plan);
  });

  if (persist) {
    localStorage.setItem("pb_plan", document.body.dataset.plan);
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  hideError();

  if (!isDemoMode && !STATE.isPro && STATE.analysisCount >= 2) {
    showError(t("freeLimit"));
    return;
  }

  const payload = collectFormValues();
  if (!payload.description || payload.description.length < 20) {
    showError(t("descriptionTooShort"));
    return;
  }
  const displayInput = {...payload, description: payload.description};
  payload.description = `${payload.language_instruction}\n\n${payload.description}`;

  showLoading();
  els.submitBtn.disabled = true;

  try {
    const response = await smartFetch("/analyze", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || "Analysis failed");
    }

    if (data.error) {
      showApiError();
      return;
    }

    if (!isDemoMode) {
      STATE.analysisCount += 1;
      localStorage.setItem("pb_count", String(STATE.analysisCount));
    }
    STATE.currentResult = data;
    STATE.currentInput = displayInput;
    renderResults(data, displayInput);
    els.resultsSection.scrollIntoView({behavior: "smooth", block: "start"});
  } catch (error) {
    showApiError(t("serverUnavailable"));
  } finally {
    hideLoading();
    els.submitBtn.disabled = false;
  }
}

function collectFormValues() {
  const formData = new FormData(els.form);
  const mode = String(formData.get("analysis_mode") || "hackathon");
  if (mode === "startup") {
    const startupName = String(formData.get("startup_name") || "").trim();
    const startupDescription = String(formData.get("startup_description") || "").trim();
    const startupDetails = [
      `${t("startupModeEvaluation")}`,
      `${t("developmentStage")}: ${String(formData.get("dev_stage") || "Idea")}`,
      `${t("targetAudience")}: ${String(formData.get("target_audience") || t("notSpecified")).trim()}`,
      `${t("marketProblem")}: ${String(formData.get("market_problem") || t("notSpecified")).trim()}`,
      `${t("productUniqueness")}: ${String(formData.get("uniqueness") || t("notSpecified")).trim()}`,
      `${t("competitors")}: ${String(formData.get("competitors") || t("notSpecified")).trim()}`,
      `${t("monetization")}: ${String(formData.get("monetization") || t("notSpecified"))}`,
      `${t("mvpStatus")}: ${String(formData.get("mvp_status") || t("notSpecified"))}`,
      `${t("fundingStage")}: ${String(formData.get("funding_stage") || t("notSpecified"))}`,
      `${t("teamSize")}: ${String(formData.get("startup_team_size") || t("notSpecified"))}`,
      `${t("growthPotential")}: ${String(formData.get("growth_potential") || t("notSpecified"))}`
    ].join("\n");

    return {
      name: startupName,
      description: [startupDescription, startupDetails].filter(Boolean).join("\n\n"),
      category: "Startup",
      team_size: parseStartupTeamSize(String(formData.get("startup_team_size") || "")),
      duration: "Startup roadmap",
      stage: String(formData.get("dev_stage") || "Idea"),
      analysis_mode: mode,
      language: currentLang,
      language_instruction: t("promptLanguageInstruction")
    };
  }

  return {
    name: String(formData.get("name") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    category: String(formData.get("category") || "Other"),
    team_size: Number(formData.get("team_size") || 3),
    duration: String(formData.get("duration") || "48 hours"),
    stage: String(formData.get("stage") || "Idea"),
    analysis_mode: mode,
    language: currentLang,
    language_instruction: t("promptLanguageInstruction")
  };
}

function parseStartupTeamSize(value) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 1;
}

function renderResults(data, input = STATE.currentInput || {}) {
  clearFetchError();
  els.resultsSection.classList.add("is-visible");

  const score = Number(data.total_score || 0);
  animateScore(els.scoreNumber, 0, score, 1500);

  const level = String(data.level || "Average");
  els.levelBadge.textContent = levelLabel(level);
  els.levelBadge.className = `level-badge ${levelClass(level)}`;
  els.summaryText.textContent = safeText(data.summary);
  els.fallbackWarning.classList.toggle("is-visible", Boolean(data.is_fallback));

  renderList(els.strongPointsList, data.strong_points);
  renderList(els.weakPointsList, data.weak_points);
  renderList(els.improvementsList, data.improvements);
  els.betterVersionText.textContent = safeText(data.better_version);
  renderMvpPlan(data.mvp_plan || []);
  renderTags(els.teamRolesTags, data.team_roles || []);

  els.thirtySecondPitchText.textContent = safeText(data.thirty_second_pitch);
  els.oneMinutePitchText.textContent = safeText(data.one_minute_pitch);
  renderList(els.techStackList, data.tech_stack);
  els.judgeReasonText.textContent = safeText(data.judge_reason);
  renderIdeaDna(data.idea_dna || {});
  renderGrowthPotential(data.growth_potential || {});
  els.demoIdeaText.textContent = safeText(data.demo_idea);
  els.demoWarningText.textContent = safeText(data.demo_warning);
  els.demoWarningText.classList.toggle("is-visible", Boolean(data.demo_warning));

  els.originalIdeaText.textContent = safeText(input.description);
  els.improvedIdeaText.textContent = safeText(data.better_version);
  renderScoreBreakdown(data, input);
  try {
    renderRadarChart(data.scores || {}, data.radar || null);
  } catch (error) {
    console.warn("Radar chart skipped:", error);
  }
  applyRevealAnimation(els.resultsSection);
}

function renderList(target, items) {
  if (!target) return;
  target.innerHTML = "";
  (items || []).forEach((text) => {
    const item = document.createElement("li");
    item.textContent = safeText(text);
    target.appendChild(item);
  });
}

function renderMvpPlan(plan) {
  els.mvpPlanTimeline.innerHTML = "";
  plan.forEach((phase) => {
    const row = document.createElement("div");
    row.className = "timeline-row";

    const title = document.createElement("div");
    title.className = "timeline-phase";
    title.textContent = safeText(phase.phase, "Phase");

    const tasks = document.createElement("ul");
    (phase.tasks || []).forEach((task) => {
      const item = document.createElement("li");
      item.textContent = safeText(task);
      tasks.appendChild(item);
    });

    row.append(title, tasks);
    els.mvpPlanTimeline.appendChild(row);
  });
}

function renderTags(target, items) {
  target.innerHTML = "";
  items.forEach((text) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = safeText(text);
    target.appendChild(tag);
  });
}

function renderIdeaDna(dna) {
  els.ideaDnaGrid.innerHTML = "";
  addKeyValue(els.ideaDnaGrid, t("archetype"), dna.archetype);
  addKeyValue(els.ideaDnaGrid, t("closestStartup"), dna.closest_startup);
  addKeyValue(els.ideaDnaGrid, t("differentiation"), dna.differentiation);
}

function renderGrowthPotential(growth) {
  els.growthPotentialGrid.innerHTML = "";
  addKeyValue(els.growthPotentialGrid, t("month1"), growth.month_1);
  addKeyValue(els.growthPotentialGrid, t("month6"), growth.month_6);
  addKeyValue(els.growthPotentialGrid, t("year1"), growth.year_1);
}

function addKeyValue(target, label, value) {
  const line = document.createElement("div");
  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;
  line.append(strong, safeText(value));
  target.appendChild(line);
}

function renderScoreBreakdown(data = {}, input = {}) {
  const chart = els.scoreBreakdownChart || document.getElementById("scoreBreakdownChart");
  if (!chart) return;

  const mode = input.analysis_mode === "startup" ? "startup" : "hackathon";
  const breakdown = normalizeScoreBreakdown(data, mode);
  const keys = getScoreBreakdownKeys(mode);
  const labels = getScoreBreakdownLabels(mode);

  chart.innerHTML = "";
  chart.classList.remove("is-placeholder", "is-startup", "is-hackathon");
  chart.classList.add(mode === "startup" ? "is-startup" : "is-hackathon");

  keys.forEach((key, index) => {
    const value = clampScore(breakdown[key]);
    const row = document.createElement("div");
    row.className = "score-bar-row";

    const label = document.createElement("div");
    label.className = "score-bar-label";
    label.textContent = labels[index] || key;

    const track = document.createElement("div");
    track.className = "score-bar-track";

    const fill = document.createElement("div");
    fill.className = "score-bar-fill";
    fill.style.width = "0%";
    track.appendChild(fill);

    const number = document.createElement("div");
    number.className = "score-bar-value";
    number.textContent = `${value}%`;

    row.append(label, track, number);
    chart.appendChild(row);
    const raf = window.requestAnimationFrame || ((callback) => window.setTimeout(callback, 16));
    raf(() => {
      fill.style.width = `${value}%`;
    });
  });
}

function normalizeScoreBreakdown(data, mode) {
  const explicit = data.scoreBreakdown || data.score_breakdown || data.breakdown;
  const keys = getScoreBreakdownKeys(mode);

  if (explicit && typeof explicit === "object" && !Array.isArray(explicit)) {
    const normalized = {};
    keys.forEach((key) => {
      normalized[key] = clampScore(explicit[key]);
    });
    if (keys.some((key) => normalized[key] > 0)) {
      return fillMissingScoreBreakdown(normalized, mode, data);
    }
  }

  return buildScoreBreakdownFallback(data, mode);
}

function fillMissingScoreBreakdown(breakdown, mode, data) {
  const fallback = buildScoreBreakdownFallback(data, mode);
  getScoreBreakdownKeys(mode).forEach((key) => {
    if (!breakdown[key]) {
      breakdown[key] = fallback[key];
    }
  });
  return breakdown;
}

function buildScoreBreakdownFallback(data, mode) {
  const score = clampScore(data.total_score || data.score || 65);
  const scores = data.scores || {};

  if (mode === "startup") {
    return {
      marketProblem: averageScores([scores.problem, scores.impact], score + 2),
      productValue: averageScores([scores.impact, scores.presentation], score + 1),
      monetization: averageScores([scores.scalability, scores.mvp_realism], score - 3),
      scalability: averageScores([scores.scalability, scores.technology], score),
      competition: averageScores([scores.uniqueness, scores.wow_effect], score - 2),
      mvpReadiness: averageScores([scores.mvp_realism, scores.technology], score + 1)
    };
  }

  if (data.radar && Array.isArray(data.radar.scores) && data.radar.scores.length >= 6 && data.is_demo) {
    const radarScores = data.radar.scores.slice(0, 6).map(clampScore);
    return {
      idea: radarScores[0],
      innovation: radarScores[1],
      feasibility: radarScores[2],
      design: radarScores[3],
      presentation: radarScores[4],
      technicalQuality: radarScores[5]
    };
  }

  return {
    idea: averageScores([scores.problem, scores.impact], score),
    innovation: averageScores([scores.uniqueness, scores.wow_effect], score + 1),
    feasibility: averageScores([scores.mvp_realism, scores.scalability], score - 1),
    design: averageScores([scores.presentation, scores.wow_effect], score - 2),
    presentation: averageScores([scores.presentation], score),
    technicalQuality: averageScores([scores.technology, scores.mvp_realism], score + 1)
  };
}

function getScoreBreakdownKeys(mode) {
  return mode === "startup"
    ? ["marketProblem", "productValue", "monetization", "scalability", "competition", "mvpReadiness"]
    : ["idea", "innovation", "feasibility", "design", "presentation", "technicalQuality"];
}

function getScoreBreakdownLabels(mode) {
  const keys = getScoreBreakdownKeys(mode);
  const labelMap = translations[currentLang]?.scoreBreakdownLabels;
  if (labelMap) {
    return keys.map((key) => labelMap[key] || key);
  }

  const legacyKey = mode === "startup" ? "startupScoreLabels" : "hackathonScoreLabels";
  return translations[currentLang]?.[legacyKey] || keys;
}

function averageScores(values, fallback) {
  const valid = values.map(parseScoreValue).filter((value) => Number.isFinite(value) && value > 0);
  if (!valid.length) return fallback;
  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
}

function clampScore(value) {
  const parsed = parseScoreValue(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(100, Math.round(parsed)));
}

function parseScoreValue(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const match = value.match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : NaN;
  }
  return Number(value);
}

function renderRadarChart(scores, radar = null) {
  const canvas = document.getElementById("radarChart");
  if (!canvas || typeof Chart === "undefined") {
    return;
  }

  if (window.radarChart) {
    window.radarChart.destroy();
  }

  const labels = radar && Array.isArray(radar.labels) && radar.labels.length
    ? radar.labels
    : ["Problem", "Uniqueness", "Impact", "MVP Realism", "Technology", "Wow Effect", "Scalability", "Presentation"];
  const values = radar && Array.isArray(radar.scores) && radar.scores.length
    ? radar.scores
    : [
      scores.problem || 0,
      scores.uniqueness || 0,
      scores.impact || 0,
      scores.mvp_realism || 0,
      scores.technology || 0,
      scores.wow_effect || 0,
      scores.scalability || 0,
      scores.presentation || 0
    ];

  window.radarChart = new Chart(canvas, {
    type: "radar",
    data: {
      labels,
      datasets: [{
        label: t("score"),
        data: values,
        backgroundColor: "rgba(99,102,241,0.2)",
        borderColor: "#6366f1",
        pointBackgroundColor: "#6366f1",
        pointBorderColor: "#f1f5f9"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {color: "#f1f5f9"}
        }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          angleLines: {color: "rgba(255,255,255,0.1)"},
          grid: {color: "rgba(255,255,255,0.1)"},
          pointLabels: {color: "#94a3b8"},
          ticks: {
            color: "#94a3b8",
            backdropColor: "transparent"
          }
        }
      }
    }
  });
}

function showLoading() {
  msgIndex = 0;
  els.loadingMessage.textContent = isDemoMode ? t("loadingDemo") : translations[currentLang].loadingMessages[msgIndex];
  els.loadingOverlay.classList.add("is-visible");
  els.loadingOverlay.setAttribute("aria-hidden", "false");
  clearInterval(messageInterval);
  if (!isDemoMode) {
    messageInterval = setInterval(cycleLoadingMessage, 2500);
  }
}

function hideLoading() {
  els.loadingOverlay.classList.remove("is-visible");
  els.loadingOverlay.setAttribute("aria-hidden", "true");
  clearInterval(messageInterval);
  messageInterval = null;
}

function cycleLoadingMessage() {
  els.loadingMessage.classList.add("is-changing");
  window.setTimeout(() => {
    msgIndex = (msgIndex + 1) % translations[currentLang].loadingMessages.length;
    els.loadingMessage.textContent = translations[currentLang].loadingMessages[msgIndex];
    els.loadingMessage.classList.remove("is-changing");
  }, 200);
}

async function handleCopyButton(button) {
  const target = document.getElementById(button.dataset.copyTarget);
  const originalText = button.textContent;
  button.dataset.copying = "true";
  await copyText(target ? target.innerText : "");
  button.textContent = `✓ ${t("copied")}`;
  window.setTimeout(() => {
    button.dataset.copying = "";
    button.textContent = originalText || t("copy");
  }, 2000);
}

async function runQualityCheck() {
  els.runQualityCheckBtn.disabled = true;
  els.runQualityCheckBtn.textContent = t("running");
  els.qualityResultsBody.innerHTML = "";
  els.qualitySummaryText.textContent = "";

  try {
    const response = await smartFetch("/quality-check");
    const results = await response.json();
    if (!response.ok) {
      throw new Error(t("qualityFailed"));
    }
    renderQualityResults(results);
  } catch (error) {
    els.qualitySummaryText.textContent = error.message || t("qualityFailed");
  } finally {
    els.runQualityCheckBtn.disabled = false;
    els.runQualityCheckBtn.textContent = t("runQuality");
  }
}

function renderQualityResults(results) {
  let passed = 0;
  els.qualityResultsBody.innerHTML = "";

  results.forEach((result) => {
    if (result.passed) passed += 1;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${escapeHtml(result.name)}</td>
      <td>${escapeHtml(result.expected_min)}-${escapeHtml(result.expected_max)}</td>
      <td>${escapeHtml(result.actual_score)}</td>
      <td><span class="${result.passed ? "status-pass" : "status-fail"}">${result.passed ? "✅ PASS" : "❌ FAIL"}</span></td>
    `;
    els.qualityResultsBody.appendChild(row);
  });

  els.qualitySummaryText.textContent = `${passed}/${results.length} ${t("testsPassed")}`;
}

function toggleQualityPanel() {
  const expanded = !els.qualityPanel.classList.contains("is-expanded");
  els.qualityPanel.classList.toggle("is-expanded", expanded);
  localStorage.setItem("qc_expanded", expanded ? "true" : "false");
  updateQualityToggleText(expanded);
}

function updateQualityToggleText(expanded) {
  if (!els.qualityToggle) return;
  els.qualityToggle.textContent = expanded
    ? t("qualityExpanded")
    : t("qualityCollapsed");
}

function analyzeAnother() {
  els.form.reset();
  const teamSize = document.getElementById("teamSize");
  if (teamSize) teamSize.value = "3";
  STATE.currentResult = null;
  STATE.currentInput = null;
  hideResults();
  window.scrollTo({top: 0, behavior: "smooth"});
}

async function copyFullReport() {
  if (!STATE.currentResult) return;
  const originalText = els.copyReportBtn.textContent;
  await copyText(JSON.stringify(STATE.currentResult, null, 2));
  els.copyReportBtn.textContent = `✓ ${t("copied")}`;
  window.setTimeout(() => {
    els.copyReportBtn.textContent = originalText;
  }, 2000);
}

function animateScore(targetEl, from, to, duration) {
  if (!targetEl) return;
  if (to === undefined) {
    to = from;
    from = 0;
  }
  duration = duration || 1200;
  const start = performance.now();
  const change = to - from;

  function step(now) {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    targetEl.textContent = String(Math.floor(from + change * eased));

    if (elapsed < 1) {
      requestAnimationFrame(step);
    } else {
      targetEl.textContent = String(to);
    }
  }

  requestAnimationFrame(step);
}

function easeOutQuad(t) {
  return t * (2 - t);
}

function setMode(mode) {
  const hBtn = document.getElementById("btn-hackathon");
  const sBtn = document.getElementById("btn-startup");
  const hFields = document.getElementById("hackathon-fields");
  const sFields = document.getElementById("startup-fields");
  const hiddenMode = document.getElementById("analysis_mode");

  if (!hBtn || !sBtn) return;

  if (mode === "hackathon") {
    hBtn.classList.add("active");
    sBtn.classList.remove("active");
    if (hFields) hFields.style.display = "";
    if (sFields) sFields.style.display = "none";
  } else {
    sBtn.classList.add("active");
    hBtn.classList.remove("active");
    if (sFields) sFields.style.display = "";
    if (hFields) hFields.style.display = "none";
  }

  if (hiddenMode) hiddenMode.value = mode;

  const card = document.getElementById("main-form");
  if (card) {
    card.style.animation = "none";
    void card.offsetWidth;
    card.style.animation = "";
  }
}

async function smartFetch(url, options = {}) {
  if (!isDemoMode) {
    return fetch(url, options);
  }

  await sleep(600 + Math.random() * 400);

  const mockResponses = {
    "/analyze": {ok: true, json: async () => buildAnalyzeResponse()},
    "/improve": {ok: true, json: async () => buildImproveResponse()},
    "/compare": {ok: true, json: async () => buildCompareResponse()},
    "/pitch": {ok: true, json: async () => buildPitchResponse()},
    "/mvp": {ok: true, json: async () => buildMvpResponse()},
    "/quality-check": {ok: true, json: async () => buildQualityCheckResponse()}
  };

  const matched = Object.keys(mockResponses).find((key) => String(url).startsWith(key));
  if (matched) {
    return mockResponses[matched];
  }

  return fetch(url, options);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildAnalyzeResponse() {
  return {
    success: true,
    is_demo: true,
    is_fallback: false,
    project_name: DEMO_DATA.project_name,
    total_score: DEMO_DATA.score,
    score: DEMO_DATA.score,
    level: "Top",
    summary: DEMO_DATA.summary,
    radar: DEMO_DATA.radar,
    scores: {
      problem: 88,
      uniqueness: 85,
      impact: 91,
      mvp_realism: 88,
      technology: 90,
      wow_effect: 86,
      scalability: 84,
      presentation: 78
    },
    strong_points: DEMO_DATA.strong_points,
    weak_points: DEMO_DATA.weak_points,
    improvements: DEMO_DATA.improvements,
    better_version: [
      `${DEMO_DATA.winner_version.title} (${DEMO_DATA.winner_version.score}/100)`,
      ...DEMO_DATA.winner_version.changes
    ].join("\n"),
    mvp_plan: DEMO_DATA.mvp_plan.phases.map((phase) => ({
      phase: phase.week,
      tasks: [phase.task]
    })),
    team_roles: [
      "ML Engineer - local model compression",
      "Mobile Engineer - offline-first app",
      "Backend Engineer - sync and clinical data APIs",
      "Product Lead - hospital pilots and compliance"
    ],
    thirty_second_pitch: "HealthSync AI gives chronic patients and doctors intelligent health monitoring even without internet access. It syncs wearable data, runs local AI alerts, and helps clinics catch risk earlier with a realistic pilot-ready MVP.",
    one_minute_pitch: DEMO_DATA.pitch,
    tech_stack: DEMO_DATA.mvp_plan.stack,
    judge_reason: `Judges will remember the offline-first health AI angle, the credible pilot traction, and the clear upgrade path from ${DEMO_DATA.compare.original_score} to ${DEMO_DATA.compare.improved_score}. The story connects impact, technical depth, and market timing.`,
    idea_dna: {
      archetype: "Offline-first health intelligence platform",
      closest_startup: "A bridge between Fitbit, Apple Health, and a clinic-grade early warning assistant",
      differentiation: "Works when connectivity fails, then syncs intelligently without losing clinical context"
    },
    growth_potential: {
      month_1: "Launch with 3 pilot clinics and 847 beta users.",
      month_6: "Expand into remote patient monitoring partnerships.",
      year_1: "Reach $1M ARR through clinic seats and premium patient plans."
    },
    demo_idea: "Live-demo airplane mode: disconnect the device, ingest wearable readings, show local cardiac risk insight, then reconnect and sync to the doctor dashboard.",
    demo_warning: "Make the medical claims carefully: position this as decision support, not a diagnosis engine."
  };
}

function buildImproveResponse() {
  return {
    success: true,
    winner: DEMO_DATA.winner_version,
    score: DEMO_DATA.winner_version.score,
    changes: DEMO_DATA.winner_version.changes
  };
}

function buildCompareResponse() {
  return {
    success: true,
    compare: DEMO_DATA.compare
  };
}

function buildPitchResponse() {
  return {
    success: true,
    pitch: DEMO_DATA.pitch
  };
}

function buildMvpResponse() {
  return {
    success: true,
    mvp: DEMO_DATA.mvp_plan
  };
}

function buildQualityCheckResponse() {
  return [
    {name: "Demo weak idea", expected_min: 25, expected_max: 60, actual_score: 56, passed: true},
    {name: "Demo medium idea", expected_min: 55, expected_max: 75, actual_score: 68, passed: true},
    {name: "Demo strong idea", expected_min: 75, expected_max: 90, actual_score: 87, passed: true}
  ];
}

function toggleDemoMode() {
  isDemoMode = !isDemoMode;
  const btn = document.getElementById("btn-demo-mode");
  if (!btn) return;

  if (isDemoMode) {
    btn.classList.add("demo-active-btn");
    btn.textContent = t("demoOn");
    applyDemoModeVisuals(true);
    showDemoBanner();
  } else {
    btn.classList.remove("demo-active-btn");
    btn.textContent = t("demoMode");
    applyDemoModeVisuals(false);
    hideDemoBanner();
  }
}

function applyDemoModeVisuals(on) {
  const root = document.documentElement;
  if (on) {
    root.style.setProperty("--accent-primary", "#f59e0b");
    root.style.setProperty("--accent-secondary", "#d97706");
    root.style.setProperty("--accent-glow", "rgba(245, 158, 11, 0.3)");
    document.body.classList.add("demo-mode-active");
  } else {
    root.style.removeProperty("--accent-primary");
    root.style.removeProperty("--accent-secondary");
    root.style.removeProperty("--accent-glow");
    document.body.classList.remove("demo-mode-active");
  }
}

function showDemoBanner() {
  const banner = document.getElementById("demo-banner");
  if (!banner) return;
  banner.setAttribute("aria-hidden", "false");
  window.setTimeout(() => banner.classList.add("visible"), 10);
}

function hideDemoBanner() {
  const banner = document.getElementById("demo-banner");
  if (!banner) return;
  banner.classList.remove("visible");
  window.setTimeout(() => banner.setAttribute("aria-hidden", "true"), 350);
}

window.toggleDemoMode = toggleDemoMode;

function applyRevealAnimation(container) {
  if (!container) return;
  const items = container.querySelectorAll(".card, .score-card, .analysis-card, li, .result-block");
  items.forEach((el, index) => {
    el.classList.remove("reveal-item");
    void el.offsetWidth;
    el.classList.add("reveal-item");
    el.style.animationDelay = `${index * 0.08}s`;
  });
}

function initializeButtonRipples() {
  document.querySelectorAll(".btn-analyze, .btn-primary, .submit-btn, .primary-action, .btn-upgrade").forEach((btn) => {
    btn.addEventListener("click", function addRipple(event) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.25);
        width: 8px;
        height: 8px;
        left: ${event.clientX - rect.left - 4}px;
        top: ${event.clientY - rect.top - 4}px;
        transform: scale(0);
        animation: ripple 0.5s ease forwards;
        pointer-events: none;
      `;
      this.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 500);
    });
  });
}

function createProPanel() {
  if (document.getElementById("pro-modal")) return;
  if (document.getElementById("pro-panel")) return;

  const panel = document.createElement("div");
  panel.id = "pro-panel";
  panel.className = "pro-panel";
  panel.setAttribute("aria-hidden", "true");
  panel.innerHTML = `
    <div class="pro-panel-inner">
      <div class="pro-panel-header">
        <span class="pro-badge">PRO</span>
        <button class="pro-panel-close" type="button" aria-label="Close Pro panel">x</button>
      </div>
      <h3 class="pro-panel-title">Unlock Full Power</h3>
      <p class="pro-panel-subtitle">Everything you need to win any hackathon.</p>
      <ul class="pro-features-list">
        <li>Unlimited analyses</li>
        <li>Improve to Winner</li>
        <li>Compare Mode</li>
        <li>Pitch Generator</li>
        <li>MVP Builder</li>
        <li>Demo Generator</li>
        <li>Growth Potential</li>
        <li>Idea DNA</li>
        <li>Judge Analysis</li>
      </ul>
      <button class="btn-primary btn-upgrade" type="button">Upgrade to Pro</button>
    </div>
  `;

  const overlay = document.createElement("div");
  overlay.id = "pro-overlay";
  overlay.className = "pro-overlay";

  document.body.append(panel, overlay);
  panel.querySelector(".pro-panel-close")?.addEventListener("click", closeProPanel);
  panel.querySelector(".btn-upgrade")?.addEventListener("click", () => {
    setPlan("pro", true);
    closeProPanel();
  });
  overlay.addEventListener("click", closeProPanel);
}

function openProPanel() {
  const modal = document.getElementById("pro-modal");
  if (modal) {
    openProModal();
    return;
  }
  const panel = document.getElementById("pro-panel");
  const overlay = document.getElementById("pro-overlay");
  panel?.classList.add("open");
  overlay?.classList.add("open");
  panel?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProPanel() {
  const panel = document.getElementById("pro-panel");
  const overlay = document.getElementById("pro-overlay");
  panel?.classList.remove("open");
  overlay?.classList.remove("open");
  panel?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

window.openProPanel = openProPanel;
window.closeProPanel = closeProPanel;

function openProModal() {
  const modal = document.getElementById("pro-modal");
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProModal() {
  const modal = document.getElementById("pro-modal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

window.openProModal = openProModal;
window.closeProModal = closeProModal;
window.setMode = setMode;

function showFetchError(message) {
  clearFetchError();
  els.resultsSection.classList.add("is-visible");

  const card = document.createElement("article");
  card.className = "card error-results-card";
  card.id = "fetchErrorCard";
  card.innerHTML = `
    <h3>${escapeHtml(t("analysisFailed"))}</h3>
    <p>${escapeHtml(message)}</p>
    <button class="btn-secondary" type="button" id="retryAnalyzeBtn">${escapeHtml(t("retry"))}</button>
  `;
  els.resultsSection.prepend(card);
  document.getElementById("retryAnalyzeBtn")?.addEventListener("click", () => {
    els.form.requestSubmit();
  });
  els.resultsSection.scrollIntoView({behavior: "smooth", block: "start"});
}

function showApiError(message) {
  clearFetchError();
  showError(message || t("analysisUnavailable"));
  window.scrollTo({top: 0, behavior: "smooth"});
  return;
  els.resultsSection.classList.add("is-visible");

  const card = document.createElement("article");
  card.className = "card error-results-card";
  card.id = "fetchErrorCard";
  card.innerHTML = `
    <div style="
      background: rgba(244,63,94,0.08);
      border: 1px solid rgba(244,63,94,0.3);
      border-radius: 16px;
      padding: 40px 32px;
      text-align: center;
      margin-bottom: 24px;
    ">
      <div style="font-size: 3rem; margin-bottom: 16px;">⚠️</div>
      <div style="
        font-size: 1.1rem;
        font-weight: 700;
        color: #f43f5e;
        margin-bottom: 12px;
      ">Analysis unavailable</div>
      <div style="
        font-size: 0.9rem;
        color: #94a3b8;
        line-height: 1.6;
        max-width: 480px;
        margin: 0 auto 24px;
      ">${escapeHtml(message || "Turn on Demo Mode for an offline presentation.")}</div>
      <div style="
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 10px;
        padding: 16px;
        font-size: 0.8rem;
        color: #64748b;
        text-align: left;
        max-width: 400px;
        margin: 0 auto 20px;
        font-family: monospace;
        line-height: 1.8;
      ">
        Tip:<br>
        Use Demo Mode to present a simulated analysis without any network dependency.
      </div>
      <button type="button" id="apiErrorTryAgainBtn" style="
        padding: 10px 24px;
        border-radius: 10px;
        border: 1px solid rgba(244,63,94,0.3);
        background: rgba(244,63,94,0.08);
        color: #f43f5e;
        cursor: pointer;
        font-size: 0.875rem;
        font-family: inherit;
        transition: all 0.2s;
      ">← Try Again</button>
    </div>
  `;

  els.resultsSection.prepend(card);
  document.getElementById("apiErrorTryAgainBtn")?.addEventListener("click", () => {
    hideResults();
    window.scrollTo({top: 0, behavior: "smooth"});
  });
  els.resultsSection.scrollIntoView({behavior: "smooth"});
}

function clearFetchError() {
  document.getElementById("fetchErrorCard")?.remove();
}

function showError(message) {
  els.formError.textContent = message;
  els.formError.classList.add("is-visible");
}

function hideError() {
  els.formError.textContent = "";
  els.formError.classList.remove("is-visible");
}

function hideResults() {
  els.resultsSection.classList.remove("is-visible");
  clearFetchError();
}

function levelLabel(level) {
  const labels = currentLang === "ru"
    ? {
      Meaningless: "Бессмысленно",
      Weak: "Слабо",
      Average: "Средне",
      Good: "Хорошо",
      Top: "Топ"
    }
    : {
      Meaningless: "Meaningless",
      Weak: "Weak",
      Average: "Average",
      Good: "Good",
      Top: "Top"
    };
  return labels[level] || level || "Average";
}

function levelClass(level) {
  return `level-${String(level || "average").toLowerCase()}`;
}

function safeText(value, fallback = "") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  return String(value);
}

function escapeHtml(value) {
  return safeText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch (error) {
    // Fall back below.
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}
