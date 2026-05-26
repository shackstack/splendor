import { overlay } from 'overlay-kit';
import type { ComponentProps } from 'react';

import { Toast } from '../components/overlays/Toast';

export const toast = ({
  message,
  type,
}: {
  message: string;
  type: ComponentProps<typeof Toast>['type'];
}) => {
  overlay.open(({ isOpen, close }) => {
    return <Toast isOpen={isOpen} close={close} message={message} type={type} />;
  });
};
