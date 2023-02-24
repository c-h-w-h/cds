export type ToastKind = 'info' | 'success' | 'warning' | 'error';

export enum VerticalVariant {
  top = 'top',
  bottom = 'bottom',
}

export enum HorizontalVariant {
  left = 'left',
  right = 'right',
  center = 'center',
}

export const V_POSITION_MAP: Record<VerticalVariant, object> = {
  [VerticalVariant.top]: {
    top: 0,
    marginTop: '1rem',
  },
  [VerticalVariant.bottom]: {
    bottom: 0,
    marginBottom: '1rem',
  },
};

export const H_POSITION_MAP: Record<HorizontalVariant, object> = {
  [HorizontalVariant.left]: {
    left: 0,
    marginLeft: '1rem',
  },
  [HorizontalVariant.right]: {
    right: 0,
    marginRight: '1rem',
  },
  [HorizontalVariant.center]: {
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
};
