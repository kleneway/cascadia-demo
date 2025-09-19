# Prototype overview

This single-page prototype showcases how a QA manager could quickly see redundant tests, optimization opportunities, and the impact of accepting recommendations. The page opens with an empty state and a “Use sample suite” CTA that loads a mocked test suite, then reveals the core UX: summary metrics for redundancy, runtime reduction, cost savings, and flaky test count. An overlap matrix visualizes test coverage similarity; selecting a cell highlights a redundant pair/group. A recommendations table lists dedupe/refactor actions with confidence bars and estimated time saved. A details side panel provides rationale and actionable steps for each recommendation. An impact summary estimates before/after runtime and cost to demonstrate value instantly. No auth, uploads, or persistence; all data is mocked and interactions are client-side only.

## Checklist

### Atoms (UI primitives)

- [ ] Create Button atom (src/components/atoms/Button.tsx)
  - Variants: primary, secondary, ghost, destructive; sizes: sm, md; optional leading/trailing lucide-react icon; disabled state; full-width prop.
  - Tailwind: focus-visible ring, high-contrast colors for light/dark; no gradients; uses brand tokens.
  - TypeScript strict props; no any; export type ButtonVariant and ButtonSize unions.
- [ ] Story: Button (src/stories/Button.stories.tsx)

  - Default: primary, md, with onClick action logged.
  - Edge cases: disabled, long label wrapping, icon-only, full-width, destructive.
  - A11y: verifies focus-visible outline, role="button" semantics, keyboard activation via Enter/Space.

- [ ] Create Badge atom (src/components/atoms/Badge.tsx)
  - Tones: neutral, info, success, warning, danger; sizes: sm, md; optional dot; optional icon; pill or square corners.
  - Tailwind tokens; ensure contrast in dark mode.
- [ ] Story: Badge (src/stories/Badge.stories.tsx)

  - Default: tone variations with short labels.
  - Edge cases: long text truncation, with icon, dot only, pill vs square.
  - A11y: semantic span with aria-label for icon-only, contrast check.

- [ ] Create Card atom (src/components/atoms/Card.tsx)
  - Container with border, rounded, shadow-sm, padding variants (sm, md, lg); optional clickable state (hover, focus).
  - Slot-like children; optional aria role and selectable prop.
- [ ] Story: Card (src/stories/Card.stories.tsx)

  - Default: content with heading/body.
  - Edge cases: clickable variant, zero-padding content, long overflow content scroll.
  - A11y: keyboard focus for clickable, role semantics applied.

- [ ] Create ConfidenceBar atom (src/components/atoms/ConfidenceBar.tsx)
  - Props: value (0–100), labelVisible, min/max labels, color scale by threshold (0–49 danger, 50–74 warning, 75–100 success), aria-valuenow/min/max, tooltip title.
  - Clamps values; width animated via CSS transition.
- [ ] Story: ConfidenceBar (src/stories/ConfidenceBar.stories.tsx)

  - Default: 72% with label.
  - Edge cases: 0%, 50%, 100%, >100 clamped to 100 with note.
  - A11y: progressbar role, aria attributes verified.

- [ ] Create ToggleGroup atom (src/components/atoms/ToggleGroup.tsx)
  - Segmented control built from radio inputs; keyboard nav (arrow keys), focus ring, aria-role="radiogroup".
  - Props: options: {label, value, icon?}[], value, onChange, size (sm, md).
- [ ] Story: ToggleGroup (src/stories/ToggleGroup.stories.tsx)
  - Default: 3 options with controlled selection, action logged.
  - Edge cases: 1 option only, 6+ options wrapping on small width.
  - A11y: radiogroup and radio roles, keyboard navigation verified.

### Organisms (compositions with behavior/logic)

- [ ] Create HeaderBar organism (src/components/organisms/HeaderBar.tsx)
  - "use client"; props: onLoadSample, onReset; uses Button atom; includes title, subtitle, and contextual hint; lucide-react icon.
  - Shows toast.success on load, toast.info on reset.
- [ ] Story: HeaderBar (src/stories/HeaderBar.stories.tsx)

  - Default: visible actions; actions logged.
  - Edge cases: compact mode (narrow viewport), long title.
  - A11y: landmarks and heading hierarchy check.

- [ ] Create SummaryMetrics organism (src/components/organisms/SummaryMetrics.tsx)
  - Displays 4 Card items: Redundancy %, Predicted runtime reduction, Estimated monthly CI savings, Flaky tests count.
  - Uses lucide-react icons and Badge for deltas (e.g., -35% time).
  - Props typed: metrics object; responsive grid (1–4 cols).
- [ ] Story: SummaryMetrics (src/stories/SummaryMetrics.stories.tsx)

  - Default: realistic sample values.
  - Edge cases: zeros across, extreme high values, missing flaky count.
  - A11y: heading levels, numbers with aria-label for screen readers.

- [ ] Create OverlapMatrix organism (src/components/organisms/OverlapMatrix.tsx)
  - "use client"; props: testIds: string[], matrix: number[][] (0–100), onSelectPair(i, j).
  - Renders square grid heatmap (intensity by overlap); x/y labels sticky; diagonal muted; tooltip with pair + %; keyboard focus per cell; skip diagonal.
- [ ] Story: OverlapMatrix (src/stories/OverlapMatrix.stories.tsx)

  - Default: 5×5 sample; cell click action logged.
  - Edge cases: 2×2 minimal, 10×10 with scroll; dense high overlaps.
  - A11y: grid role, cell focusability, tooltip aria-describedby.

