"use client";

import {
    MDXEditorMethods,
    MDXEditorProps,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
} from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { forwardRef } from "react";

// ForwardRefEditor.tsx

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("./InitializedMDXEditor"), {
    // Make sure we turn SSR off
    ssr: false,
});

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
    (props, ref) => (
        <Editor
            {...props}
            editorRef={ref}
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
            ]}
        />
    )
);

// TS complains without the following line
ForwardRefEditor.displayName = "ForwardRefEditor";
