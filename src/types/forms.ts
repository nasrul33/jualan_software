import type {
  ContactRequestInput,
  DemoRequestInput,
  FieldErrors,
} from "@/lib/validations";

export type DemoRequestStatus = "idle" | "success" | "error";
export type ContactRequestStatus = "idle" | "success" | "error";

export interface DemoRequestActionState {
  status: DemoRequestStatus;
  message: string;
  fieldErrors: FieldErrors<DemoRequestInput>;
  trackingId?: string;
  whatsappUrl?: string;
}

export interface ContactRequestActionState {
  status: ContactRequestStatus;
  message: string;
  fieldErrors: FieldErrors<ContactRequestInput>;
  trackingId?: string;
  whatsappUrl?: string;
}