- [ ] Create RecommendationsTable organism (src/components/organisms/RecommendationsTable.tsx)
  - "use client"; props: rows [{ id, tests: string[], action: 'merge'|'remove'|'refactor', confidence: number, estMsSaved: number, flags: ('flaky'|'long-runner'|'critical')[] }]; filters via ToggleGroup; sort by confidence/time.
  - Renders table with sticky header; ConfidenceBar in cell; Badge for flags; onRowSelect callback; empty state message.
- [ ] Story: RecommendationsTable (src/stories/RecommendationsTable.stories.tsx)

  - Default: mixed actions and flags; row select action logged.
  - Edge cases: empty rows -> empty state; many rows with scrolling; all low confidence.
  - A11y: table semantics (thead/tbody/th scope), row selection via keyboard.

- [ ] Create ImpactSummary organism (src/components/organisms/ImpactSummary.tsx)
  - Visualizes before vs after runtime (minutes) and estimated monthly cost; stacked mini-bars with labels; notes assumptions.
  - Props: beforeMinutes, afterMinutes, monthlyCostBefore, monthlyCostAfter.
- [ ] Story: ImpactSummary (src/stories/ImpactSummary.stories.tsx)

  - Default: moderate savings.
  - Edge cases: no savings (equal values), dramatic savings (80%).
  - A11y: bars with aria-labels and text equivalents.

- [ ] Create DetailsPanel organism (src/components/organisms/DetailsPanel.tsx)
  - "use client"; right-side drawer overlay; props: open, onClose, group data: tests, overlap %, assertions overlap, suggested steps, risk level (Badge), potential savings.
  - Actions: Accept suggestion, Dismiss -> toast.success/toast.info; no persistence.
  - Trap focus, ESC to close; backdrop click closes.
- [ ] Story: DetailsPanel (src/stories/DetailsPanel.stories.tsx)

  - Default: open with realistic group details; actions logged.
  - Edge cases: many tests in group (scrollable list), very long step descriptions.
  - A11y: dialog role, aria-modal, labelledby/ describedby, focus trap.

- [ ] Create EmptyState organism (src/components/organisms/EmptyState.tsx)
  - "use client"; icon (lucide-react FileSearch), message and CTA "Use sample suite" (prop callback); secondary link "What we analyze" toggles helper text.
- [ ] Story: EmptyState (src/stories/EmptyState.stories.tsx)
  - Default: standard copy with action logged.
  - Edge cases: compact viewport, long localization string.
  - A11y: button/link roles, heading structure.

### Page (single page assembly and wiring)

- [ ] Implement prototype page (src/app/page.tsx)
  - "use client"; assemble: HeaderBar, EmptyState (pre-load), SummaryMetrics, OverlapMatrix, RecommendationsTable, ImpactSummary, DetailsPanel; include <ToastContainer />.
  - Local state: loaded (boolean), selectedPair (i,j), selectedGroupId; handlers wire organisms.
  - Load mock data via button (no upload); smooth section reveal with Tailwind transitions; responsive layout.
  - Accessibility: page landmarks, skip-to-content link, keyboard focus order.

### Sample data, types, and utilities

- [ ] Define shared types (src/lib/types.ts)
  - TestCase, RecommendationAction union, RecommendationRow, Metrics, Impact model, OverlapMatrix type; no enums, use unions.
- [ ] Add sample data (src/lib/sampleData/testSuiteSample.ts)
  - Export: testIds, overlapMatrix, recommendations rows, metrics, impact; realistic values aligned with idea narrative (30–50% redundancy).
- [ ] Shared utilities (src/lib/utils/shared.ts)
  - classNames helper, formatPercent, formatDurationMs, formatCurrency; unit-tested via quick inline type checks (no test framework setup added).

### Styling and design system alignment

- [ ] Extend Tailwind tokens (tailwind.config.ts)
  - Add/confirm brand semantic colors: primary, neutral, success, warning, danger; dark mode variants; avoid purple and gradients; keep accessible contrast.
- [ ] Responsive and dark mode polish
  - Ensure all atoms/organisms adapt from mobile → desktop; add dark: classes to backgrounds/borders/text; verify matrix and table scroll on small screens.
- [ ] Icon usage
  - Use lucide-react icons sized via Tailwind (h-4 w-4); ensure aria-hidden where decorative; alt text where needed.

### Storybook coverage (CSF3, docs, controls, a11y)

- [ ] Add autodocs + controls to all stories
  - Default export includes tags: ['autodocs']; args/argTypes for variant/size props; reference components via relative imports from component directories.
- [ ] Interactive stories with actions
  - Button, ToggleGroup, OverlapMatrix cell click, RecommendationsTable row select, DetailsPanel actions wired to Storybook actions for observability.
- [ ] A11y stories
  - Each story file includes an A11y scenario with keyboard tabbing notes and ARIA roles validated using the existing addon.

### QA, accessibility, and polish

- [ ] Keyboard navigation
  - Ensure tab order, Enter/Space activation on actionable elements; arrow-key navigation for ToggleGroup and grid cells in OverlapMatrix.
- [ ] ARIA and semantics
  - Roles: header/nav/main/section; table/cell/th scope; dialog semantics; progressbar attributes; label associations for toggles and controls.
- [ ] Visual states
  - Hover, focus-visible, active, disabled for all interactive atoms and organisms; add motion-reduce preference to transitions.
- [ ] Empty and error states
  - RecommendationsTable and OverlapMatrix graceful empty renders; helpful copy guiding user to “Use sample suite.”
- [ ] Dark mode verification
  - Confirm color tokens and text/background contrast meet WCAG AA in both modes.
