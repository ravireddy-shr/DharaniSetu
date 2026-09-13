import i18n, { type PostProcessorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import te from './te.json';
import ta from './ta.json';
import { translateDynamic, type SupportedLanguage } from './dynamicTranslator';

const autoTranslatorPostProcessor: PostProcessorModule = {
  type: 'postProcessor',
  name: 'autoTranslator',
  process(value: string, _key: string | string[], _options: any, translator: any) {
    const lng = (translator?.language || i18n.language || 'en') as SupportedLanguage;
    return translateDynamic(value, lng);
  },
};

i18n
  .use(autoTranslatorPostProcessor)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      te: { translation: te },
      ta: { translation: ta },
    },
    lng: (typeof window !== 'undefined' && localStorage.getItem('dharani_language')) || 'en',
    fallbackLng: 'en',
    postProcess: ['autoTranslator'],
    interpolation: { escapeValue: false },
  });

export default i18n;

