export interface PrismicSlice<TType extends string, TItem> {
    primary: {};
    slice_type: TType;
    slice_label: null;
    items: TItem[];
}

export type AnyPrismicSlice = PrismicSlice<string, {}>;