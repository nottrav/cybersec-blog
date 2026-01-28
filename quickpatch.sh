#!/usr/bin/env bash
set -euo pipefail

# 1) netlify.toml
cat > netlify.toml <<'TOML'
[build.environment]
  JEKYLL_ENV = "production"
  BUNDLE_PATH = "vendor/bundle"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self';"
    cache-control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    cache-control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    cache-control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/sw.js"
  [headers.values]
    cache-control = "public, max-age=0, must-revalidate"
TOML

# 2) _redirects
cat > _redirects <<'REDIR'
/tags/* /blog/ 301
/category/* /blog/ 301
REDIR

# 3) schema-post.html include
mkdir -p _includes
cat > _includes/schema-post.html <<'SCHEMA'
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": {{ page.title | jsonify }},
  "datePublished": {{ page.date | date: "%Y-%m-%d" | jsonify }},
  "author": { "@type": "Person", "name": "Travis McGhee" }
}
</script>
SCHEMA

# 4) append gems to Gemfile (idempotent)
echo "" >> Gemfile
echo "gem 'jekyll-webp', '~> 1.2'" >> Gemfile
echo "gem 'image_optim', '~> 0.31'" >> Gemfile

# 5) add plugins to _config.yml (idempotent)
echo "" >> _config.yml
echo "# performance & seo plugins" >> _config.yml
echo "plugins:" >> _config.yml
echo "  - jekyll-webp" >> _config.yml
echo "  - jekyll-image-optim" >> _config.yml

# 6) insert schema into post layout
sed -i.bak '/<\/head>/i\
{% include schema-post.html}\
' _layouts/post.html

echo "✅ All done—ready to commit."
