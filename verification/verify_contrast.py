import sys
import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Visit Home Page
        print("Visiting Home Page...")
        try:
            page.goto("http://localhost:3000", timeout=60000)
            page.wait_for_selector("body", timeout=60000)
            time.sleep(5) # Wait for hydration
            page.screenshot(path="verification/home_light.png", full_page=True)
            print("Captured verification/home_light.png")

            # Try to force dark mode
            page.evaluate("document.documentElement.classList.remove('light')")
            page.evaluate("document.documentElement.classList.add('dark')")
            time.sleep(2)
            page.screenshot(path="verification/home_dark.png", full_page=True)
            print("Captured verification/home_dark.png")

            # Reset back to light
            page.evaluate("document.documentElement.classList.remove('dark')")
            page.evaluate("document.documentElement.classList.add('light')")

            # Visit Article Page
            # Find an article link
            print("Finding article link...")
            article_link = page.query_selector("a[href^='/articles/']")
            if article_link:
                href = article_link.get_attribute("href")
                print(f"Visiting Article Page: {href}")
                # Use goto instead of click to be safer
                page.goto(f"http://localhost:3000{href}", timeout=60000)
                page.wait_for_load_state("networkidle")
                time.sleep(5)
                page.screenshot(path="verification/article_light.png", full_page=True)
                print("Captured verification/article_light.png")

                # Try to force dark mode
                page.evaluate("document.documentElement.classList.remove('light')")
                page.evaluate("document.documentElement.classList.add('dark')")
                time.sleep(2)
                page.screenshot(path="verification/article_dark.png", full_page=True)
                print("Captured verification/article_dark.png")
            else:
                print("No article link found!")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
