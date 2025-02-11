import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";

registerBlockType("wondah-blocks/all-pages", {
    edit: Edit,
    save: () => null, // Dynamic block, no need to save
});
