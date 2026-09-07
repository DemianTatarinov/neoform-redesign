import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    os.makedirs('/home/jules/verification', exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:4173", wait_until="networkidle")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="/home/jules/verification/verification.png", full_page=True)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
