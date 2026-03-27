'use client';

import { useToast } from '@/context/ToastContext';
import ToastContainer from './ToastContainer';

export default function ToastRenderer() {
  const { toasts, dismiss } = useToast();

  return <ToastContainer toasts={toasts} onDismiss={dismiss} />;
}
