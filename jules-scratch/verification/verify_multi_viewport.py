from playwright.sync_api import sync_playwright, expect
import time

def run_verification(page, viewport_name):
    # Triple-click the 'R' logo
    logo = page.locator('.logoR')
    logo.click(click_count=3)

    # Wait for the blog to load
    page.wait_for_selector('.desktop', timeout=30000)

    # Double-click the music icon
    music_icon = page.locator('.iconContainer:has-text("music") .iconImage')
    music_icon.dblclick()

    # Wait for the window to open
    page.wait_for_selector('.window', timeout=10000)

    # Double-click the grass_is_green icon
    grass_icon = page.locator('.iconContainer:has-text("grass_is_green") .iconImage')
    grass_icon.dblclick()

    # Wait for the overlay to appear and finish its animation
    overlay = page.locator('.music-overlay')
    expect(overlay).to_be_visible()
    time.sleep(1.5) # Wait for animations

    # Verify the media control buttons are present
    expect(page.get_by_role("button", name="Play")).to_be_visible()
    expect(page.get_by_role("button", name="Pause")).to_be_visible()
    expect(page.get_by_role("button", name="Stop")).to_be_visible()

    # Take the final screenshot for visual verification
    page.screenshot(path=f"jules-scratch/verification/{viewport_name}_verification.png")

def run(playwright):
    browser = playwright.chromium.launch()

    # --- Desktop Verification ---
    desktop_page = browser.new_page()
    desktop_page.goto("http://localhost:8000/", timeout=60000)
    run_verification(desktop_page, "desktop")
    desktop_page.close()

    # --- Mobile Verification ---
    iphone = playwright.devices['iPhone 12']
    mobile_page = browser.new_page(**iphone)
    mobile_page.goto("http://localhost:8000/", timeout=60000)
    run_verification(mobile_page, "mobile")
    mobile_page.close()

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
