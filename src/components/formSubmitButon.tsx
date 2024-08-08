import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

export default function SignUpButton({
  children,
  formAction,
}: {
  formAction: (formData: FormData) => void;
  children?: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      formAction={formAction}
      type="submit"
      disabled={pending}
      sx={{ width: "100%", padding: "10px", color: "white" }}
      variant="contained"
    >
      {pending ? "wait..." : children}
    </Button>
  );
}
