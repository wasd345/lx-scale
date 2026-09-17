import { useScopedI18n } from '@/locales/client';

export function Recommendations() {
  const t = useScopedI18n(
    'component.questionnaire.result.public.recommendations'
  );

  return (
    <div>
      <h2 className="text-xl font-medium mb-3">{t('title')}</h2>
      <div className="bg-white border rounded-lg p-4">
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>{t('generalAdvice')}</li>
        </ul>
      </div>
    </div>
  );
}
