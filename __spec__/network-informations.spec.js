import puppeteer from 'puppeteer'
import { withConnectionStats, localCandidateAttributes, allAttributes } from '../src/network-informations'

describe('withConnectionStats', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });
  
  test('allAttributes', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto('https://test.webrtc.org/', { waitUntil: 'networkidle0' });
    const html = await page.content();

    withConnectionStats(stats => {
      let filteredStats = allAttributes(stats.result())
      console.log(filteredStats)
    })

    await browser.close()
  })
  
  test('localCandidateAttributes', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto('https://test.webrtc.org/', { waitUntil: 'networkidle0' });
    const html = await page.content();

    withConnectionStats(stats => {
      let filteredStats = localCandidateAttributes(stats.result())
      console.log(filteredStats)
    })

    await browser.close()
  })
}, 10000);

