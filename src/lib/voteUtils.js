import { supabase } from "@/lib/supabaseClient";

/**
 * Toggles upvote for a record in Supabase and localStorage.
 * @param {string} table - Supabase table name ("posts" or "comments")
 * @param {string} id - Row ID
 * @returns {Promise<{ success: boolean }>}
 */
export async function toggleVote(table, id) {
  const key = `voted_${table}`;
  const voted = JSON.parse(localStorage.getItem(key) || "[]");
  const hasVoted = voted.includes(id);

  const { data, error } = await supabase
    .from(table)
    .select("votes")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error(`Failed to fetch ${table} record:`, error);
    return { success: false };
  }

  const newVotes = hasVoted ? Math.max(0, data.votes - 1) : data.votes + 1;

  const { error: updateError } = await supabase
    .from(table)
    .update({ votes: newVotes })
    .eq("id", id);

  if (updateError) {
    console.error("Failed to update vote:", updateError);
    return { success: false };
  }

  const updated = hasVoted ? voted.filter((v) => v !== id) : [...voted, id];

  localStorage.setItem(key, JSON.stringify(updated));

  return { success: true };
}

export function hasVoted(table, id) {
  if (typeof window === "undefined") return false;
  const voted = JSON.parse(localStorage.getItem(`voted_${table}`) || "[]");
  return voted.includes(id);
}
