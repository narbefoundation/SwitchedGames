# Changelog

## 2026-10-19 - Use the shared Mini Golf thumbnail

- Point the Mini Golf card and Details dialog to the canonical Benny’s Hub thumbnail at https://narbehouse.github.io/bennyshub/images/games/narbeminigolf.png. Future replacements of that image now carry through to SwitchedGames.
- Remove the unused local Mini Golf image and describe the three themed 18-hole courses (54 holes).
- Files: index.html, images/games/narbeminigolf.png (removed), and CHANGELOG.md. Web-only catalog correction; no Electron port required. The PC Hub already has the matching offline thumbnail.
- Verification: card and Details popup render the canonical 1366 × 768 image with no browser errors; all 30 game entries, links and feature flags are preserved.

## 2026-10-17 - Sphere Splash is a new concept

- Mark Sphere Splash as a new concept, as clarified by the owner. Its card shows NEW CONCEPT, the New concepts filter includes it, and Details uses the same classification.
- Files: index.html and CHANGELOG.md. Validation: all 30 games are preserved; the concept filter data now contains Sphere Splash, Ballista and Fish Mystery.

## 2026-10-17 - Sphere Splash and approved game publication

- Publish Sphere Splash and the pending Chasing Rainbows listing after the updated games are available in Benny's Hub. This approval supersedes the local-only status below.
- Add Sphere Splash with a new 1920 x 1080 gameplay screenshot and credit to Bryan R. (Ben's other big brother), working in collaboration with NARBE LLC. The catalog contains 30 games, including 10 Sports and 9 Strategy & Board games.
- Keep the README focused on the catalog. Detailed game documentation, licensing and credits stay in the hosted game folders; card and Details credits remain available.
- Files: index.html, images/games/bennyspheresplash-20261017.png, README.md and CHANGELOG.md.
- Validation: 19 combined browser checks pass for listings, screenshot loading, credits, launch links, favorites, category filters, mobile layout and NARBE House launch buttons. No missing local listing assets or SwitchedGames JavaScript errors.

## 2026-10-17 — Chasing Rainbows (LOCAL ONLY)

- Add Chasing Rainbows to the catalog with its canonical Benny’s Hub game link, existing hosted thumbnail, four-mode description, Strategy & Board category and local multiplayer flag. Catalog: 29 games; Strategy & Board: 8.
- Use Inclusive Imagination®’s exact requested game, artwork, copyright and NARBE House adaptation credits, home URL and social handle in the Details dialog and README.
- Files: index.html, README.md and CHANGELOG.md. The signed form and private rights records are excluded. No game assets are copied into this repository.
- Validation: headless catalog checks pass for all 29 cards, search, multiplayer filtering, required credits, creator and game links, and favorites. No real-browser visual check was run.
- Prepared locally only; the owner will publish from the website workspace after the updated game is ready.


## 2026-10-13 — Updated SwitchedGames branding (WEB-ONLY)

- Use the owner-supplied switchedgames-logo.svg and .png throughout the headers, footers, favicons, social preview, and game-art fallback. Add the missing favicon to Our Story.
- Match the opening animation to the 1000×632 artwork: touching halves, larger centered circles, updated colors and button-swap distances. Hide the recessed seats after landing and match the final flight to the new header proportions.
- Files: index.html, aboutus.html, privacy.html, terms.html, crypto-statement/index.html, showcase.css, showcase.js, the supplied images/branding/switchedgames-logo.* replacements, and CHANGELOG.md.
- Validation: browser checks cover first visit, replay, the assembled mark and header docking at 1366×900, 390×844, and 844×390, reduced motion, all five page favicons, social image and game-art fallback. No local asset failures or page errors. Screenshots and verification notes: ../tmp/switchedgames-logo-20261013/.
- Related logo references and legacy SVG copies are updated in NARBE House and NARBE Foundation. The owner approved publishing this reviewed logo refresh on 2026-10-13.

## 2026-10-13 — Add Pet Pals and Magic Button (WEB-ONLY)

- Owner approved publication after local preparation and review. Publish the NARBE House game files before these listings.
- Add NARBE Pet Pals and NARBE Magic Button as the first two New Game cards, using their existing artwork and canonical Benny's Hub URLs. The catalog now contains 28 games.
- Add Simulation for Pet Pals and include Magic Button in Cause & Effect (four games). Preserve existing multiplayer, editor and new-concept flags.
- Files: index.html, showcase.js, images/games/narbepetpals.png, images/games/narbemagicbutton.png and CHANGELOG.md. No Electron changes.
- Validation: the combined import passes 38 browser checks, including game play, saving, mobile layouts, catalog search/filters/details/images and NARBE House iframe launch buttons. All 257 NARBE House release tests, the build, audit and 1,078 link checks pass.

## 2026-10-12 — Correct multiplayer and editor filters (WEB-ONLY)

- Audit feature flags for all 26 games against the currently published game sources (NARBE House commit 1a8433ca420ef20c704967d1ffa96239d3337819), including real menu actions and editor entry points.
- Add Matchy Match, Connect Four, Battle Boats, and Dice to Multiplayer. The filter now includes 10 games and includes local competitive, cooperative, and shared-screen play.
- Add Word Jumble, Elouise’s Word Search, and Show n Sound to Game editor, bringing it to 8 games with user-facing editors. Per the owner’s clarification, Fish Mystery remains in the collection but its internal story/chart tool is excluded from this filter. Planned editors and name/settings editing do not count.
- Only catalog flags change; all game descriptions, launch URLs, credits, game runtimes, and filter behavior remain unchanged. Files: index.html and CHANGELOG.md. No Electron port.
- Validation: check both full result sets against the audited lists, their two-game intersection, combined genre/search filters, and catalog field preservation; verify the published catalog after release.

## 2026-10-12 — Showcase publication approved (WEB-ONLY)

- The owner approved publishing the reviewed showcase redesign, including the refined logo intro, family story layout, public partnership links, and supporting-page styling. This supersedes the local-review restrictions on the entries below.
- Publish through the existing GitHub Pages main-branch workflow at https://switchedgames.org/. Preserve the previous site at commit 6839365a5ae17103a3673a7202594b68825215bb under the pre-showcase-2026-10-12 tag, in addition to the verified ZIP backup.
- Existing validation covers 26 preserved game URLs, filtering/favorites/details, responsive docking geometry and intro lifecycle, supporting-page content/links, and local HTTP responses. No game-runtime, Foundation-site, or Benny’s Hub changes are included in this publication.

## 2026-10-12 — Supporting pages match the showcase (LOCAL REVIEW)

- Restyle Privacy Policy, Terms of Use, and the official cryptocurrency statement with the shared showcase header, dark palette, orange/blue accents, compact policy navigation, readable content widths, and matching footers. Add a sticky desktop contents menu with a stacked mobile layout and retain print styling.
- Update the SwitchedGames statement dialog colors, typography, backdrop, and button styling; preserve its content, session dismissal, focus handling, and other behavior.
- Preserve all policy/statement wording and dates. Privacy and Terms continue to use device fonts and load no scripts or external font services.
- Validation: original section text, headings and dates compared exactly; local links/anchors/assets, CSS parsing and dialog JavaScript syntax verified. Preview endpoints checked. No browser was available for visual QA.
- Files: privacy.html, terms.html, legal.css, crypto-statement/index.html, crypto-statement/modal.js, CHANGELOG.md. Local preview only; original/published site is unchanged.

## 2026-10-12 — Visible logo docking and family story layout (LOCAL REVIEW)

- Separate the logo’s final flight from the assembly animation. Keep it opaque through an 800ms movement to the header, measure the destination at takeoff, and remove the overlay only after the flight completes. Match the visible SVG bounds and preserve replay, audio, reduced-motion behavior, and original notice startup.
- Show the complete family photo inside its frame on aboutus.html, replacing the cropped cover layout with contain sizing. Reduce the gap between the partnership note and the opening family paragraph to 20–24px.
- Validation: JavaScript syntax, 20 existing DOM checks, and a docking regression check covering fresh responsive geometry, actual animation completion, replay, and delayed startup. Visual browser QA remains unavailable; changes are local to the preview.

## 2026-10-12 — Larger, more dramatic logo intro (LOCAL REVIEW)

- Increase the assembled emblem from 180px to a responsive maximum of 420px. Its size also adapts to short and narrow screens.
- Extend the sequence to 3 seconds: accelerating entrance, impact/rebound, flush buttons that lift out of recessed seats and swap with staggered coin flips on overhead arcs, a settled hold, then docking at the actual header logo.
- Synchronize the mechanical clicks with the collision and each button landing. Preserve replay, silent autoplay fallback, and reduced-motion behavior.
- Change the lead headline to “Fun games. More ways to play.” and link prominent partnership calls to action on the home and story pages directly to the verified, now-public collaboration form.
- Files: showcase.css, showcase.js, index.html and aboutus.html. The original/published site is unchanged.
- Validation: JavaScript syntax, 20 DOM integration checks, intro lifecycle/hold/replay checks, and live local preview asset responses. Visual browser QA was unavailable in this session.


## 2026-10-12 — Game showcase preview (WEB-ONLY, LOCAL REVIEW)

- Preserve the live-site baseline at commit 6839365 on main. Work is isolated on showcase-redesign in ../tmp/switchedgames-showcase; no redesign changes are pushed.
- Backup: F:/PROJECT FILES/WEBSITES/Website Backups/SwitchedGames-before-showcase-2026-10-12/switchedgames-6839365.zip.
- Replace the homepage layout with a compact gameplay-video carousel, arcade sidebar, category/search filters, verified multiplayer/editor filters, new-concept toggle, sorting, browser-local favorites/history, and game detail dialogs. All 26 launch URLs, descriptions, concept notes, and collaborator credits are preserved.
- Add a short two-part emblem introduction, swapping colored centers, mechanical click audio when allowed, replay with sound, reduced-motion fallback, and a transition toward the header mark.
- Retain all switch, audience, kit, collaboration, donation, partner, official-statement, and legal content. Existing support sections are expandable. The official statement retains its session behavior after the intro. Givebutter loads on expanding its section.
- Restyle aboutus.html and retain its full family story and Foundation/LLC distinction. Update privacy.html to describe new browser-local data and deferred donation-widget loading.
- Files: index.html, aboutus.html, privacy.html, showcase.css, showcase.js, story.css, images/branding/family.png, images/games/*, and this changelog. No game-runtime or Electron changes.
- Validation: 20 DOM integration checks passed, plus intro lifecycle/audio-fallback checks, JavaScript syntax checks, local asset and content-preservation checks, and HTTP 200/206 preview/video checks. Visual browser QA was unavailable in this session.


## 2026-10-10 — Publication approved (WEB-ONLY)

- After reviewing the draft and its limitations, the owner instructed "ok push". This supersedes the initial local-only restriction below.
- Publish the current generic notices with the confirmed NARBE LLC operator and narbehousellc@gmail.com request address. Provider/form settings and legal applicability remain follow-up items; no tracking or game behavior changes.

## 2026-10-10 — Privacy, terms and footer links (WEB-ONLY)

- Add privacy.html, terms.html and legal.css: accessible standalone legal pages with separate SwitchedGames scope and no embedded third-party services.
- Add Privacy Policy and Terms of Use links to index.html, aboutus.html and crypto-statement/index.html, retaining existing footer destinations.
- Analytics, donation loading, notice behavior and game links remain unchanged. Align publisher metadata with the owner-confirmed NARBE LLC operator; retain the Foundation support/program distinction.
- Use owner-confirmed narbehousellc@gmail.com for privacy/deletion requests; keep unverified form details generic.
- Local review only; no push or deployment. Factual, consent, contributor-permission and legal review is required before publication.
- Dated, hash-verified originals, research and validation: F:/PROJECT FILES/WEBSITES/Website Backups/SwitchedGames-legal-2026-10-10-1791679705308.
- This CHANGELOG.md records all seven changed/added SwitchedGames files. No Electron port.
