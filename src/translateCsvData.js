import OpenAI from "openai";

/**
 * Translate CSV data using OpenAI
 * @param {Array} csvData - The CSV data to translate
 * @param {string} apiKey - The OpenAI API key
 * @returns {Promise<Array>} - The translated CSV data
 */
const translateCsvData = async (csvData, apiKey, model) => {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const translateText = async (text, targetLanguage) => {
    const prompt = `Translate the following text to ${targetLanguage}:\n\n${text}`;
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        model: model,
      });
      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error(`Error translating to ${targetLanguage}:`, error);
      return "";
    }
  };

  const translatedData = await Promise.all(
    csvData.map(async (row) => {
      const translations = await Promise.all(
        Object.keys(row).map(async (language) => {
          if (language !== "English" && row.English) {
            const translatedText = await translateText(row.English, language);
            return { [language]: translatedText };
          } else {
            return { [language]: row[language] };
          }
        })
      );
      return translations.reduce((acc, curr) => ({ ...acc, ...curr }), {
        English: row.English,
      });
    })
  );

  return translatedData;
};

export default translateCsvData;
