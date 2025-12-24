# Air Fryer Timer App - Test Plan

**Project:** Air Fryer Timer Web App
**Version:** 1.0
**Author:** Quinn (QA Tester)
**Date:** December 2024
**Last Updated:** December 2024

---

## Table of Contents
1. [Test Overview](#test-overview)
2. [Unit Tests](#unit-tests)
3. [Integration Tests](#integration-tests)
4. [User Acceptance Tests](#user-acceptance-tests)
5. [Edge Cases & Stress Tests](#edge-cases--stress-tests)
6. [Security Tests](#security-tests)
7. [Browser Compatibility](#browser-compatibility)
8. [Accessibility Tests](#accessibility-tests)
9. [Voice Alert Deep Dive](#voice-alert-deep-dive)
10. [Food Database Validation](#food-database-validation)

---

## Test Overview

### Test Scope
This test plan covers the Air Fryer Timer React web application with focus on:
- Food selection and search functionality
- Timer countdown accuracy
- Voice alert system (Web Speech API)
- Mid-cook action triggers (flip/shake/check)
- Step-by-step cooking instructions
- UI responsiveness and state management

### Test Environment
- Browsers: Chrome, Firefox, Safari, Edge
- Devices: Desktop, Tablet, Mobile
- Build: Vite dev server (`npm run dev`) and production build (`npm run build`)

---

## Unit Tests

### UT-001: Time Formatting Utility (`formatTime.js`)

| Test ID | Description | Input | Expected Output | Priority |
|---------|-------------|-------|-----------------|----------|
| UT-001a | Format zero seconds | `0` | `"00:00"` | High |
| UT-001b | Format single digit seconds | `5` | `"00:05"` | High |
| UT-001c | Format 60 seconds | `60` | `"01:00"` | High |
| UT-001d | Format typical cook time (15 min) | `900` | `"15:00"` | High |
| UT-001e | Format max expected time (45 min) | `2700` | `"45:00"` | Medium |
| UT-001f | Handle negative seconds | `-10` | `"00:00"` or error handling | High |
| UT-001g | Handle decimal seconds | `90.5` | `"01:30"` (rounded) | Medium |
| UT-001h | Handle extremely large value | `999999` | Graceful handling, no crash | Low |

### UT-002: Food Data Utilities (`foods.js`)

| Test ID | Description | Test Steps | Expected Result | Priority |
|---------|-------------|------------|-----------------|----------|
| UT-002a | getFoodsByCategory returns correct foods | Call `getFoodsByCategory('protein')` | Returns 8 protein items | High |
| UT-002b | getFoodsByCategory with 'all' | Call `getFoodsByCategory('all')` | Returns all 30 foods | High |
| UT-002c | getFoodsByCategory with invalid category | Call `getFoodsByCategory('invalid')` | Returns empty array, no error | High |
| UT-002d | searchFoods finds exact match | Call `searchFoods('Chicken Wings')` | Returns chicken wings item | High |
| UT-002e | searchFoods is case-insensitive | Call `searchFoods('SALMON')` | Returns salmon item | High |
| UT-002f | searchFoods partial match | Call `searchFoods('chick')` | Returns all chicken items | High |
| UT-002g | searchFoods with no results | Call `searchFoods('xyzabc')` | Returns empty array | Medium |
| UT-002h | searchFoods with empty string | Call `searchFoods('')` | Returns all foods or empty | Medium |
| UT-002i | getFoodById with valid ID | Call `getFoodById('chicken-wings')` | Returns correct food object | High |
| UT-002j | getFoodById with invalid ID | Call `getFoodById('fake-id')` | Returns undefined/null | High |

### UT-003: Speech Utility (`speech.js`)

| Test ID | Description | Test Steps | Expected Result | Priority |
|---------|-------------|------------|-----------------|----------|
| UT-003a | speak() calls speechSynthesis API | Call `speak('Test')` | `window.speechSynthesis.speak` invoked | High |
| UT-003b | speak() handles empty string | Call `speak('')` | No crash, no speech | Medium |
| UT-003c | cancelSpeech() stops current speech | Call cancel during speech | `speechSynthesis.cancel` invoked | High |
| UT-003d | isSpeechSupported() detection | Call on unsupported browser | Returns false | High |
| UT-003e | speak() with special characters | Call `speak('Flip the food!')` | Speaks correctly | Medium |

### UT-004: Food Data Structure Validation

| Test ID | Description | Validation | Expected Result | Priority |
|---------|-------------|------------|-----------------|----------|
| UT-004a | All foods have required fields | Check each food for: id, name, category, cookTime, temperature | All fields present | High |
| UT-004b | Cook times are positive integers | Validate cookTime > 0 for all foods | All pass | High |
| UT-004c | Temperatures are realistic | Validate 200 <= temperature <= 450 | All pass | High |
| UT-004d | Actions have valid atMinute values | Check atMinute <= cookTime for all actions | All pass | High |
| UT-004e | Action types are valid | Check type in ['flip', 'shake', 'check', 'spray'] | All pass | High |
| UT-004f | Instructions have valid timing | Check timing in ['before', 'during', 'after'] | All pass | High |
| UT-004g | Categories are valid | Check category in ['protein', 'vegetable', 'frozen', 'snack'] | All pass | Medium |

---

## Integration Tests

### IT-001: Food Selection Flow

| Test ID | Description | Steps | Expected Result | Priority |
|---------|-------------|-------|-----------------|----------|
| IT-001a | Navigate from select to detail view | 1. Load app 2. Click on "Chicken Wings" | Detail view shows chicken wings with cook time (22 min) and temp (400°F) | High |
| IT-001b | Category filtering updates food list | 1. Click "Vegetables" category pill | Only vegetable items shown (7 items) | High |
| IT-001c | Search narrows results | 1. Type "fries" in search 2. Check results | Shows French Fries, Sweet Potato Fries, Frozen Fries | High |
| IT-001d | Search + category filter combined | 1. Select "Frozen" category 2. Search "chicken" | Only shows Chicken Nuggets and Frozen Wings | High |
| IT-001e | Clear search restores full list | 1. Search "xyz" 2. Clear search | All foods in category visible | Medium |
| IT-001f | Back button returns to select | 1. Go to detail view 2. Click back | Returns to select view, state preserved | High |

### IT-002: Timer Lifecycle

| Test ID | Description | Steps | Expected Result | Priority |
|---------|-------------|-------|-----------------|----------|
| IT-002a | Start cooking initiates timer | 1. Select food 2. Click "Start Cooking" | Timer starts, view changes to timer, countdown begins | High |
| IT-002b | Timer counts down correctly | 1. Start 1-min cook 2. Wait 10 seconds | Timer shows 00:50 after 10 seconds | High |
| IT-002c | Pause stops countdown | 1. Start timer 2. Click pause 3. Wait 5 sec | Timer value unchanged | High |
| IT-002d | Resume continues countdown | 1. Pause at 02:30 2. Resume 3. Wait 10 sec | Timer shows ~02:20 | High |
| IT-002e | Timer reaches zero | 1. Start short cook 2. Wait for completion | Timer shows 00:00, completion state shown | High |
| IT-002f | Progress ring updates | 1. Start cooking 2. Observe ring | Ring fills proportionally to elapsed time | Medium |
| IT-002g | Cancel cooking returns to select | 1. Start timer 2. Cancel | Returns to select view, timer reset | High |

### IT-003: Voice Alert Integration

| Test ID | Description | Steps | Expected Result | Priority |
|---------|-------------|-------|-----------------|----------|
| IT-003a | Voice toggle persists | 1. Toggle voice off 2. Reload page | Voice remains off (check localStorage) | High |
| IT-003b | Voice on - action alert spoken | 1. Enable voice 2. Start chicken wings 3. Wait for flip time | "Flip the chicken wings" spoken | High |
| IT-003c | Voice off - no speech | 1. Disable voice 2. Reach action time | Alert banner shown, NO speech | High |
| IT-003d | 5-minute warning spoken | 1. Enable voice 2. Start 8-min cook 3. Wait until 5 min remain | "5 minutes remaining" spoken | High |
| IT-003e | 1-minute warning spoken | 1. Enable voice 2. Start 3-min cook 3. Wait until 1 min remain | "1 minute remaining" spoken | High |
| IT-003f | Completion alert spoken | 1. Enable voice 2. Let timer complete | "Your [food] is ready!" spoken | High |
| IT-003g | New alert cancels previous | 1. Trigger alert 2. Immediately trigger another | First speech cancelled, second plays | Medium |

### IT-004: Mid-Cook Action Alerts

| Test ID | Description | Steps | Expected Result | Priority |
|---------|-------------|-------|-----------------|----------|
| IT-004a | Flip alert shows at correct time | 1. Start chicken wings 2. Wait for flip action | Alert banner appears at ~12 min elapsed | High |
| IT-004b | Alert banner displays message | 1. Trigger flip alert | Banner shows "Flip the chicken wings for even cooking" | High |
| IT-004c | Alert auto-dismisses after 10s | 1. Trigger alert 2. Wait 10 seconds | Alert banner disappears | High |
| IT-004d | Alert dismissible by tap | 1. Trigger alert 2. Tap "Got it" | Alert dismisses immediately | High |
| IT-004e | Same action doesn't fire twice | 1. Trigger flip 2. Dismiss 3. Pause/resume | Flip alert does NOT reappear | High |
| IT-004f | Multiple actions in one cook | 1. Start food with 2+ actions 2. Complete cook | Each action fires at correct time | High |
| IT-004g | Shake action shows shake icon | 1. Trigger shake action | Banner shows shaking/vibrate icon | Medium |

### IT-005: Instructions Panel

| Test ID | Description | Steps | Expected Result | Priority |
|---------|-------------|-------|-----------------|----------|
| IT-005a | Before instructions shown pre-start | 1. View food detail (not started) | "Before Cooking" instructions visible | High |
| IT-005b | During instructions shown while cooking | 1. Start cooking | "During Cooking" section highlighted | High |
| IT-005c | After instructions shown post-complete | 1. Complete cooking | "After Cooking" instructions visible | High |
| IT-005d | Upcoming alerts displayed | 1. Start cooking 2. Check instructions panel | Shows "@ X min - Flip" for pending actions | Medium |
| IT-005e | Completed actions marked | 1. Pass a flip action 2. Check panel | Completed action visually distinguished | Medium |

---

## User Acceptance Tests

### UAT-001: Core User Journey - Cook Chicken Wings

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | Open application | Select view with food grid loads | |
| 2 | Scroll to find "Chicken Wings" | Chicken wings card visible with emoji, time, temp | |
| 3 | Click chicken wings | Detail view opens with full info | |
| 4 | Review instructions | See "Before Cooking" steps (preheat, pat dry, season) | |
| 5 | Review upcoming actions | See "@ 12 min - Flip" noted | |
| 6 | Click "Start Cooking" | Timer view with 24:00 countdown starts | |
| 7 | Observe timer for 30 seconds | Timer accurately shows 23:30 | |
| 8 | Wait for flip reminder (or test with shorter food) | Alert banner appears, voice says "Flip" | |
| 9 | Dismiss alert | Banner closes, timer continues | |
| 10 | Let timer complete | Completion message, "Done!" state | |
| 11 | View after-cooking instructions | "Let rest for 2 minutes" shown | |

### UAT-002: Search and Filter Workflow

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | Click "Frozen" category | Only frozen foods shown (6 items) | |
| 2 | Type "wings" in search | Only "Frozen Wings" shown | |
| 3 | Clear search | All 6 frozen items return | |
| 4 | Click "All" category | All 30 foods visible | |
| 5 | Search "steak" | Steak item found | |

### UAT-003: Voice Controls

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | Note voice icon state (should be ON by default) | Volume icon displayed | |
| 2 | Click voice toggle | Icon changes to muted | |
| 3 | Refresh page | Voice still muted (persisted) | |
| 4 | Toggle back on | Volume icon restored | |
| 5 | Start any food and wait for time warning | Voice announces remaining time | |

### UAT-004: Timer Controls

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | Start cooking any food | Timer begins | |
| 2 | Click pause | Timer freezes, button shows "Resume" | |
| 3 | Wait 5 seconds | Timer value unchanged | |
| 4 | Click resume | Timer continues from paused value | |
| 5 | Click cancel/back | Returns to food selection | |
| 6 | Re-select same food | Timer shows full cook time again | |

### UAT-005: Mobile Responsiveness

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | Open on mobile (or resize to 375px) | Layout adapts, no horizontal scroll | |
| 2 | Category pills scrollable | Can swipe to see all categories | |
| 3 | Food cards stack vertically | Grid becomes single column | |
| 4 | Timer view fits screen | All controls accessible, no cut-off | |
| 5 | Alert banner readable | Full message visible, dismiss button reachable | |

---

## Edge Cases & Stress Tests

### EC-001: Timer Edge Cases

| Test ID | Scenario | Steps | Expected Behavior | Priority |
|---------|----------|-------|-------------------|----------|
| EC-001a | Rapid pause/resume | Click pause/resume 10 times quickly | No duplicate intervals, timer stable | High |
| EC-001b | Browser tab becomes inactive | 1. Start timer 2. Switch tabs for 2 min 3. Return | Timer has correctly counted down (or shows accurate time) | High |
| EC-001c | Timer already running, select new food | Start timer, navigate back, select different food | Old timer cleared, new timer ready | High |
| EC-001d | Very short cook time (1 min) | Select food with 1 min cook | All features work at speed | Medium |
| EC-001e | Longest cook time (25 min bacon) | Start cooking bacon | Timer handles full duration | Medium |
| EC-001f | Action at minute 0 | If food has action at minute 0 | Action fires immediately after start | Low |

### EC-002: Voice Alert Edge Cases

| Test ID | Scenario | Steps | Expected Behavior | Priority |
|---------|----------|-------|-------------------|----------|
| EC-002a | Browser doesn't support speech | Use old/unsupported browser | Graceful fallback, no crash | High |
| EC-002b | Multiple alerts in rapid succession | Trigger alerts < 1 second apart | New alert cancels old, plays latest | Medium |
| EC-002c | Toggle voice mid-speech | 1. Trigger alert 2. Toggle voice off during speech | Speech stops immediately | Medium |
| EC-002d | System audio muted | Mute system audio, trigger alert | Alert banner still shows (visual fallback) | High |
| EC-002e | Very long alert message | Food with 100+ char message | Speech completes without cut-off | Low |

### EC-003: Data Edge Cases

| Test ID | Scenario | Steps | Expected Behavior | Priority |
|---------|----------|-------|-------------------|----------|
| EC-003a | Food with no actions | Select food with empty actions array | Timer works, no alerts triggered | High |
| EC-003b | Food with no instructions | If food has empty instructions | Panel shows placeholder or hides | Medium |
| EC-003c | Search with special characters | Search `<script>alert('xss')</script>` | No XSS, sanitized search | High |
| EC-003d | Search with emoji | Search `🍟` | Handles gracefully, no crash | Low |
| EC-003e | Very long search string | Paste 1000 character string | Input truncated or handled | Low |

### EC-004: UI Stress Tests

| Test ID | Scenario | Steps | Expected Behavior | Priority |
|---------|----------|-------|-------------------|----------|
| EC-004a | Resize window during timer | Actively resize browser while timer runs | UI adapts smoothly, timer unaffected | Medium |
| EC-004b | Network offline during use | 1. Load app 2. Go offline 3. Use all features | App works fully offline (it's client-side) | High |
| EC-004c | LocalStorage disabled | Disable localStorage, use app | Voice toggle works session-only, no crash | Medium |
| EC-004d | Double-click start button | Double-click "Start Cooking" rapidly | Only one timer instance created | High |
| EC-004e | Memory leak check | Run timer for 30 minutes | No memory growth, stable performance | Medium |

### EC-005: State Edge Cases

| Test ID | Scenario | Steps | Expected Behavior | Priority |
|---------|----------|-------|-------------------|----------|
| EC-005a | Complete cooking, then restart same food | 1. Complete cook 2. Start again without leaving | Timer resets to full time, actions reset | High |
| EC-005b | Navigate away mid-cook (back button) | 1. Start cooking 2. Browser back button | Timer stops or persists (decide behavior) | High |
| EC-005c | Reload page during cooking | 1. Start timer 2. F5 refresh | Timer resets (or persists if designed) | High |
| EC-005d | Start cooking, clear localStorage | 1. Start cooking 2. Clear storage 3. Continue | Timer unaffected, voice defaults to on | Medium |

---

## Browser Compatibility

### BC-001: Browser Matrix

| Browser | Version | Desktop | Mobile | Priority |
|---------|---------|---------|--------|----------|
| Chrome | Latest | Must Pass | Must Pass | High |
| Chrome | Latest-1 | Must Pass | Should Pass | Medium |
| Firefox | Latest | Must Pass | Must Pass | High |
| Safari | Latest | Must Pass | Must Pass (iOS) | High |
| Edge | Latest | Must Pass | Should Pass | Medium |
| Samsung Internet | Latest | N/A | Should Pass | Low |

### BC-002: Feature-Specific Browser Tests

| Feature | Chrome | Firefox | Safari | Edge | Notes |
|---------|--------|---------|--------|------|-------|
| Web Speech API | Yes | Yes | Partial | Yes | Safari requires user gesture |
| localStorage | Yes | Yes | Yes (with quirks) | Yes | Safari private mode fails |
| CSS animations | Yes | Yes | Yes | Yes | |
| Flexbox/Grid | Yes | Yes | Yes | Yes | |
| CSS scroll-snap | Yes | Yes | Yes | Yes | Category pills |

### BC-003: Safari-Specific Tests

| Test ID | Scenario | Expected | Priority |
|---------|----------|----------|----------|
| BC-003a | Voice alert first trigger | May require user interaction first | High |
| BC-003b | Private browsing localStorage | Should gracefully handle localStorage failure | High |
| BC-003c | iOS Safari touch events | All buttons respond to tap | High |

---

## Accessibility Tests

### A11Y-001: Keyboard Navigation

| Test ID | Description | Expected | Priority |
|---------|-------------|----------|----------|
| A11Y-001a | Tab through food cards | Each card focusable in order | High |
| A11Y-001b | Enter key selects food | Pressing Enter on focused card opens detail | High |
| A11Y-001c | Tab through timer controls | Start/Pause/Cancel all focusable | High |
| A11Y-001d | Escape closes alert banner | Alert dismissable via keyboard | Medium |
| A11Y-001e | Tab order logical | Focus moves left-to-right, top-to-bottom | Medium |

### A11Y-002: Screen Reader Compatibility

| Test ID | Description | Expected | Priority |
|---------|-------------|----------|----------|
| A11Y-002a | Food cards have alt text | Screen reader announces food name and details | High |
| A11Y-002b | Timer announced | Current time readable by screen reader | High |
| A11Y-002c | Alert banner announced | ARIA live region announces alert | High |
| A11Y-002d | Buttons have labels | All icon buttons have aria-label | High |
| A11Y-002e | Progress ring has label | Ring announces percentage complete | Medium |

### A11Y-003: Visual Accessibility

| Test ID | Description | Expected | Priority |
|---------|-------------|----------|----------|
| A11Y-003a | Color contrast (text) | All text meets WCAG AA (4.5:1 ratio) | High |
| A11Y-003b | Color contrast (buttons) | Interactive elements meet 3:1 ratio | High |
| A11Y-003c | Text resizing | Works at 200% zoom | Medium |
| A11Y-003d | Focus indicators visible | Clear focus outline on all interactive elements | High |
| A11Y-003e | Motion respects preferences | Animations reduced if prefers-reduced-motion | Low |

---

## Test Execution Checklist

### Pre-Test Setup
- [ ] Node.js and npm installed
- [ ] Run `npm install` successfully
- [ ] Run `npm run dev` - dev server starts
- [ ] Run `npm run build` - production build succeeds
- [ ] Browser dev tools ready

### Quick Smoke Test (5 minutes)
- [ ] App loads without console errors
- [ ] Can view all 30 foods
- [ ] Can search for "chicken"
- [ ] Can filter by "Vegetables"
- [ ] Can start and stop timer
- [ ] Voice toggle works

### Full Regression (Before Release)
- [ ] All Unit Tests pass
- [ ] All Integration Tests pass
- [ ] UAT-001 through UAT-005 pass
- [ ] Critical edge cases verified
- [ ] Chrome, Firefox, Safari tested
- [ ] Mobile responsive verified
- [ ] No console errors/warnings
- [ ] Accessibility basics verified

---

## Bug Report Template

```
**Bug ID:** BUG-XXX
**Title:** [Brief description]
**Severity:** Critical / High / Medium / Low
**Found In:** [Test ID if applicable]

**Environment:**
- Browser:
- Device:
- OS:

**Steps to Reproduce:**
1.
2.
3.

**Expected Result:**

**Actual Result:**

**Screenshot/Recording:** [Attach if applicable]

**Additional Notes:**
```

---

## Test Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Unit Test Coverage | 80%+ | TBD |
| Critical Tests Passing | 100% | TBD |
| High Priority Tests Passing | 95%+ | TBD |
| Browser Compatibility | 4/4 major | TBD |
| Accessibility Score (Lighthouse) | 90+ | TBD |

---

## Security Tests

### SEC-001: XSS Prevention

| Test ID | Attack Vector | Test Input | Expected | Priority |
|---------|---------------|------------|----------|----------|
| SEC-001a | Search input XSS | `<script>alert('xss')</script>` | Text displayed, no execution | Critical |
| SEC-001b | Search with img onerror | `<img src=x onerror=alert(1)>` | Text displayed, no execution | Critical |
| SEC-001c | Search with event handlers | `" onfocus="alert(1)" autofocus="` | Sanitized, no execution | Critical |
| SEC-001d | Unicode/encoded XSS | `%3Cscript%3Ealert(1)%3C/script%3E` | Decoded but sanitized | High |
| SEC-001e | Food data renders safely | Modify foods.js to include `<script>` | React escapes by default | High |

### SEC-002: Input Validation

| Test ID | Description | Test Input | Expected | Priority |
|---------|-------------|------------|----------|----------|
| SEC-002a | Max search length | 10,000 character string | Handled gracefully, no freeze | High |
| SEC-002b | Null bytes in search | `chicken%00wings` | Handled, no crash | Medium |
| SEC-002c | SQL injection (not applicable but test) | `'; DROP TABLE--` | Displayed as text | Low |
| SEC-002d | Path traversal in food ID | `../../../etc/passwd` | Returns undefined | Medium |

### SEC-003: LocalStorage Security

| Test ID | Description | Steps | Expected | Priority |
|---------|-------------|-------|----------|----------|
| SEC-003a | Tampered voiceEnabled value | Set localStorage to `voiceEnabled: "malicious"` | Falls back to default | High |
| SEC-003b | Corrupted localStorage | Set invalid JSON in localStorage keys | App loads with defaults | High |
| SEC-003c | Missing localStorage key | Delete voiceEnabled key | Uses default (true) | High |
| SEC-003d | localStorage quota exceeded | Fill localStorage, then toggle voice | Graceful failure | Medium |

---

## Voice Alert Deep Dive

### VA-001: Time-Based Voice Warnings

*Based on code analysis: Warnings fire at 301s (5 min), 61s (1 min), and 31s (30 sec)*

| Test ID | Timer Scenario | Expected Voice Alert | Test Method |
|---------|----------------|---------------------|-------------|
| VA-001a | 8-min cook at 5:01 remaining | "5 minutes remaining" | Start 8-min food, wait 2:59 |
| VA-001b | 8-min cook at 1:01 remaining | "1 minute remaining" | Wait until 61 seconds left |
| VA-001c | 8-min cook at 0:31 remaining | "30 seconds remaining" | Wait until 31 seconds left |
| VA-001d | 4-min cook (< 5 min) | No 5-min warning | Start 4-min food |
| VA-001e | 45-sec cook (< 1 min) | No warnings, just completion | Start very short cook |
| VA-001f | Exactly 5-min cook | 5-min warning fires immediately? | Edge case timing |

### VA-002: Action-Based Voice Alerts

| Test ID | Food | Expected Alert Timing | Voice Message |
|---------|------|----------------------|---------------|
| VA-002a | Chicken Wings | At 12:00 elapsed | "Flip the wings for even cooking" |
| VA-002b | Chicken Wings | At 20:00 elapsed | "Check for desired crispiness" |
| VA-002c | French Fries | At 7:00 elapsed | "Shake the basket to toss the fries" |
| VA-002d | French Fries | At 14:00 elapsed | "Shake again for even browning" |
| VA-002e | Shrimp | At 4:00 elapsed | "Shake the basket to redistribute shrimp" |
| VA-002f | Bacon | At 5:00 elapsed | "Check bacon crispiness - adjust time as needed" |

### VA-003: Voice Quality & Behavior

| Test ID | Scenario | Expected | Priority |
|---------|----------|----------|----------|
| VA-003a | Speech rate | Rate = 0.9 (slightly slower) | Medium |
| VA-003b | Cancel overlapping speech | New speech cancels previous | High |
| VA-003c | Volume at 1.0 | Full volume by default | Medium |
| VA-003d | English voice selected | Prefers English voice | Low |
| VA-003e | Very long food name | Speaks complete name without cut-off | Medium |

---

## Food Database Validation

### FD-001: Data Integrity Check (All 29 Foods)

**Proteins (8 items)**

| Food | ID | Time | Temp | Actions Count | Action Timings Valid |
|------|-----|------|------|---------------|---------------------|
| Chicken Wings | chicken-wings | 24 min | 400°F | 2 | 12, 20 < 24 |
| Chicken Breast | chicken-breast | 18 min | 375°F | 2 | 9, 15 < 18 |
| Salmon Fillet | salmon | 10 min | 390°F | 1 | 7 < 10 |
| Shrimp | shrimp | 8 min | 400°F | 1 | 4 < 8 |
| Steak (1-inch) | steak | 12 min | 400°F | 2 | 6, 10 < 12 |
| Pork Chops | pork-chops | 14 min | 375°F | 2 | 7, 12 < 14 |
| Bacon | bacon | 10 min | 375°F | 2 | 5, 7 < 10 |
| Chicken Thighs | chicken-thighs | 22 min | 380°F | 2 | 11, 18 < 22 |

**Vegetables (7 items)**

| Food | ID | Time | Temp | Actions Count | Action Timings Valid |
|------|-----|------|------|---------------|---------------------|
| Fresh French Fries | french-fries | 20 min | 380°F | 2 | 7, 14 < 20 |
| Sweet Potato Fries | sweet-potato-fries | 18 min | 375°F | 2 | 6, 12 < 18 |
| Broccoli | broccoli | 8 min | 375°F | 1 | 4 < 8 |
| Brussels Sprouts | brussels-sprouts | 15 min | 375°F | 2 | 7, 12 < 15 |
| Asparagus | asparagus | 8 min | 400°F | 1 | 4 < 8 |
| Zucchini | zucchini | 12 min | 400°F | 1 | 6 < 12 |
| Cauliflower | cauliflower | 15 min | 400°F | 2 | 7, 12 < 15 |

**Frozen Foods (6 items)**

| Food | ID | Time | Temp | Actions Count | Action Timings Valid |
|------|-----|------|------|---------------|---------------------|
| Frozen Fries | frozen-fries | 15 min | 400°F | 2 | 7, 12 < 15 |
| Chicken Nuggets | chicken-nuggets | 10 min | 400°F | 1 | 5 < 10 |
| Fish Sticks | fish-sticks | 10 min | 400°F | 1 | 5 < 10 |
| Pizza Rolls | pizza-rolls | 8 min | 380°F | 1 | 4 < 8 |
| Mozzarella Sticks | mozzarella-sticks | 6 min | 375°F | 1 | 3 < 6 |
| Frozen Wings | frozen-wings | 28 min | 400°F | 2 | 14, 22 < 28 |

**Snacks (8 items)**

| Food | ID | Time | Temp | Actions Count | Action Timings Valid |
|------|-----|------|------|---------------|---------------------|
| Tater Tots | tater-tots | 15 min | 400°F | 2 | 5, 10 < 15 |
| Egg Rolls | egg-rolls | 10 min | 375°F | 1 | 5 < 10 |
| Spring Rolls | spring-rolls | 8 min | 375°F | 1 | 4 < 8 |
| Onion Rings | onion-rings | 10 min | 375°F | 1 | 5 < 10 |
| Jalapeno Poppers | jalapeno-poppers | 8 min | 375°F | 2 | 4, 6 < 8 |
| Corn Dogs | corn-dogs | 10 min | 375°F | 1 | 5 < 10 |
| Hash Browns | hashbrowns | 12 min | 400°F | 1 | 6 < 12 |
| Samosas | samosas | 12 min | 375°F | 1 | 6 < 12 |

### FD-002: Instruction Completeness

| Test ID | Requirement | Validation |
|---------|-------------|------------|
| FD-002a | All foods have "before" instructions | Check each food has timing='before' |
| FD-002b | All foods have "during" instructions | Check each food has timing='during' |
| FD-002c | All foods have "after" instructions | Check each food has timing='after' |
| FD-002d | Instructions have step numbers | Each instruction has step property |
| FD-002e | Instructions have text | Each instruction has non-empty text |

### FD-003: Category Distribution

| Category | Expected Count | Actual Count | Status |
|----------|---------------|--------------|--------|
| protein | 8 | 8 | Verified |
| vegetable | 7 | 7 | Verified |
| frozen | 6 | 6 | Verified |
| snack | 5+ | 5 | Verified |
| **Total** | **26** | 26 | Verified |

---

## Timer Precision Tests

### TP-001: Countdown Accuracy

| Test ID | Scenario | Expected Precision | Method |
|---------|----------|-------------------|--------|
| TP-001a | 1-minute timer | +/- 1 second | Stopwatch comparison |
| TP-001b | 10-minute timer | +/- 2 seconds | Stopwatch comparison |
| TP-001c | Timer with tab switching | Accurate on return | Start timer, switch tabs 2 min, check |
| TP-001d | Timer with device sleep | TBD (may reset) | Close laptop lid, reopen |

### TP-002: Interval Behavior

| Test ID | Scenario | Expected | Priority |
|---------|----------|----------|----------|
| TP-002a | Pause clears interval | No background ticking | High |
| TP-002b | Resume creates new interval | Countdown continues | High |
| TP-002c | Reset clears interval | Timer fully stopped | High |
| TP-002d | Multiple rapid toggles | Single interval active | High |
| TP-002e | Complete doesn't tick past 0 | Stops at 00:00 | High |

---

## Bug Hunting Checklist (Quinn's Favorites)

### The "What If User Does This?" Tests

| Scenario | Expected | Tested |
|----------|----------|--------|
| Start timer, close browser, reopen | Timer reset (acceptable) | [ ] |
| Double-click every button | No duplicate actions | [ ] |
| Spam the voice toggle 20 times | No audio glitches | [ ] |
| Search for food while timer runs | Timer unaffected | [ ] |
| Resize window to 100px width | No JS errors | [ ] |
| Open in iframe | Works or blocked gracefully | [ ] |
| Right-click everything | No unexpected context menus | [ ] |
| Use browser zoom 500% | Timer still readable | [ ] |
| Fill all localStorage (5MB) | Voice toggle fails gracefully | [ ] |
| System clock change during timer | Timer based on intervals, unaffected | [ ] |

### The "Malicious User" Tests

| Attack | Test | Result |
|--------|------|--------|
| Inject script via search | `<script>steal(cookie)</script>` | Escaped |
| Prototype pollution | Modify Array.prototype | App unaffected |
| Console manipulation | Delete `window.speechSynthesis` | Graceful fallback |
| Storage tampering | Set `voiceEnabled: "__proto__"` | Safe defaults |

---

## Potential Bugs Found During Code Review

*These are issues I spotted while reviewing the code. They should be verified during testing.*

### PB-001: Possible Issues

| ID | Location | Issue | Severity | Verification |
|----|----------|-------|----------|--------------|
| PB-001a | App.jsx:340 | Voice warning at 301 seconds says "5 minutes" but 301s is 5:01 - should fire at 300? | Low | Test if 5-min warning fires at exactly 5:00 or 5:01 |
| PB-001b | App.jsx:341 | 1-min warning at 61s (1:01) instead of 60s | Low | Verify timing matches user expectation |
| PB-001c | App.jsx:342 | 30-sec warning at 31s instead of 30s | Low | Verify timing matches user expectation |
| PB-001d | TimerContext.jsx:2 | Imports `useVoice` from hooks but file may not exist | High | Verify hook file exists or context is unused |
| PB-001e | foods.js | Chicken Wings is 24 min (confirmed correct in data) | Low | UAT doc updated to 24 min |
| PB-001f | App.jsx:388-395 | Back button disabled during timer but user could use browser back | Medium | Test browser back button during timer |
| PB-001g | App.jsx:369-370 | Auto-dismiss uses reference equality for action comparison | Low | Could fail if action object changes |

### PB-002: Data Inconsistencies to Verify

| Food | Possible Issue | Check |
|------|----------------|-------|
| All | Some foods may have actions at time >= cookTime | Validate all action.atMinute < food.cookTime |
| Chicken variations | Multiple chicken items use same emoji | Intentional or needs differentiation? |
| Categories | "protein" lowercase but displayed "Proteins" | Verify category mapping |

### PB-003: Browser-Specific Concerns

| Browser | Concern | Test Priority |
|---------|---------|---------------|
| Safari | Web Speech API requires user gesture first | High |
| Safari iOS | localStorage in private mode throws exceptions | High |
| Firefox | Speech synthesis voice selection may differ | Medium |
| All | Tab hidden may cause setInterval drift | High |

---

## Test Environment Notes

### Running the App
```bash
cd /home/aidevshop/ai-dev-shop-projects/proj_lq9vh1_1766551950259
npm install
npm run dev
# App runs at http://localhost:5173
```

### Quick Verification Commands
```bash
# Check food count
grep -c "id:" src/data/foods.js

# Check for console.logs left in code
grep -r "console.log" src/

# Verify no TODO comments left
grep -r "TODO" src/
```

### Test Data Reset
- Clear localStorage: `localStorage.clear()` in browser console
- Reload page for fresh state

---

## Additional Critical Tests (Added During Code Review)

### ACT-001: Voice Alert Race Conditions

| Test ID | Scenario | Steps | Expected | Priority |
|---------|----------|-------|----------|----------|
| ACT-001a | Action alert + time warning collision | Cook food where flip time aligns with 5/1-min warning | Both alerts fire sequentially, not lost | High |
| ACT-001b | Multiple actions at same minute | If 2 actions have same atMinute value | Both messages spoken | High |
| ACT-001c | Alert during paused state | Pause timer right before action minute | Action doesn't fire while paused | High |
| ACT-001d | Resume exactly at action minute | Pause at 11:59, resume at 12:00 (flip time) | Flip fires correctly | High |

### ACT-002: Progress Ring Edge Cases

| Test ID | Scenario | Expected | Priority |
|---------|----------|----------|----------|
| ACT-002a | Progress at 0% | Ring shows empty (just background circle) | Medium |
| ACT-002b | Progress at 100% | Ring is fully filled | Medium |
| ACT-002c | Progress calculation with pause | Ring percentage based on remaining/total, not elapsed | High |
| ACT-002d | Very short food (6 min) | Progress updates visually every second | Medium |
| ACT-002e | Very long food (28 min) | Progress ring doesn't overflow or break | Medium |

### ACT-003: Search + Timer Interaction

| Test ID | Scenario | Steps | Expected | Priority |
|---------|----------|-------|----------|----------|
| ACT-003a | Search while timer runs | Start cooking, then search from timer view | N/A - Can't search from timer view (correct) | Low |
| ACT-003b | Timer state after back navigation | Start timer, go back, re-enter detail | Timer should be reset OR show warning | High |
| ACT-003c | Same food re-selection during timer | If somehow possible to select same food | Handled gracefully | Medium |

### ACT-004: firedActions State Management

| Test ID | Scenario | Steps | Expected | Priority |
|---------|----------|-------|----------|----------|
| ACT-004a | firedActions resets on new cook | 1. Complete cook 2. Cook same food again | Actions fire again (firedActions cleared) | Critical |
| ACT-004b | firedActions persists during pause | 1. Fire action 2. Pause 3. Resume | Same action doesn't re-fire | High |
| ACT-004c | firedActions with very fast timer | Actions fire correctly at high speed | All actions fire at correct times | Medium |

### ACT-005: Alert Banner Dismissal

| Test ID | Scenario | Steps | Expected | Priority |
|---------|----------|-------|----------|----------|
| ACT-005a | Auto-dismiss timeout clears correctly | Let alert auto-dismiss | No orphaned timeouts | Medium |
| ACT-005b | Manual dismiss cancels auto-dismiss | Click dismiss before 10s | No ghost dismiss later | High |
| ACT-005c | New alert while old is showing | Fire 2 actions rapidly | New alert replaces old cleanly | High |
| ACT-005d | Alert during completion | Action at minute 23, complete at 24 | Alert shows before completion screen | Medium |

### ACT-006: Web Speech API Edge Cases

| Test ID | Scenario | Steps | Expected | Priority |
|---------|----------|-------|----------|----------|
| ACT-006a | No voices available | Mock empty voices array | Silent fallback, no error | High |
| ACT-006b | speechSynthesis.cancel() timing | Cancel immediately after speak | No partial audio | Medium |
| ACT-006c | Voice toggle during utterance | Toggle voice off mid-speech | Speech stops immediately | High |
| ACT-006d | iOS Safari auto-play restrictions | First voice without user gesture | May fail silently - test behavior | Critical |
| ACT-006e | Browser loses focus during speech | Switch apps mid-utterance | Speech may continue or stop | Low |

### ACT-007: Detail View Data Display

| Test ID | Description | Expected | Priority |
|---------|-------------|----------|----------|
| ACT-007a | All food emojis render | No missing emoji (fallback image) | Medium |
| ACT-007b | Long food names | Name doesn't overflow card | Medium |
| ACT-007c | Temperature display | Shows "°F" consistently | High |
| ACT-007d | Action preview format | Shows "@Xmin Action" format | High |
| ACT-007e | Pro tip display | Tip shows in distinct styling | Medium |

### ACT-008: Timer Completion Flow

| Test ID | Scenario | Steps | Expected | Priority |
|---------|----------|-------|----------|----------|
| ACT-008a | Timer hits exactly 0 | Watch for off-by-one errors | Shows 00:00, then DONE | High |
| ACT-008b | Completion voice timing | When exactly is "ready" spoken? | At 0 or slightly after | Medium |
| ACT-008c | "Cook Something Else" button | Click after completion | Returns to select, state fully reset | High |
| ACT-008d | Completion with voice off | Complete with voice disabled | Visual "DONE" only, no audio | High |
| ACT-008e | After instructions visibility | Check after-cooking phase | "After" instructions highlighted | High |

---

## Performance Benchmarks

### PB-001: Render Performance

| Metric | Target | Test Method |
|--------|--------|-------------|
| Initial load (dev) | < 1s | Chrome DevTools Performance |
| Initial load (prod) | < 500ms | Lighthouse |
| Food grid render (26 items) | < 50ms | React Profiler |
| Search filter response | < 16ms (60fps) | Input to render measurement |
| Timer tick update | < 5ms | Continuous profiling |
| Alert banner animation | 60fps | Animation inspector |

### PB-002: Memory Usage

| Scenario | Baseline | After 10min | After 30min |
|----------|----------|-------------|-------------|
| Idle on select screen | < 20MB | < 22MB | < 25MB |
| Timer running | < 25MB | < 28MB | < 30MB |
| Multiple start/stop cycles | Baseline | < 1.5x baseline | < 2x baseline |

---

## Automated Test Recommendations

### Unit Test Files to Create

```
tests/
├── utils/
│   ├── formatTime.test.js      # UT-001
│   ├── speech.test.js          # UT-003
│   └── constants.test.js       # UT-004
├── data/
│   └── foods.test.js           # UT-002, FD-001, FD-002, FD-003
├── components/
│   ├── FoodCard.test.jsx
│   ├── CategoryPills.test.jsx
│   ├── ProgressRing.test.jsx
│   ├── AlertBanner.test.jsx
│   └── InstructionsPanel.test.jsx
└── integration/
    ├── foodSelection.test.jsx   # IT-001
    ├── timerLifecycle.test.jsx  # IT-002
    ├── voiceAlerts.test.jsx     # IT-003
    └── midCookActions.test.jsx  # IT-004
```

### Recommended Testing Libraries

- **Vitest**: Fast unit testing for Vite projects
- **React Testing Library**: Component testing
- **MSW**: Mock Service Worker for API mocking (if needed)
- **Playwright**: E2E browser automation
- **axe-core**: Accessibility testing
- **web-audio-test-api**: For mocking Web Speech API

---

## Sign-Off Checklist

### QA Sign-Off (Quinn)
- [ ] All Critical tests passing
- [ ] All High priority tests passing
- [ ] 95%+ Medium priority tests passing
- [ ] Edge cases documented and tested
- [ ] No P0/P1 bugs open
- [ ] Performance within targets
- [ ] Accessibility basics verified

### Developer Sign-Off
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] No known regressions
- [ ] Code review completed

### Product Sign-Off
- [ ] UAT scenarios approved
- [ ] User flow validated
- [ ] Voice alerts work as expected
- [ ] All 26 foods verified

---

*This test plan was created by Quinn, your friendly neighborhood QA tester who loves finding bugs before users do! If it can break, I'll find it.*
