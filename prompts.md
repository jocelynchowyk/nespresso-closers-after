# Prompts Log — Nespresso Singapore Storefront (`nespresso-closers-after`)

Repository: `https://github.com/jocelynchowyk/nespresso-closers-after.git`

This document records the chronological prompts used to build, iterate on, and instrument this Nespresso Singapore e-commerce web application.

---

## Prompt History

1. **Initial Swarovski CitiZ Platinum Replication**
   > Replicate `https://www.nespresso.com/sg/en/order/machines/original/swarovski-citiz-platinum` and replace completely on GitHub.

2. **GitHub Push Setup**
   > Push the updated project to `https://github.com/jocelynchowyk/nespresso-closers-after.git`.

3. **Storefront & Shine Bundle Replication**
   > Replicate `https://nespresso-improved.vercel.app/`.
   - Implemented the full Nespresso Singapore storefront (`HomeView`) and dedicated Nespresso × Swarovski Shine Bundle PDP (`SwarovskiPdpView`), including category filtering, search, cart drawer, machine comparison modal, extraction profile explorer, and Singapore boutique selector.

4. **Account, Loyalty & Conversion Enhancements**
   > - Add a user button on the header to indicate that the customer has logged in.
   > - Add membership status below the menu. Let it be a progress bar concept, showing the customer is `$100` away from the next membership tier.
   > - Add a countdown timer for promotion right below the price.
   > - Add customer reviews `4 out of 5` stars indication.

5. **Countdown Visibility**
   > Make countdown more obvious.
   - Added high-contrast 4-tile `DAYS / HRS / MIN / SEC` countdown blocks in the Hero and PDP and compact live-ticking countdown bars on catalog product cards.

6. **Social Proof & Low-Stock Messaging**
   > - Add a line to say something like join the 1000 that have purchased.
   > - Add a block to say limited quantities available or stock is low.
   - Added `"Join the 1,000+ coffee lovers in Singapore who have already purchased..."` social proof messaging and prominent `"Limited Quantities Available · Stock is Low"` blocks across the storefront and PDP.

7. **GitHub Overwrite & Push**
   > Overwrite and push to GitHub repo `nespresso-closers-after`.

8. **Microsoft Clarity Analytics Integration**
   > Embed Microsoft Clarity to this webpage using tracking ID `zfzurxp5nu` in `index.html`.

9. **GitHub Sync**
   > Push to GitHub.

10. **Documentation Update**
    > Update `prompts.md`.
