import { useEffect, useRef } from "react";

interface ContentEditableProps {
    value: string;
    onChange: (value: string) => void;
}

export default function ContentEditable(props: ContentEditableProps) {
    const contentEditableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentEditableRef.current) return;
        if (contentEditableRef.current.textContent !== props.value) {
            contentEditableRef.current.textContent = props.value;
        }
    }, [props.value]);

    return (
        <div
            className="outline-none focus:outline-none"
            contentEditable="true"
            ref={contentEditableRef}
            onInput={(event) => {
                const target = event.target as HTMLDivElement;
                if (target.textContent !== null) {
                    props.onChange(target.textContent);
                }
            }}
        />
    );
}
