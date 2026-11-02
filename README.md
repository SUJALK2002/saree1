# SareeVira — Saree Boutique Starter

A React + Vite frontend starter for a premium saree catalogue with a spacious cream/lavender aesthetic, animated cards, wishlist interaction, and WhatsApp enquiry links.

## Run locally

1. Install Node.js (LTS).
2. Extract this folder.
3. Run:

```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, copy `.env.example` to `.env` manually if `cp` is unavailable.

## Important status

This is a **frontend starter/demo**, not a production-ready store yet:
- Product cards currently use demo data.
- Saree enquiries ask for a name and phone number, open WhatsApp with the saree details, and appear in the admin leads dashboard.
- Site settings, products, and enquiries are stored in the current browser's local storage; they are not shared across devices or browsers.
- The “Admin Demo” panel updates this browser's local data only; Supabase database and authentication are not connected.
- Supabase environment variables are prepared, but database/auth/storage CRUD is not wired.
- The demo WhatsApp number is a placeholder; update it in Admin → Store & Contact Info.
- Replace demo images with owned/licensed saree photography.

## Next implementation steps

1. Create a Supabase project.
2. Create `sarees`, `saree_images`, `categories`, `enquiries`, `admin_profiles`, and `website_settings` tables.
3. Add strict RLS policies and Storage policies.
4. Connect product queries and image uploads to Supabase.
5. Implement secure admin login and protected admin routes.
6. Replace the demo admin panel with a full admin dashboard.
7. Test the public catalogue and enquiry process before launch.

Never put a Supabase service-role key in a Vite frontend. Use only the public anon/publishable key in client code and enforce permissions with RLS.
