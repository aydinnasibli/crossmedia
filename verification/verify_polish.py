from playwright.sync_api import sync_playwright
import time

def verify_polish():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Header Active State
        print("Navigating to Category Page (Siyasət)...")
        page.goto("http://localhost:3000/category/Siyasət")
        time.sleep(2)

        # Check if the Siyasət link has the active class (bg-primary/10 or text-primary)
        # Note: In HeaderClient, active link has 'text-primary bg-primary/10'
        # We search for the link with specific text and check class
        siyaset_link = page.locator("a", has_text="Siyasət").first
        classes = siyaset_link.get_attribute("class")

        if "bg-primary/10" in classes:
            print("✅ Category Link is Active.")
        else:
            print(f"❌ Category Link is NOT Active. Classes: {classes}")

        # Check Home link is NOT active
        home_link = page.locator("a", has_text="Əsas Xəbərlər").first
        home_classes = home_link.get_attribute("class")
        if "bg-primary/10" not in home_classes:
             print("✅ Home Link is correctly inactive.")
        else:
             print(f"❌ Home Link is incorrectly active. Classes: {home_classes}")

        # 2. Check Abunə ol is gone
        if page.is_visible("text=Abunə ol"):
             # It might still exist in the footer or mobile menu, but should be gone from Header desktop
             # Let's check the specific header button container if possible, or just general context
             # The button had class "bg-primary", let's check for "subscriptions" icon in header
             if page.locator("header button:has-text('Abunə ol')").count() == 0:
                 print("✅ 'Abunə ol' button removed from header.")
             else:
                 print("❌ 'Abunə ol' button still found in header.")
        else:
             print("✅ 'Abunə ol' text not found (good).")

        # 3. Search
        print("Testing Search...")
        page.fill("input[placeholder='Xəbər axtar...']", "Bakı")
        page.press("input[placeholder='Xəbər axtar...']", "Enter")

        page.wait_for_url("**/search?q=Bak%C4%B1")
        time.sleep(2)

        if page.is_visible("text=Axtarış nəticələri"):
             print("✅ Search Page loaded.")
        else:
             print("❌ Search Page not loaded.")

        if page.is_visible("text=Bakı"):
             print("✅ Search results found.")

        browser.close()

if __name__ == "__main__":
    verify_polish()
