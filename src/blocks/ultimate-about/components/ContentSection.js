import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export const ContentSection = ({ attributes, setAttributes }) => {
    const {
        subtitle, title, highlightedTitle, description,
        subtitleColor, titleColor, highlightedTitleColor, descriptionColor,
        subtitleFontSize, titleFontSize, descriptionFontSize
    } = attributes;

    return (
        <div className="content-section">
            <div className='content-section-left'>
                <RichText
                    tagName="p"
                    className="subtitle"
                    value={subtitle}
                    onChange={(subtitle) => setAttributes({ subtitle })}
                    placeholder={__('Enter subtitle...', 'wondah-blocks')}
                    style={{
                        color: subtitleColor,
                        fontSize: `${subtitleFontSize}px`
                    }}
                />
                <div className="title-wrapper">
                    <RichText
                        tagName="h2"
                        className="title"
                        value={title}
                        onChange={(title) => setAttributes({ title })}
                        placeholder={__('Enter title...', 'wondah-blocks')}
                        style={{
                            color: titleColor,
                            fontSize: `${titleFontSize}px`
                        }}
                    />
                    <RichText
                        tagName="h2"
                        className="highlighted-title"
                        value={highlightedTitle}
                        onChange={(highlightedTitle) => setAttributes({ highlightedTitle })}
                        placeholder={__('Enter highlighted title...', 'wondah-blocks')}
                        style={{
                            color: highlightedTitleColor,
                            fontSize: `${titleFontSize}px`
                        }}
                    />
                </div>
            </div>
            <div className='content-section-right'>
                <RichText
                    tagName="p"
                    className="description"
                    value={description}
                    onChange={(description) => setAttributes({ description })}
                    placeholder={__('Enter description...', 'wondah-blocks')}
                    style={{
                        color: descriptionColor,
                        fontSize: `${descriptionFontSize}px`
                    }}
                />
            </div>
        </div>
    );
};

export const SaveContentSection = ({ attributes }) => {
    const {
        subtitle, title, highlightedTitle, description,
        subtitleColor, titleColor, highlightedTitleColor, descriptionColor,
        subtitleFontSize, titleFontSize, descriptionFontSize
    } = attributes;

    return (
        <div className="content-section">
            <div className='content-section-left'>
                <RichText.Content
                    tagName="p"
                    className="subtitle"
                    value={subtitle}
                    style={{
                        color: subtitleColor,
                        fontSize: `${subtitleFontSize}px`
                    }}
                />
                <div className="title-wrapper">
                    <RichText.Content
                        tagName="h2"
                        className="title"
                        value={title}
                        style={{
                            color: titleColor,
                            fontSize: `${titleFontSize}px`
                        }}
                    />
                    <RichText.Content
                        tagName="h2"
                        className="highlighted-title"
                        value={highlightedTitle}
                        style={{
                            color: highlightedTitleColor,
                            fontSize: `${titleFontSize}px`
                        }}
                    />
                </div>
            </div>
            <div className='content-section-right'>
                <RichText.Content
                    tagName="p"
                    className="description"
                    value={description}
                    style={{
                        color: descriptionColor,
                        fontSize: `${descriptionFontSize}px`
                    }}
                />
            </div>
        </div>
    );
};