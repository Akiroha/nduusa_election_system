export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      election_year: {
        Row: {
          created_at: string | null
          id: string
          voting_ends: string
          voting_starts: string
          year: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          voting_ends: string
          voting_starts: string
          year: string
        }
        Update: {
          created_at?: string | null
          id?: string
          voting_ends?: string
          voting_starts?: string
          year?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          active: boolean
          branch: string | null
          created_at: string | null
          id: string
          name: string
          password: string
          phone: string
          type: string | null
          voted: boolean
        }
        Insert: {
          active?: boolean
          branch?: string | null
          created_at?: string | null
          id?: string
          name: string
          password: string
          phone?: string
          type?: string | null
          voted?: boolean
        }
        Update: {
          active?: boolean
          branch?: string | null
          created_at?: string | null
          id?: string
          name?: string
          password?: string
          phone?: string
          type?: string | null
          voted?: boolean
        }
        Relationships: []
      }
      user_vote: {
        Row: {
          created_at: string | null
          election_year: string | null
          id: string
          user: string
          voting_position: string
          voting_position_option: string
        }
        Insert: {
          created_at?: string | null
          election_year?: string | null
          id?: string
          user: string
          voting_position: string
          voting_position_option: string
        }
        Update: {
          created_at?: string | null
          election_year?: string | null
          id?: string
          user?: string
          voting_position?: string
          voting_position_option?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_vote_election_year_fkey"
            columns: ["election_year"]
            referencedRelation: "election_year"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_vote_user_fkey"
            columns: ["user"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_vote_voting_position_fkey"
            columns: ["voting_position"]
            referencedRelation: "voting_position"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_vote_voting_position_option_fkey"
            columns: ["voting_position_option"]
            referencedRelation: "voting_position_option"
            referencedColumns: ["id"]
          }
        ]
      }
      voting_position: {
        Row: {
          created_at: string | null
          election_year: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string | null
          election_year: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string | null
          election_year?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "voting_position_election_year_fkey"
            columns: ["election_year"]
            referencedRelation: "election_year"
            referencedColumns: ["id"]
          }
        ]
      }
      voting_position_option: {
        Row: {
          created_at: string | null
          id: string
          name: string
          voting_position: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          voting_position: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          voting_position?: string
        }
        Relationships: [
          {
            foreignKeyName: "voting_position_option_voting_position_fkey"
            columns: ["voting_position"]
            referencedRelation: "voting_position"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
