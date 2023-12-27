export type User = {
  id: string;
  username: string;
  email: string;
  provider: "google" | "credentials" | "github";
};

export type Document = {
  id: string;
  title: string;
  content: string;
};
