import { adminLoginEmail, supabase } from "./supabase";

const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, phone, role, created_at")
    .eq("id", userId)
    .single();

  if (error) throw new Error(`Could not load your account profile: ${error.message}`);
  return data;
};

export async function authenticate({
  role,
  mode,
  email,
  password,
  fullName,
  phone
}) {
  if (!supabase) {
    throw new Error("Account sign-in is unavailable until Supabase is configured.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (role === "admin" && adminLoginEmail && normalizedEmail !== adminLoginEmail) {
    throw new Error("This email is not the configured administrator account.");
  }

  if (mode === "signup") {
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          phone: phone.trim()
        },
        emailRedirectTo: window.location.origin
      }
    });

    if (error) throw new Error(error.message);
    if (!data.session || !data.user) {
      return { requiresEmailVerification: true };
    }

    const profile = await getProfile(data.user.id);
    if (profile.role !== "customer") {
      await supabase.auth.signOut();
      throw new Error("This email is reserved for administrator sign-in.");
    }
    return { profile };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password
  });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("Sign-in did not return an account.");

  const profile = await getProfile(data.user.id);
  if (profile.role !== role) {
    await supabase.auth.signOut();
    throw new Error(
      role === "admin"
        ? "This account does not have administrator access."
        : "Please use the administrator sign-in for this account."
    );
  }
  if (role === "admin" && profile.email.toLowerCase() !== adminLoginEmail) {
    await supabase.auth.signOut();
    throw new Error("This email is not the configured administrator account.");
  }

  return { profile };
}

export async function sendPasswordReset(email) {
  if (!supabase) {
    throw new Error("Password reset is unavailable until Supabase is configured.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
    redirectTo: `${window.location.origin}/`
  });
  if (error) throw new Error(error.message);
}

export async function updatePassword(password) {
  if (!supabase) {
    throw new Error("Password updates are unavailable until Supabase is configured.");
  }
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error(error.message);
}
