const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// =======================
// Test Data
// =======================
const TEST_DATA = {
  positive: [
    { tcId: 'Pos_Fun_001', name: 'Simple present tense statement', input: 'mama iskoolee inna', expected: 'මම ඉස්කෝලේ ඉන්න' },
    { tcId: 'Pos_Fun_002', name: 'Simple food request', input: 'mata kiri oonee', expected: 'මට කිරි ඕනෑ' },
    { tcId: 'Pos_Fun_003', name: 'Going home statement', input: 'api gedhara yanavaa', expected: 'අපි ගෙදර යනවා' },
    { tcId: 'Pos_Fun_004', name: 'Two activities connected', input: 'mama kaeema kannam saha passe naaginnam', expected: 'මම කෑම කන්නම් සහ පස්සේ නාගින්නම්' },
    { tcId: 'Pos_Fun_005', name: 'Weather condition compound', input: 'vaessa yanavanam api yannee naee', expected: 'වැස්ස යනවනම් අපි යන්නේ නෑ' },
    { tcId: 'Pos_Fun_006', name: 'Conditional complex sentence', input: 'oyaa enavaanam mama innaanam kaeema laeesthi karannam', expected: 'ඔයා එනවානම් මම ඉන්නානම් කෑම ලෑස්ති කරන්නම්' },
    { tcId: 'Pos_Fun_007', name: 'Simple question about state', input: 'oyaa kohedha innee', expected: 'ඔයා කොහෙද ඉන්නේ' },
    { tcId: 'Pos_Fun_008', name: 'Question about time', input: 'kavaddha enna yanne', expected: 'කවද්ද එන්න යන්නේ' },
    { tcId: 'Pos_Fun_009', name: 'Polite question request', input: 'oyaata mata eeka kiyanna puluvandha', expected: 'ඔයාට මට ඒක කියන්න පුලුවන්ද' },
    { tcId: 'Pos_Fun_010', name: 'Direct command', input: 'laBa enna', expected: 'ලඟ එන්න' },
    { tcId: 'Pos_Fun_011', name: 'Polite command', input: 'karuNaakaralaa poddak thissee balanna', expected: 'කරුණාකරලා පොඩ්ඩක් තිස්සේ බලන්න' },
    { tcId: 'Pos_Fun_012', name: 'Morning greeting', input: 'suba udhaeesanak', expected: 'සුබ උදෑසනක්' },
    { tcId: 'Pos_Fun_013', name: 'Affirmative response', input: 'ov hari', expected: 'ඔව් hari' },
    { tcId: 'Pos_Fun_014', name: 'Past tense action', input: 'mama iiyee gedhara giyaa', expected: 'මම ඊයේ ගෙදර ගියා' },
    { tcId: 'Pos_Fun_015', name: 'Future tense plan', input: 'api heta kolambata yamu', expected: 'අපි හෙට කොලඹට යමු' },
    { tcId: 'Pos_Fun_016', name: 'Simple negation', input: 'mata epaa eeka', expected: 'මට එපා ඒක' },
    { tcId: 'Pos_Fun_017', name: 'Cannot statement', input: 'mata eeka karanna baee', expected: 'මට ඒක කරන්න බෑ' },
    { tcId: 'Pos_Fun_018', name: 'Plural pronoun usage', input: 'eyaalaa heta enavaa', expected: 'එයාලා හෙට එනවා' },
    { tcId: 'Pos_Fun_019', name: 'Common phrase pattern', input: 'poddak innako mama ennam', expected: 'පොඩ්ඩක් ඉන්නකො මම එන්නම්' },
    { tcId: 'Pos_Fun_020', name: 'English brand term embedded', input: 'mata Facebook account eka login karanna baee', expected: 'මට Facebook account එක login කරන්න බෑ' },
    { tcId: 'Pos_Fun_021', name: 'Place name preservation', input: 'nimeelaa Kandy giyaa', expected: 'නිමේලා Kandy ගියා' },
    { tcId: 'Pos_Fun_022', name: 'Exclamation mark handling', input: 'supiri!', expected: 'සුපිරි!' },
    { tcId: 'Pos_Fun_023', name: 'Currency amount', input: 'mata Rs. 500k oonee', expected: 'මට Rs. 500ක් ඕනෑ' },
    { tcId: 'Pos_Fun_024', name: 'Medium length conversation', input: 'mama heta office yanavaa eehindha mata adha raee kanna baee. oyaa mata raee eka savanna puluvandha', expected: 'මම හෙට office යනවා ඒහින්ද මට අද රෑ කන්න බෑ. ඔයා මට රෑ එක සවන්න පුලුවන්ද' }
  ],

  negative: [
    { tcId: 'Neg_Fun_001', name: 'Missing space between words', input: 'mamagedharainnee', expected: 'මම ගෙදර ඉන්නේ' },
    { tcId: 'Neg_Fun_002', name: 'Joined compound words', input: 'apipassekathakaramu', expected: 'අපි පස්සේ කතා කරමු' },
    { tcId: 'Neg_Fun_003', name: 'Mixed spacing issues', input: 'mata     oonee  eeka', expected: 'මට ඕනෑ ඒක' },
    { tcId: 'Neg_Fun_004', name: 'Line break in sentence', input: 'මම ගෙදර යනවා කමල්ටත් කියන්න', expected: 'මම යනවම්\nගෙදර' },
    { tcId: 'Neg_Fun_005', name: 'Informal slang phrase', input: 'machaang supiriyaane', expected: 'මචාන්ග් සුපිරියානෙ' },
    { tcId: 'Neg_Fun_006', name: 'Colloquial expression', input: 'adooo mokakkdha mee', expected: 'අඩෝඕ මොකක්ක්ද මේ' },
    { tcId: 'Neg_Fun_007', name: 'Mixed English with errors', input: 'mamaWhatsAppekagiyaa', expected: 'මම WhatsApp එකගියා' },
    { tcId: 'Neg_Fun_008', name: 'Abbreviation in sentence', input: 'mata ASAP eeka oonee', expected: 'මට ASAP ඒක ඕනෑ' },
    { tcId: 'Neg_Fun_009', name: 'Question with spacing error', input: 'oyaakohedhainnee', expected: 'ඔයා කොහෙද ඉන්නේ' },
    { tcId: 'Neg_Fun_010', name: 'Complex slang statement', input: 'eyi bro eeka set karala denna', expected: 'එයි bro ඒක set කරල දෙන්න' }
  ],

  ui: {
    tcId: 'Pos_UI_001',
    name: 'Real-time translation updates as typing',
    input: 'mama kaeema kannavaa',
    partialInput: 'mama kae',
    expectedFull: 'මම කෑම කන්නවා'
  }
};

// =======================
// Translator Helper Class
// =======================
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// =======================
// Test Suite
// =======================
test.describe('SwiftTranslator - Singlish to Sinhala Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Test', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();

      // Type partial input
      await input.type(TEST_DATA.ui.partialInput);

      // Wait for partial translation
      await page.waitForTimeout(1500);

      // Verify partial output appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);

      // Complete typing
      await input.type(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length));

      // Wait for full translation
      await translator.waitForOutput();

      // Verify full translation
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);

      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
