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

        # Click "Yearly" tab in Goals to find a goal with a due date
        page.get_by_role("button", name="Yearly").click()
        page.wait_for_timeout(1000)

        # Get the first day that has a blue dot under it (meaning it has a goal)
        # We look for a day that has the bg-blue-500 class dot
        day_with_goal = page.locator("div.bg-blue-500").first.locator("..")

        if day_with_goal.count() > 0:
            day_with_goal.first.click()
            page.wait_for_timeout(1000)

        # Take screenshot
        page.screenshot(path="calendar_goals_present.png")

        browser.close()

if __name__ == "__main__":
    test_calendar()
