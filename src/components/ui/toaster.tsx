"use client";

import * as React from "react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastAction,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="w-full">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full">
              <div>
                {title && (
                  <ToastTitle className="text-sm sm:text-base">
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription className="text-xs sm:text-sm">
                    {description}
                  </ToastDescription>
                )}
              </div>
              {action && <div className="mt-2 sm:mt-0">{action}</div>}
              <ToastClose  />
            </div>
          </Toast>
        );
      })}
      <ToastViewport className="fixed bottom-0 right-0 p-4" />
    </ToastProvider>
  );
}
