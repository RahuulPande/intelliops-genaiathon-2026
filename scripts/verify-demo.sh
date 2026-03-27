#!/usr/bin/env bash
#
# verify-demo.sh — Verify the IntelliOps AI demo build integrity
#
# Checks that the demo export or current codebase is correct:
#   1. Required files exist
#   2. No admin-only content leaks into demo sidebar
#   3. TypeScript compiles cleanly
#   4. Demo credentials are present
#   5. Locked sections are properly guarded
#
# Usage:
#   ./scripts/verify-demo.sh [target-dir]
#
# Default target: current project root
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${1:-$(cd "$SCRIPT_DIR/.." && pwd)}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS_COUNT=0
FAIL_COUNT=0
WARN_COUNT=0

pass() { PASS_COUNT=$((PASS_COUNT + 1)); echo -e "  ${GREEN}✓${NC} $1"; }
fail() { FAIL_COUNT=$((FAIL_COUNT + 1)); echo -e "  ${RED}✗${NC} $1"; }
warn() { WARN_COUNT=$((WARN_COUNT + 1)); echo -e "  ${YELLOW}⚠${NC} $1"; }

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║     IntelliOps AI — Demo Verification            ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "Target: $TARGET_DIR"
echo ""

# ── Check 1: Required files ────────────────────────────

echo -e "${BLUE}[1/6] Required files${NC}"

REQUIRED_FILES=(
  "package.json"
  "tsconfig.json"
  "src/app/page.tsx"
  "src/components/layouts/Sidebar.tsx"
  "src/context/AuthContext.tsx"
  "src/lib/auth.ts"
  "src/components/landing-page/LandingPage.tsx"
  "src/components/sections/IntelligentTestQualitySection.tsx"
  "src/components/sections/ReleaseManagementSection.tsx"
  "src/components/sections/ApplicationKnowledgeBaseSection.tsx"
  "src/components/sections/TechnicalDocsSection.tsx"
  "src/components/sections/SettingsSection.tsx"
)

for f in "${REQUIRED_FILES[@]}"; do
  if [ -f "$TARGET_DIR/$f" ]; then
    pass "$f exists"
  else
    fail "$f MISSING"
  fi
done

# ── Check 2: Demo sidebar hides locked layers ─────────

echo ""
echo -e "${BLUE}[2/6] Demo sidebar configuration${NC}"

SIDEBAR_FILE="$TARGET_DIR/src/components/layouts/Sidebar.tsx"
if [ -f "$SIDEBAR_FILE" ]; then
  # Check that demoNavigationGroups exists
  if grep -q "demoNavigationGroups" "$SIDEBAR_FILE"; then
    pass "demoNavigationGroups defined in Sidebar.tsx"
  else
    fail "demoNavigationGroups NOT found — locked layers may still be visible in demo mode"
  fi

  # Check that demoBottomSections exists
  if grep -q "demoBottomSections" "$SIDEBAR_FILE"; then
    pass "demoBottomSections defined in Sidebar.tsx"
  else
    fail "demoBottomSections NOT found — service-intelligence may leak into demo sidebar"
  fi

  # Check conditional rendering
  if grep -q "isAdmin ? navigationGroups : demoNavigationGroups" "$SIDEBAR_FILE"; then
    pass "Conditional group rendering uses isAdmin toggle"
  else
    fail "Sidebar does not conditionally switch navigation groups by role"
  fi

  # Check that demo groups contain only delivery intelligence sections
  if grep -q "test-quality-intelligence" "$SIDEBAR_FILE" && \
     grep -q "release-intelligence" "$SIDEBAR_FILE" && \
     grep -q "knowledge-base" "$SIDEBAR_FILE"; then
    pass "Demo sidebar includes all three L1 sections"
  else
    fail "Demo sidebar missing one or more L1 sections"
  fi
else
  fail "Sidebar.tsx not found"
fi

# ── Check 3: Route guard ──────────────────────────────

echo ""
echo -e "${BLUE}[3/6] Route guard for demo users${NC}"

PAGE_FILE="$TARGET_DIR/src/app/page.tsx"
if [ -f "$PAGE_FILE" ]; then
  if grep -q "lockedSections.has(currentSection)" "$PAGE_FILE"; then
    pass "Route guard checks lockedSections for current section"
  else
    fail "No route guard found in page.tsx for demo users"
  fi

  if grep -q "platform-overview" "$PAGE_FILE"; then
    pass "Fallback to platform-overview exists"
  else
    warn "Cannot confirm fallback redirect target"
  fi
else
  fail "page.tsx not found"
fi

# ── Check 4: Demo credentials ─────────────────────────

echo ""
echo -e "${BLUE}[4/6] Authentication configuration${NC}"

AUTH_FILE="$TARGET_DIR/src/lib/auth.ts"
if [ -f "$AUTH_FILE" ]; then
  if grep -q "admin" "$AUTH_FILE"; then
    pass "Demo user credentials present"
  else
    fail "Demo credentials missing from auth.ts"
  fi
else
  fail "auth.ts not found"
fi

AUTH_CONTEXT="$TARGET_DIR/src/context/AuthContext.tsx"
if [ -f "$AUTH_CONTEXT" ]; then
  if grep -q "isAdmin" "$AUTH_CONTEXT"; then
    pass "isAdmin role check in AuthContext"
  else
    fail "isAdmin not found in AuthContext"
  fi
else
  fail "AuthContext.tsx not found"
fi

# ── Check 5: Landing page cleanup ─────────────────────

echo ""
echo -e "${BLUE}[5/6] Landing page configuration${NC}"

ROADMAP_FILE="$TARGET_DIR/src/components/landing-page/redesign/ProductRoadmapSection.tsx"
if [ -f "$ROADMAP_FILE" ]; then
  # Check that L3 is conditionally rendered
  if grep -q "isAdmin &&" "$ROADMAP_FILE"; then
    pass "L3 Enterprise Intelligence conditionally rendered (admin only)"
  else
    warn "L3 card may still be visible to demo users"
  fi
else
  warn "ProductRoadmapSection.tsx not found (may be in different location)"
fi

# ── Check 6: TypeScript compilation ────────────────────

echo ""
echo -e "${BLUE}[6/6] TypeScript compilation${NC}"

if command -v npx &> /dev/null; then
  cd "$TARGET_DIR"
  if npx --no-install tsc --noEmit 2>&1; then
    pass "TypeScript compiles with zero errors"
  else
    fail "TypeScript compilation failed"
  fi
else
  warn "npx not available — skipping TypeScript check"
fi

# ── Summary ────────────────────────────────────────────

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║              Verification Summary                ║"
echo "╠══════════════════════════════════════════════════╣"
printf "║  ${GREEN}Passed:${NC}  %-38s║\n" "$PASS_COUNT"
printf "║  ${RED}Failed:${NC}  %-38s║\n" "$FAIL_COUNT"
printf "║  ${YELLOW}Warnings:${NC} %-37s║\n" "$WARN_COUNT"
echo "╠══════════════════════════════════════════════════╣"

if [ "$FAIL_COUNT" -eq 0 ]; then
  echo -e "║  ${GREEN}Result: ALL CHECKS PASSED${NC}                       ║"
  echo "╚══════════════════════════════════════════════════╝"
  echo ""
  exit 0
else
  echo -e "║  ${RED}Result: $FAIL_COUNT CHECK(S) FAILED${NC}                        ║"
  echo "╚══════════════════════════════════════════════════╝"
  echo ""
  exit 1
fi
