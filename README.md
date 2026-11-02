# SareeVira

Responsive React + Vite saree storefront with product galleries, customer accounts, WhatsApp enquiries, and a protected admin dashboard.

## Local setup

1. Install Node.js LTS.
2. Copy `.env.example` to `.env`.
3. Fill in the Supabase project URL and public anon/publishable key from **Supabase → Project Settings → API**. Keep `.env` private and never use a service-role key in the browser.
4. Install dependencies and run the app:

```powershell
npm install
npm run dev
```

## Supabase setup

1. Create a Supabase project and configure its Auth site URL and redirect URLs for your local and production domains.
2. Keep email confirmation enabled. Configure production email delivery before enabling customer sign-up.
3. In the Supabase SQL Editor, run `supabase/migrations/20261102220000_production_foundation.sql`.
4. Create the administrator account using the customer sign-up form with **`sujalkalamkar2234@gmail.com`**, then confirm the email. Alternatively, create that confirmed user in Supabase Auth.
5. Promote only that confirmed account in the SQL Editor:

   ```sql
   update public.profiles
   set role = 'admin'
   where lower(email) = 'sujalkalamkar2234@gmail.com'
     and id in (
       select id
       from auth.users
       where lower(email) = 'sujalkalamkar2234@gmail.com'
         and email_confirmed_at is not null
     );
   ```

   Verify that exactly one row was updated. The database policy also checks this fixed email; customer signup cannot assign an administrator role.
6. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_EMAIL`, and `VITE_WHATSAPP_NUMBER` in the hosting provider's environment settings, then rebuild and deploy.
7. Test a customer sign-up, email confirmation, sign-in, password reset, product enquiry, WhatsApp handoff, and admin sign-in on the deployed domain.

The administrator login ID is **`sujalkalamkar2234@gmail.com`**. No password is embedded or pre-created in this project. Set a strong password during account creation and store it in a password manager.

## Current scope

- Customer email/password accounts use Supabase Auth. Profiles are protected by row-level security.
- Product and storefront content are saved in the single `store_content` row. Enquiries are stored in `enquiries` and visible only to the administrator.
- Product photography uses the configured demo image URLs with a local illustrated fallback at `/saree-placeholder.svg`.
- Wishlists are stored in the current browser. Orders, payments, shipping-address management, image uploads, and production product inventory are not implemented.

Do not describe the site as production-connected until the Supabase project is configured, the migration is applied, the administrator is provisioned, and the deployed flows have been tested.
