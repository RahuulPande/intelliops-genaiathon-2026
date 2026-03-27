#!/usr/bin/env bash
#
# build-demo.sh — Export a clean demo-only build of IntelliOps AI
#
# Creates a production-ready build that includes ONLY demo-accessible
# features (L1 Delivery Intelligence). Strips dev-only components,
# admin-only layers, and unnecessary mock data.
#
# Usage:
#   ./scripts/build-demo.sh [output-dir]
#
# Default output: ./demo-export/
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUTPUT_DIR="${1:-$PROJECT_ROOT/demo-export}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info()  { echo -e "${BLUE}[INFO]${NC}  $1"; }
log_ok()    { echo -e "${GREEN}[OK]${NC}    $1"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC}  $1"; }
log_err()   { echo -e "${RED}[ERROR]${NC} $1"; }

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║     IntelliOps AI — Demo Export Builder          ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# ── Step 1: Validate project structure ──────────────────

log_info "Validating project structure..."

if [ ! -f "$PROJECT_ROOT/package.json" ]; then
  log_err "package.json not found. Run from the project root."
  exit 1
fi

if [ ! -d "$PROJECT_ROOT/src" ]; then
  log_err "src/ directory not found."
  exit 1
fi

log_ok "Project structure validated"

# ── Step 2: Clean previous export ───────────────────────

if [ -d "$OUTPUT_DIR" ]; then
  log_warn "Removing previous export at $OUTPUT_DIR"
  rm -rf "$OUTPUT_DIR"
fi

mkdir -p "$OUTPUT_DIR"
log_ok "Export directory created: $OUTPUT_DIR"

# ── Step 3: Copy core project files ────────────────────

log_info "Copying core project files..."

# Copy config files
for f in package.json package-lock.json tsconfig.json next.config.ts \
         tailwind.config.ts postcss.config.mjs next-env.d.ts .gitignore; do
  if [ -f "$PROJECT_ROOT/$f" ]; then
    cp "$PROJECT_ROOT/$f" "$OUTPUT_DIR/"
  fi
done

# Copy public assets
if [ -d "$PROJECT_ROOT/public" ]; then
  cp -r "$PROJECT_ROOT/public" "$OUTPUT_DIR/public"
  log_ok "Public assets copied"
fi

# ── Step 4: Copy source with selective exclusion ───────

log_info "Copying source files (excluding admin-only layers)..."

# Create source directory structure
mkdir -p "$OUTPUT_DIR/src"

# Copy entire src first
cp -r "$PROJECT_ROOT/src/"* "$OUTPUT_DIR/src/"

# Remove admin-only / dev-only component directories
ADMIN_ONLY_DIRS=(
  "src/components/plan-intelligence"
  "src/components/build-intelligence"
  "src/components/learn-intelligence"
  "src/components/service-intelligence"
  "src/components/operations"
)

for dir in "${ADMIN_ONLY_DIRS[@]}"; do
  if [ -d "$OUTPUT_DIR/$dir" ]; then
    rm -rf "$OUTPUT_DIR/$dir"
    log_info "  Excluded: $dir"
  fi
done

log_ok "Source files copied with admin-only layers excluded"

# ── Step 5: Copy scripts ──────────────────────────────

mkdir -p "$OUTPUT_DIR/scripts"
cp "$SCRIPT_DIR/build-demo.sh" "$OUTPUT_DIR/scripts/" 2>/dev/null || true
cp "$SCRIPT_DIR/verify-demo.sh" "$OUTPUT_DIR/scripts/" 2>/dev/null || true
log_ok "Scripts copied"

# ── Step 6: Generate demo-specific .env ────────────────

log_info "Generating demo environment config..."

cat > "$OUTPUT_DIR/.env.local" << 'ENVEOF'
# IntelliOps AI — Demo Mode Configuration
# This build is configured for demo-only access (L1 Delivery Intelligence)
NEXT_PUBLIC_APP_MODE=demo
NEXT_PUBLIC_APP_VERSION=4.0.0-demo
ENVEOF

log_ok "Demo .env.local generated"

# ── Step 7: Summary ────────────────────────────────────

TOTAL_FILES=$(find "$OUTPUT_DIR" -type f | wc -l | tr -d ' ')
TOTAL_SIZE=$(du -sh "$OUTPUT_DIR" | awk '{print $1}')

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║              Export Complete                      ║"
echo "╠══════════════════════════════════════════════════╣"
printf "║  Output:  %-39s║\n" "$OUTPUT_DIR"
printf "║  Files:   %-39s║\n" "$TOTAL_FILES"
printf "║  Size:    %-39s║\n" "$TOTAL_SIZE"
echo "╠══════════════════════════════════════════════════╣"
echo "║  Next steps:                                     ║"
echo "║    cd demo-export && npm install && npm run dev   ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

log_ok "Demo export ready for hackathon deployment"
