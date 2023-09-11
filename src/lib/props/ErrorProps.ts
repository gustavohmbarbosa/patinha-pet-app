export type BackUserErrorProps = {
  message: string;
  error?: {
    phone?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    zipCode?: string;
    city?: string;
    street?: string;
    state?: string;
    neighborhood?: string;
  };
};
