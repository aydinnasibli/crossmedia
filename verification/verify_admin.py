from playwright.sync_api import sync_playwright, expect
import time

def verify_admin():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Visit Dashboard
        print("Navigating to /admin...")
        page.goto("http://localhost:3001/admin")
        page.wait_for_load_state("networkidle")

        # Check title
        print("Checking Dashboard...")
        expect(page.get_by_text("İdarə Paneli", exact=True)).to_be_visible()
        expect(page.get_by_text("Ümumi Baxışlar")).to_be_visible()
        expect(page.get_by_text("Məqalələr")).to_be_visible()
        expect(page.get_by_text("Son Məqalələr")).to_be_visible()

        # Screenshot Dashboard
        page.screenshot(path="verification/admin_dashboard.png")
        print("Dashboard screenshot saved.")

        # 2. Visit Subscribers
        print("Navigating to /admin/subscribers...")
        page.click("text=Abunəçilər")
        page.wait_for_url("**/admin/subscribers")
        page.wait_for_load_state("networkidle")

        # Check table
        print("Checking Subscribers Page...")
        expect(page.get_by_text("Abunəçilər", exact=True)).to_be_visible()
        expect(page.get_by_text("Email")).to_be_visible()

        # Screenshot Subscribers
        page.screenshot(path="verification/admin_subscribers.png")
        print("Subscribers screenshot saved.")

        browser.close()

if __name__ == "__main__":
    verify_admin()
