"use client";

import { useEffect } from "react";
import { getDefaultSecondaryLanguage, getNavigatorLanguages, labelStyleState } from "./label-settings-provider";

export function ConfigureLanguages() {
  useEffect(() => {
    labelStyleState.secondaryLanguage = getDefaultSecondaryLanguage(getNavigatorLanguages());
  }, []);
  return null;
}