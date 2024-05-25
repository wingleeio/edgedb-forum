"use client";

import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    thematicBreakPlugin,
    type MDXEditorMethods,
    type MDXEditorProps,
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";

// Only import this to the next file
export default function InitializedMDXEditor({
    editorRef,
    ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
    return (
        <MDXEditor
            plugins={[
                // Example Plugin Usage
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
            ]}
            {...props}
            ref={editorRef}
        />
    );
}
