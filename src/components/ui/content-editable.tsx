import ReactContentEditable from "react-contenteditable";

interface ContentEditableProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function ContentEditable(props: ContentEditableProps) {
    const convertToHtml = (text: string) => {
        return text.replace(/\n/g, "<br>");
    };

    const convertToText = (html: string) => {
        return html.replace(/<br\s*\/?>/g, "\n").replace(/<\/?[^>]+(>|$)/g, "");
    };

    return (
        <ReactContentEditable
            html={convertToHtml(props.value)}
            onChange={(event) => {
                const text = convertToText(event.target.value);
                props.onChange(text);
            }}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    document.execCommand("insertHTML", false, "<br><br>");
                    event.preventDefault();
                }
            }}
            onPaste={(event) => {
                event.preventDefault();
                const text = event.clipboardData.getData("text/plain");
                document.execCommand("insertHTML", false, text);
            }}
            data-placeholder={props.value ? "" : props.placeholder}
            className={`outline-none focus:outline-none whitespace-pre-wrap min-h-[250px] text-sm p-4 ${
                props.value
                    ? ""
                    : "before:content-[attr(data-placeholder)] before:text-muted-foreground"
            }`}
        />
    );
}
