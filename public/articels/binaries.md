# CLI

<hr style="border: 1px solid #1eadef;margin: 1rem 0">

**Commandos**

The Project contains mulitple binaries written in GoLang. <br>
All located in **bin** folder in Demo Project. <br>
Every script should be executed from root Folder.

**Update**
<p>
Updated the Submodules, currently baseline or Storefront only.
</p>


    go run bin/update.go

**Custom**
<p>
Copies the baseline into storefront folder.
</p>

    go run bin/custom.go

**Schema**
<p>
Generate the Schema from Plugins and Custom for pocketbase-schema.json
</p>

    go run bin/schema.go

---

# CLI

<hr style="border: 1px solid #1eadef;margin: 1rem 0">

**Translations**
<p>
Collects the Translations from <b>custom</b> and also from <b>plugins</b>
</p>

    go run bin/translations.go

**Plugins**
<p>
Downloads the plugins and install them into Storefront. <br>
Resolves also the dependencies from plugin.json
</p>

    go run bin/plugins.go

**Checks**
<p>
Makes an audit for all Plugins, which contains currently only translations, line checks for pages and components.
</p>

    go run bin/checks.go
