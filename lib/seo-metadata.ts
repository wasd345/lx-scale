import { Questionnaire } from "@/types";
import { getQuestionnaireKeywords } from "@/constants/seo-keywords";

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

export function generateQuestionnaireMetadata(
  questionnaire: Questionnaire,
  locale: string
): SEOMetadata {
  const isZh = locale === "zh";
  const keywords = getQuestionnaireKeywords(questionnaire.id, locale);

  // Get professional description of the scale
  const introduction = questionnaire.details.introduction;
  const questionCount = questionnaire.details.questionCount;
  const evaluationTime = questionnaire.details.evaluationTime;

  // Build a professional title for the assessment page
  const title = isZh
    ? `${questionnaire.title} - 免费权威心理测评 | LXScale专业心理量表平台`
    : `${questionnaire.title} - Free Authoritative Assessment | LXScale Professional Mental Health Platform`;

  // Build detailed description (highlighting three major advantages)
  const description = isZh
    ? `【免费+权威】${
        questionnaire.title
      }专业心理测评工具。${introduction.substring(
        0,
        80
      )}...包含${questionCount}个问题，${evaluationTime}完成。国际标准量表，权威临床评估，保护隐私。`
    : `[Free+Authoritative] Professional ${
        questionnaire.title
      } mental health assessment. ${introduction.substring(
        0,
        80
      )}...${questionCount} questions, takes ${evaluationTime}. International standard scale with authoritative clinical assessment, privacy protected.`;

  // OpenGraph title (highlighting core value)
  const ogTitle = isZh
    ? `${questionnaire.title} - 免费心理测评 | LXScale权威平台`
    : `${questionnaire.title} - Free Mental Health Assessment | LXScale`;

  // OpenGraph description (emphasizing professionalism and free)
  const ogDescription = isZh
    ? `权威${questionnaire.title}免费测评。${questionCount}题${evaluationTime}完成，国际标准，临床级准确度，完全免费。`
    : `Authoritative ${questionnaire.title} free assessment. ${questionCount} questions, ${evaluationTime} completion, international standard, clinical accuracy, completely free.`;

  // Twitter title and description
  const twitterTitle = ogTitle;
  const twitterDescription = ogDescription;

  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
  };
}

// Generate professional structured data for each questionnaire
export function generateQuestionnaireStructuredData(
  questionnaire: Questionnaire,
  locale: string,
  url: string
) {
  const isZh = locale === "zh";

  return {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "@id": url,
    name: questionnaire.title,
    description: questionnaire.details.introduction,
    url: url,
    inLanguage: isZh ? "zh-CN" : "en-US",
    medicalTestPanel: {
      "@type": "MedicalTestPanel",
      name: questionnaire.title,
      description: questionnaire.details.introduction,
      testDuration: questionnaire.details.evaluationTime,
      numberOfQuestions: questionnaire.details.questionCount,
    },
    provider: {
      "@type": "Organization",
      name: "LXScale",
      url: "https://lxscale.xyz",
      description: isZh
        ? "免费权威心理健康测评平台，提供专业临床级心理量表"
        : "Free authoritative mental health assessment platform with professional clinical-grade scales",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "LXScale",
      url: "https://lxscale.xyz",
      description: isZh
        ? "权威免费心理测评平台，提供国际标准量表和专业解读"
        : "Authoritative free mental health platform with international standard scales and professional interpretation",
    },
    mainEntity: {
      "@type": "FAQPage",
      name: `${questionnaire.title} FAQ`,
      mainEntity: [
        {
          "@type": "Question",
          name: isZh
            ? `${questionnaire.title}需要多长时间完成？`
            : `How long does ${questionnaire.title} take to complete?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: questionnaire.details.evaluationTime,
          },
        },
        {
          "@type": "Question",
          name: isZh
            ? `${questionnaire.title}包含多少个问题？`
            : `How many questions does ${questionnaire.title} contain?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: questionnaire.details.questionCount,
          },
        },
        {
          "@type": "Question",
          name: isZh
            ? "LXScale的测评结果权威吗？"
            : "Are LXScale assessment results authoritative?",
          acceptedAnswer: {
            "@type": "Answer",
            text: isZh
              ? "是的，我们使用国际标准化心理量表，如PHQ-9、GAD-7等，提供专业的测评参考。"
              : "Yes, we use internationally standardized psychological scales like PHQ-9 and GAD-7 to provide professional assessment references.",
          },
        },
      ],
    },
    ...(questionnaire.details.references &&
      questionnaire.details.references.length > 0 && {
        citation: questionnaire.details.references.map((ref) => ({
          "@type": "ScholarlyArticle",
          name: ref.text,
          url: ref.url,
        })),
      }),
  };
}
