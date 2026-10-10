<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the NEO FORM home experience at the index route and education plus inspiration exclusively at /neo-lab; home section links use typed route links with hashes so cross-page navigation reaches the right section.
- Render shared fixed navigation in the root layout so both pages use one menu and the same logo; section selections close the mobile menu and explicitly smooth-scroll with reduced-motion respected.
- Reuse one NEO LAB experience in the direct /neo-lab route and a conditionally mounted state-controlled modal opened by menu buttons without href; use Radix focus trapping, prevent-scroll focus restoration and body overflow locking/restoration so opening never navigates or moves the landing.
- Keep approved public copy in a separate browser-safe content module so presentation changes do not silently alter wording.
- Use semantic CSS tokens for light, ink and photographic sections; mobile layouts are the default and expand at desktop breakpoints.
- Use the embedded brief photograph for the team and generated editorial imagery elsewhere; do not represent generated images as verified completed projects.
- Keep fixed navigation outside isolated photographic sections so it stays above all sections; anchor offsets must account for the header height.

- Define shared editorial spacing and copy-width variables in global CSS so all sections scale consistently at mobile and desktop breakpoints.
- Express all public typography through shared role-size tokens and one font-family token, and apply safe-area-aware gutters to shared containers and modal controls so reading and navigation stay consistent across screen sizes.
- Bound mobile typography with container-relative sizes in the global stylesheet and use shrink-safe grids for mixed text/control rows to prevent narrow-screen clipping without viewport-font scaling.
- Use one scoped IntersectionObserver hook for one-time scroll reveals; keep SSR content visible, avoid nested animations, and honor reduced-motion and keyboard focus so animation never blocks reading or navigation.
- Keep NEO LAB (dark educational section with footage on top and data-driven accordions) and INSPIRACJE (light article grid) as separate sections on /neo-lab, each with its own browser-safe content module, so future footage, programs and articles can be added without restructuring the page.
- Keep contact location and company details in one browser-safe content module; render the map as a plain credential-free Google Maps iframe (no API key, no dynamic loader, no extra query parameters) at full width with a fixed 400px height and a grayscale(100%) filter, and show the address in its own block component below the map where the company registration details also render independently of the iframe.
- Serve every looping footage block (hero, NEO LAB) through an asset pointer with a photographic poster and isolate playback-preference handling in its own component so reduced-motion users retain a still background; NEO LAB is decorative full-width footage without native or custom controls.
- Compose NEO LAB introduction and footage in one content-sized, full-width banner with an absolute video layer and semantic dark overlay so copy stays readable without separating video and text.
- Keep the contact form as a client-only message handoff: open the configured Instagram profile on the user gesture, copy text when available and expose a manual-copy fallback; never transmit form data through URL parameters or claim delivery, because this is not a messaging API.
