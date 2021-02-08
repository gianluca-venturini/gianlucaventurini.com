import * as React from "react";
import { AnyPrismicSlice } from "./SliceJson";

const SLICES: { [index: string]: React.ComponentType<{ slice: AnyPrismicSlice }> } = {
    // insert slices here
};

export function renderSlice<TSlice extends AnyPrismicSlice>(slice: TSlice) {
    const SliceElement = SLICES[slice.slice_type];

    if (!SliceElement) {
        console.error(`Cannot find ${slice.slice_type}. Did you add it to SLICES?`);
    }

    return <SliceElement slice={slice} />;
}
