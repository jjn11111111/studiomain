# Deploy / two-app setup

This workspace contains **two separate apps** that must not overwrite each other when pushing.

## 1. Vercel deployment (“studio main 1”) = **studiomain-app**

- **Repo:** `github.com/jjn11111111/studiomain`
- **Branch:** `master` (Vercel builds this)
- **App root:** `studiomain-app/` (exercises, practice, subscribe, auth, etc.)

**To deploy / push updates for the live site:**

```bash
cd studiomain-app
git add .
git commit -m "Your message"
git push origin main:master
```

**Do not** run `git push` from the workspace root when you intend to update the Vercel deployment. Pushing from the root used to overwrite this repo and break the deployment.

## 2. Root app (PinealVision) = **workspace root**

- **Intended repo:** a separate repo (e.g. `jjn11111111/pineal-vision`) so root and studiomain stay separate.
- **App root:** workspace root (`app/`, `lib/`, VideoPlayer, community, Stripe checkout, etc.)

**To keep them separate**, point the root’s `origin` at a different repo and use that for the root app only:

```bash
# From workspace root, one-time setup:
git remote set-url origin https://github.com/jjn11111111/pineal-vision.git
# (Create that repo on GitHub first if it doesn’t exist.)

# Then push the root app only to that repo:
git push -u origin master
```

## Summary

| App           | Directory       | Push from        | Remote / repo        |
|---------------|-----------------|------------------|----------------------|
| Studio Main 1 | `studiomain-app/` | `studiomain-app/` | `origin` → studiomain |
| Root app      | (workspace root) | root             | `origin` → pineal-vision (after setup) |

If in doubt: **deploying the finished app = always `cd studiomain-app` then push.**
