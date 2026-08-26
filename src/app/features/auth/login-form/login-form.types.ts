import { LoginFormFields } from "./login-form.consts";

export type LoginFormOutput =
{
  [key in LoginFormFields]: string;
}
