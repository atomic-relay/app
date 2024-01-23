export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      contact: {
        Row: {
          company_name: string | null;
          country_code: string | null;
          created_at: string;
          email: string | null;
          first_name: string | null;
          id: number;
          last_name: string | null;
          number: number | null;
        };
        Insert: {
          company_name?: string | null;
          country_code?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: number;
          last_name?: string | null;
          number?: number | null;
        };
        Update: {
          company_name?: string | null;
          country_code?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: number;
          last_name?: string | null;
          number?: number | null;
        };
        Relationships: [];
      };
      invoices: {
        Row: {
          amount: number | null;
          base_currency: string | null;
          created_at: string;
          currency: string | null;
          email: string | null;
          expiration_day: string | null;
          from_email: string | null;
          id: number;
          updated_at: string | null;
        };
        Insert: {
          amount?: number | null;
          base_currency?: string | null;
          created_at?: string;
          currency?: string | null;
          email?: string | null;
          expiration_day?: string | null;
          from_email?: string | null;
          id?: number;
          updated_at?: string | null;
        };
        Update: {
          amount?: number | null;
          base_currency?: string | null;
          created_at?: string;
          currency?: string | null;
          email?: string | null;
          expiration_day?: string | null;
          from_email?: string | null;
          id?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          completed: boolean | null;
          completed_at: string | null;
          created_at: string;
          id: number;
          invoice_id: number;
          pending: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          completed?: boolean | null;
          completed_at?: string | null;
          created_at?: string;
          id?: number;
          invoice_id: number;
          pending?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          completed?: boolean | null;
          completed_at?: string | null;
          created_at?: string;
          id?: number;
          invoice_id?: number;
          pending?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey";
            columns: ["invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
        ];
      };
      rates: {
        Row: {
          base_currency: string | null;
          created_at: string;
          exchange_currency: string | null;
          id: number;
          invoice_id: number;
          rate: number | null;
        };
        Insert: {
          base_currency?: string | null;
          created_at?: string;
          exchange_currency?: string | null;
          id?: number;
          invoice_id: number;
          rate?: number | null;
        };
        Update: {
          base_currency?: string | null;
          created_at?: string;
          exchange_currency?: string | null;
          id?: number;
          invoice_id?: number;
          rate?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "rates_invoice_id_fkey";
            columns: ["invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
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
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
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
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
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
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
