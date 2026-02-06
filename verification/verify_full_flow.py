from playwright.sync_api import sync_playwright, expect

def verify_full_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Visit Admin Dashboard (Verify Server Starts)
        print("1. Visiting Admin Dashboard...")
        page.goto("http://localhost:3000/admin")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/1_admin_dashboard.png")
        print("   - Dashboard loaded.")

        # 2. Visit Comments Page
        print("2. Visiting Admin Comments...")
        page.goto("http://localhost:3000/admin/comments")
        page.wait_for_load_state("networkidle")
        expect(page.get_by_text("Şərhlər")).to_be_visible()
        page.screenshot(path="verification/2_admin_comments.png")
        print("   - Comments page loaded.")

        # 3. Visit Subscribers Page
        print("3. Visiting Admin Subscribers...")
        page.goto("http://localhost:3000/admin/subscribers")
        page.wait_for_load_state("networkidle")
        expect(page.get_by_text("Abunəçilər")).to_be_visible()
        page.screenshot(path="verification/3_admin_subscribers.png")
        print("   - Subscribers page loaded.")

        browser.close()

if __name__ == "__main__":
    verify_full_flow()
