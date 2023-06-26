export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organization: {
        Row: {
          created_at: string | null
          id: string
          voting_ends: string | null
          voting_open: boolean | null
          voting_starts: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          voting_ends?: string | null
          voting_open?: boolean | null
          voting_starts?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          voting_ends?: string | null
          voting_open?: boolean | null
          voting_starts?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          actiive: boolean
          branch: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          password: string
          type: string | null
          voted: boolean
        }
        Insert: {
          actiive?: boolean
          branch?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          password: string
          type?: string | null
          voted?: boolean
        }
        Update: {
          actiive?: boolean
          branch?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password?: string
          type?: string | null
          voted?: boolean
        }
        Relationships: []
      }
      user_vote: {
        Row: {
          created_at: string | null
          id: string
          user: string
          voting_position: string
          voting_position_option: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          user: string
          voting_position: string
          voting_position_option: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user?: string
          voting_position?: string
          voting_position_option?: string
        }
        Relationships: [
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
          id: string
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string
        }
        Relationships: []
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
