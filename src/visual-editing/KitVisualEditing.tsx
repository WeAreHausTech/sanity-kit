import React, { Fragment } from "react";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisablePreviewMode } from "./DisablePreviewMode";

export async function KitVisualEditing() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) {
    return null;
  }

  return (
    <Fragment>
      <DisablePreviewMode />
      <VisualEditing />
    </Fragment>
  );
}
