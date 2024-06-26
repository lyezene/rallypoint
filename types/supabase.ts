export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      claims: {
        Row: {
          claim_id: string;
          claimant_user_id: string | null;
          claimed_at: string | null;
          completion: number;
          deadline: string | null;
          description: string;
          is_resolved: boolean | null;
          post_id: string;
          resolved_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          claim_id?: string;
          claimant_user_id?: string | null;
          claimed_at?: string | null;
          completion?: number;
          deadline?: string | null;
          description: string;
          is_resolved?: boolean | null;
          post_id: string;
          resolved_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          claim_id?: string;
          claimant_user_id?: string | null;
          claimed_at?: string | null;
          completion?: number;
          deadline?: string | null;
          description?: string;
          is_resolved?: boolean | null;
          post_id?: string;
          resolved_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "claims_claimant_user_id_fkey";
            columns: ["claimant_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "claims_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["post_id"];
          },
        ];
      };
      comments: {
        Row: {
          comment_id: string;
          contents: string;
          created_at: string;
          post_id: string | null;
          status: Database["public"]["Enums"]["comment_type"] | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          comment_id?: string;
          contents: string;
          created_at?: string;
          post_id?: string | null;
          status?: Database["public"]["Enums"]["comment_type"] | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          comment_id?: string;
          contents?: string;
          created_at?: string;
          post_id?: string | null;
          status?: Database["public"]["Enums"]["comment_type"] | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["post_id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["user_id"];
          },
        ];
      };
      payments_allocation: {
        Row: {
          allocation_id: string;
          amount: number;
          created_at: string | null;
          post_id: string | null;
          status: Database["public"]["Enums"]["allocation_status"];
          user_id: string | null;
        };
        Insert: {
          allocation_id?: string;
          amount: number;
          created_at?: string | null;
          post_id?: string | null;
          status?: Database["public"]["Enums"]["allocation_status"];
          user_id?: string | null;
        };
        Update: {
          allocation_id?: string;
          amount?: number;
          created_at?: string | null;
          post_id?: string | null;
          status?: Database["public"]["Enums"]["allocation_status"];
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "payments_allocation_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["post_id"];
          },
          {
            foreignKeyName: "payments_allocation_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["user_id"];
          },
        ];
      };
      payments_claim_withdrawal: {
        Row: {
          amount: number;
          claim_id: string | null;
          created_at: string | null;
          status: Database["public"]["Enums"]["status_type"] | null;
          stripe_payment_id: string | null;
          user_id: string | null;
          withdrawal_id: string;
        };
        Insert: {
          amount: number;
          claim_id?: string | null;
          created_at?: string | null;
          status?: Database["public"]["Enums"]["status_type"] | null;
          stripe_payment_id?: string | null;
          user_id?: string | null;
          withdrawal_id?: string;
        };
        Update: {
          amount?: number;
          claim_id?: string | null;
          created_at?: string | null;
          status?: Database["public"]["Enums"]["status_type"] | null;
          stripe_payment_id?: string | null;
          user_id?: string | null;
          withdrawal_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_claim_withdrawal_claim_id_fkey";
            columns: ["claim_id"];
            isOneToOne: false;
            referencedRelation: "claims";
            referencedColumns: ["claim_id"];
          },
          {
            foreignKeyName: "payments_claim_withdrawal_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          },
        ];
      };
      payments_deposit: {
        Row: {
          amount: number;
          created_at: string | null;
          deposit_id: string;
          status: string | null;
          stripe_payment_id: string | null;
          user_id: string | null;
        };
        Insert: {
          amount: number;
          created_at?: string | null;
          deposit_id?: string;
          status?: string | null;
          stripe_payment_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string | null;
          deposit_id?: string;
          status?: string | null;
          stripe_payment_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
        };
        Insert: {
          post_id: string;
          tag_id: string;
        };
        Update: {
          post_id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["post_id"];
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["tag_id"];
          },
        ];
      };
      posts: {
        Row: {
          amount: number | null;
          created_at: string | null;
          deadline: string | null;
          description: string | null;
          owner_user_id: string | null;
          post_id: string;
          post_type: Database["public"]["Enums"]["post_type"] | null;
          status: Database["public"]["Enums"]["status_type"] | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          amount?: number | null;
          created_at?: string | null;
          deadline?: string | null;
          description?: string | null;
          owner_user_id?: string | null;
          post_id?: string;
          post_type?: Database["public"]["Enums"]["post_type"] | null;
          status?: Database["public"]["Enums"]["status_type"] | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          amount?: number | null;
          created_at?: string | null;
          deadline?: string | null;
          description?: string | null;
          owner_user_id?: string | null;
          post_id?: string;
          post_type?: Database["public"]["Enums"]["post_type"] | null;
          status?: Database["public"]["Enums"]["status_type"] | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_owner_user_id_fkey";
            columns: ["owner_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["user_id"];
          },
        ];
      };
      profiles: {
        Row: {
          balance: number | null;
          balance_gained: number;
          balance_offered: number;
          balance_paid: number;
          bio: string | null;
          created_at: string;
          display_name: string | null;
          email: string | null;
          location: string | null;
          lw_username: string | null;
          profile_image_url: string | null;
          stripe_account_id: string | null;
          update_at: string | null;
          user_id: string;
          website: string | null;
        };
        Insert: {
          balance?: number | null;
          balance_gained?: number;
          balance_offered?: number;
          balance_paid?: number;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          email?: string | null;
          location?: string | null;
          lw_username?: string | null;
          profile_image_url?: string | null;
          stripe_account_id?: string | null;
          update_at?: string | null;
          user_id: string;
          website?: string | null;
        };
        Update: {
          balance?: number | null;
          balance_gained?: number;
          balance_offered?: number;
          balance_paid?: number;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          email?: string | null;
          location?: string | null;
          lw_username?: string | null;
          profile_image_url?: string | null;
          stripe_account_id?: string | null;
          update_at?: string | null;
          user_id?: string;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tags: {
        Row: {
          created_at: string;
          tag: string | null;
          tag_id: string;
        };
        Insert: {
          created_at?: string;
          tag?: string | null;
          tag_id?: string;
        };
        Update: {
          created_at?: string;
          tag?: string | null;
          tag_id?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          balance: number;
          bio: string | null;
          created_at: string | null;
          display_name: string;
          email: string;
          lw_username: string;
          profile_image_url: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          balance?: number;
          bio?: string | null;
          created_at?: string | null;
          display_name: string;
          email: string;
          lw_username: string;
          profile_image_url?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          balance?: number;
          bio?: string | null;
          created_at?: string | null;
          display_name?: string;
          email?: string;
          lw_username?: string;
          profile_image_url?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      fund_post: {
        Args: {
          userid: string;
          funding_amount: number;
          postid: string;
        };
        Returns: undefined;
      };
      resolve_claim: {
        Args: {
          poster_user_id: string;
          claimant_user_id: string;
          resolving_claim_id: string;
          award: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      allocation_status: "allocated" | "frozen" | "claimed" | "withdrawn";
      comment_type: "public" | "hidden" | "deleted";
      post_type: "bounty" | "dac";
      status_type: "unclaimed" | "claimed" | "finished" | "closed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
