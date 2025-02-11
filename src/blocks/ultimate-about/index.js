import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ContentSection, SaveContentSection } from './components/ContentSection';
import { ImagesSection, SaveImagesSection } from './components/ImagesSection';
import { StorySection, SaveStorySection } from './components/StorySection';
import { TeamSection, SaveTeamSection } from './components/TeamSection';
import { Container, SaveContainer } from './components/Container';
import { Settings } from './components/Settings';
import './style.scss';
import metadata from './block.json';

registerBlockType(metadata.name, {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        return (
            <>
                <InspectorControls>
                    <Settings attributes={attributes} setAttributes={setAttributes} />
                </InspectorControls>

                <div {...blockProps} className="ultimate-about">
                    <ContentSection attributes={attributes} setAttributes={setAttributes} />
                    <ImagesSection attributes={attributes} setAttributes={setAttributes} />
                    <StorySection attributes={attributes} setAttributes={setAttributes} />
                    <Container attributes={attributes} setAttributes={setAttributes} />     
                    <TeamSection attributes={attributes} setAttributes={setAttributes} />
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        return (
            <div className="ultimate-about">
                <SaveContentSection attributes={attributes} />
                <SaveImagesSection attributes={attributes} />
                <SaveStorySection attributes={attributes} />
                <SaveContainer attributes={attributes} />
                <SaveTeamSection attributes={attributes} />
            </div>
        );
    }
});