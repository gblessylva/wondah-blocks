import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export const StorySection = ({ attributes, setAttributes }) => {
    const {
        storyTitle,
        storyDescription,
        founderQuote,
        founderName,
        founderPosition
    } = attributes;

    return (
        <div className="story-section">
            <div className="story-header">
                <RichText
                    tagName="h2"
                    className="story-title"
                    value={storyTitle}
                    onChange={(storyTitle) => setAttributes({ storyTitle })}
                    placeholder={__('Our Story ↘', 'wondah-blocks')}
                />
            </div>
            <div className="story-content">
                <RichText
                    tagName="div"
                    className="story-description"
                    value={storyDescription}
                    onChange={(storyDescription) => setAttributes({ storyDescription })}
                    placeholder={__('Enter your story here...', 'wondah-blocks')}
                />
                <div className="founder-quote">
                    <RichText
                        tagName="blockquote"
                        value={founderQuote}
                        onChange={(founderQuote) => setAttributes({ founderQuote })}
                        placeholder={__('Enter founder quote...', 'wondah-blocks')}
                    />
                    <div className="founder-info">
                        <RichText
                            tagName="span"
                            className="founder-name"
                            value={founderName}
                            onChange={(founderName) => setAttributes({ founderName })}
                            placeholder={__('Founder Name', 'wondah-blocks')}
                        />
                        <RichText
                            tagName="span"
                            className="founder-position"
                            value={founderPosition}
                            onChange={(founderPosition) => setAttributes({ founderPosition })}
                            placeholder={__('Founder & CEO', 'wondah-blocks')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SaveStorySection = ({ attributes }) => {
    const {
        storyTitle,
        storyDescription,
        founderQuote,
        founderName,
        founderPosition
    } = attributes;

    return (
        <div className="story-section">
            <div className="story-header">
                <RichText.Content
                    tagName="h2"
                    className="story-title"
                    value={storyTitle}
                />
            </div>
            <div className="story-content">
                <RichText.Content
                    tagName="div"
                    className="story-description"
                    value={storyDescription}
                />
                <div className="founder-quote">
                    <RichText.Content
                        tagName="blockquote"
                        value={founderQuote}
                    />
                    <div className="founder-info">
                        <RichText.Content
                            tagName="span"
                            className="founder-name"
                            value={founderName}
                        />
                        <RichText.Content
                            tagName="span"
                            className="founder-position"
                            value={founderPosition}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};