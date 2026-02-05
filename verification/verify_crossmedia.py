from playwright.sync_api import sync_playwright
import time

def verify_crossmedia():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Home Page
        print("Navigating to Home Page...")
        try:
            page.goto("http://localhost:3000", timeout=30000)
        except Exception as e:
            print(f"Failed to load home page: {e}")
            return

        print("Checking Home Page elements...")
        # Check Ticker
        if page.is_visible("text=TƏCİLİ"):
             print("✅ Breaking News Ticker found.")
        else:
             print("❌ Breaking News Ticker NOT found.")

        # Check Hero
        if page.query_selector(".grid-cols-12"):
             print("✅ Grid Layout found.")

        time.sleep(2) # Wait for hydration
        page.screenshot(path="verification/home_page_v2.png", full_page=True)

        # 2. Category Page
        print("Navigating to Category Page (Siyasət)...")
        # Try both encoded and decoded just in case, but browser handles it.
        page.goto("http://localhost:3000/category/Siyasət")
        time.sleep(2)

        # Check specific category elements
        if page.is_visible("text=Həftənin Trendləri"):
            print("✅ Category Sidebar (Trends) found.")

        page.screenshot(path="verification/category_page_v2.png", full_page=True)

        # 3. Article Page
        print("Navigating to Article Page...")
        # Click first article in hero
        page.click("a[href^='/articles/']")
        time.sleep(2)

        # Check article elements
        if page.is_visible("text=Bu xəbəri paylaş:"):
            print("✅ Article Share buttons found.")

        print("Taking Article Page Screenshot...")
        page.screenshot(path="verification/article_page_v2.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_crossmedia()
