from playwright.sync_api import Page, expect, sync_playwright

def verify_homepage(page: Page):
    print("Navigating to home page...")
    page.goto("http://localhost:3000", timeout=60000)

    # Wait for header text
    expect(page.get_by_text("Crossmedia").first).to_be_visible()

    print("Taking homepage screenshot...")
    page.screenshot(path="verification/homepage.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_homepage(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
