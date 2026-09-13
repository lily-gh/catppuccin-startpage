default:
    @just --list

install:
    cargo install catppuccin-whiskers

dev:
    python3 -m http.server 8000

build:
    whiskers templates/palette.tera
    just bundle

# Combine load-order-dependent scripts to reduce production requests.
bundle:
    cat src/common/palette.js src/common/utils.js src/common/storage.js src/common/actions.js src/common/config.js src/common/strftime.js src/common/theme.js src/common/component.js > src/common.bundle.js
    cat src/components/tabs/tabs.component.js src/components/weather/weather.api.js src/components/weather/weather.component.js src/components/clock/clock.component.js src/components/statusbar/statusbar.component.js src/components/search/search.component.js src/common/module.js > src/components.bundle.js

# Regenerate awoo.min.css from awoo-local.min.css by prepending the Google Fonts @import.
build-awoo:
    printf '@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700");\n' > src/css/awoo.min.css
    tail -n +2 src/css/awoo-local.min.css >> src/css/awoo.min.css
