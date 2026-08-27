export const APP_BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const;

export const APP_BUTTON_TYPE_DEFAULT = APP_BUTTON_TYPE.BUTTON;

export const APP_BUTTON_VARIANT = {
  PRIMARY: 'primary',
  DANGER: 'danger',
} as const;

export const APP_BUTTON_VARIANT_DEFAULT = APP_BUTTON_VARIANT.PRIMARY;

export type AppButtonType = (typeof APP_BUTTON_TYPE)[keyof typeof APP_BUTTON_TYPE];
export type AppButtonVariant = (typeof APP_BUTTON_VARIANT)[keyof typeof APP_BUTTON_VARIANT];

interface AppButtonColors {
  background: string;
  backgroundHover: string;
}

export const AppButtonColorsByVariant: Record<AppButtonVariant, AppButtonColors> = {
  [APP_BUTTON_VARIANT.PRIMARY]: {
    background: 'var(--blue)',
    backgroundHover: 'var(--blue-active)',
  },
  [APP_BUTTON_VARIANT.DANGER]: {
    background: 'var(--red)',
    backgroundHover: 'var(--red-active)',
  },
};
