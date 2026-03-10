from playwright.sync_api import sync_playwright

def test_calendar():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 1024})

        # Navigate to home page
        page.goto("http://localhost:3000")

        # Wait for calendar widget to load
        page.wait_for_selector("text=Su")

        page.wait_for_timeout(2000)

        # Get the first day that has a white dot under it (meaning it has a goal and is selected)
        # OR a blue dot (meaning it has a goal and is not selected)
        # Actually since we seeded it for "today", the dot will be white since today has a blue background
        day_with_goal = page.locator("div.bg-white.w-1.h-1").first.locator("..")

        if day_with_goal.count() > 0:
            day_with_goal.first.click()
            page.wait_for_timeout(1000)

        # Take screenshot
        page.screenshot(path="calendar_goals_present2.png")

        browser.close()

if __name__ == "__main__":
    test_calendar()
