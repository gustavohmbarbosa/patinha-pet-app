export type BackUserErrorProps = {
  message: string;
  error?: {
    phone_number?: string;
    name?: string;
    email?: string;
    password?: string;
    cep?: string;
    city?: string;
    street?: string;
    state?: string;
    neighborhood?: string;
  };
};
