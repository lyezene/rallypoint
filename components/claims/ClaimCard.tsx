import React, { useState, useEffect } from "react";
import createSlug from "@/utils/slug";
import { createClientSsr } from "@/utils/supabase/client";
import { ClaimsModel } from "@/types/Models";

type ClaimsProps = {
  claim: ClaimsModel["Row"];
  poster_lw_username: string;
};

function Claim({ claim, poster_lw_username }: ClaimsProps) {
  const [claimant_lw_username, setClaimantLwUsername] = useState<string | null>(
    null,
  );
  const [postTitle, setPostTitle] = useState<string>("");
  useEffect(() => {
    const { post_id } = claim;
    const supabase = createClientSsr();
    supabase
      .from("posts")
      .select("title")
      .match({ post_id })
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching post to make slug", error.message);
        } else {
          setPostTitle(data.title);
        }
      });
  }, [claim]);
  useEffect(() => {
    const supabase = createClientSsr();
    const { claimant_user_id } = claim;
    supabase
      .from("profiles")
      .select()
      .match({ user_id: claimant_user_id })
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching lw_username");
        } else {
          setClaimantLwUsername(data.lw_username);
        }
      });
  }, [claim]);
  if (claimant_lw_username === null) {
    return <div>Loading...</div>;
  }

  const { claim_id, post_id, description, is_resolved } = claim;
  const post_slug = createSlug(postTitle, post_id);
  return (
    <div className="border card">
      <h1>
        <a href={`/${poster_lw_username}/${post_slug}/${claim_id}`}>
          Claim details
        </a>
      </h1>
      <p>Claimant: {claimant_lw_username}</p>
      <p>Evidence: {description}</p>
      <p>{is_resolved ? "Resolved" : "Unresolved"}</p>
    </div>
  );
}

export default Claim;
