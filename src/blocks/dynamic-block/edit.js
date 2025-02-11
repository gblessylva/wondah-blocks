import { useBlockProps } from "@wordpress/block-editor";

export default function Edit() {
    return (
        <div {...useBlockProps()}>
            <p>📄 All pages will be displayed dynamically on the frontend.</p>
        </div>
    );
}
