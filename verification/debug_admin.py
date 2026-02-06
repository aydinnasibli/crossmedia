from playwright.sync_api import sync_playwright

def debug_admin():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating...")
            page.goto("http://localhost:3001/admin")
            page.wait_for_timeout(3000) # Wait 3s
            page.screenshot(path="verification/debug_admin.png")
            print("Screenshot saved.")
            content = page.content()
            with open("verification/debug_admin.html", "w") as f:
                f.write(content)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    debug_admin()
