import { RichText, MediaUpload } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

const SideLayout = ({ attributes, setAttributes }) => {
    const {
        title, description, titleFontSize, descriptionFontSize,
        descriptionColor, gradientColor1, gradientColor2,
        primaryButtonText, secondaryButtonText,
        primaryButtonBg, primaryButtonColor,
        secondaryButtonBg, secondaryButtonColor, sideImage,
        showPrimaryButton,
        showSecondaryButton, primaryButtonLink, titleFontSizeMobile
    } = attributes;

    return (
        <>
            <div className="content-wrapper">
                <RichText
                    tagName="h1"
                    value={title}
                    onChange={(title) => setAttributes({ title })}
                    placeholder={__('Enter title here...', 'wondah-blocks')}
                    style={{
                        backgroundImage: `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textFillColor: 'transparent',
                        fontSize: `${titleFontSize}px`,
                            '@media (max-width: 768px)': {
                                fontSize: `${attributes.titleFontSizeMobile}px`}
                    }}
                />
                <RichText
                    tagName="p"
                    value={description}
                    onChange={(description) => setAttributes({ description })}
                    placeholder={__('Enter description here...', 'wondah-blocks')}
                    style={{
                        color: descriptionColor,
                        fontSize: `${descriptionFontSize}px`
                    }}
                />
                <div className="button-group">
                    {showPrimaryButton && (
                        <RichText
                            tagName="a"
                            href={primaryButtonLink}
                            className="primary-button"
                            value={primaryButtonText}
                            onChange={(text) => setAttributes({ primaryButtonText: text })}
                            placeholder={__('Primary Button', 'wondah-blocks')}
                            style={{
                                backgroundColor: primaryButtonBg,
                                color: primaryButtonColor,
                                padding: '12px 24px',
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'inline-block'
                            }}
                            multiline={false}
                            allowedFormats={[]}
                            keepPlaceholderOnFocus={true}
                        />
                    )}
                    {showSecondaryButton && (
                        <RichText
                            tagName="div"
                            value={secondaryButtonText}
                            onChange={(text) => setAttributes({ secondaryButtonText: text })}
                            placeholder={__('Secondary Button', 'wondah-blocks')}
                            style={{
                                backgroundColor: secondaryButtonBg,
                                color: secondaryButtonColor,
                                border: `1px solid ${secondaryButtonColor}`,
                                padding: '12px 24px',
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'inline-block'
                            }}
                            className="secondary-button"
                            multiline={false}
                            allowedFormats={[]}
                            keepPlaceholderOnFocus={true}
                        />
                    )}
                </div>
            </div>
            <div className="image-wrapper">
                {!sideImage.url && (
                    <MediaUpload
                        onSelect={(media) => setAttributes({ sideImage: media })}
                        allowedTypes={['image']}
                        value={sideImage.id}
                        render={({ open }) => (
                            <Button
                                onClick={open}
                                className="add-side-image"
                                variant="primary"
                            >
                                {__('Add Side Image', 'wondah-blocks')}
                            </Button>
                        )}
                    />
                )}
                {sideImage.url && (
                    <>
                        <img src={sideImage.url} alt={sideImage.alt || ''} />
                        <Button
                            onClick={() => setAttributes({ sideImage: {} })}
                            className="remove-side-image"
                            variant="secondary"
                            isDestructive
                        >
                            {__('Remove Image', 'wondah-blocks')}
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};

export const SaveContent = ({ attributes }) => {
    const {
        title, description, titleFontSize, descriptionFontSize,
        descriptionColor, gradientColor1, gradientColor2,
        primaryButtonText, secondaryButtonText,
        primaryButtonBg, primaryButtonColor,
        secondaryButtonBg, secondaryButtonColor,
        showPrimaryButton, showSecondaryButton, 
        sideImage, primaryButtonLink, secondaryButtonLink,
        titleFontSizeMobile, descriptionFontSizeMobile
    } = attributes;

    return (
        <>
            <div className="content-wrapper">
                <RichText.Content
                    tagName="h1"
                    value={title}
                    style={{
                        backgroundImage: `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textFillColor: 'transparent',
                        fontSize: `${titleFontSize}px`,
                        '--mobile-title-size': `${titleFontSizeMobile}px`
                    }}
                />
                <RichText.Content
                    tagName="p"
                    value={description}
                    style={{
                        color: descriptionColor,
                        fontSize: `${descriptionFontSize}px`,
                        '--mobile-desc-size': `${descriptionFontSizeMobile}px`
                    }}
                />
                <div className="button-group">
                    {showPrimaryButton && (
                        <RichText.Content
                            tagName="a"
                            value={primaryButtonText}
                            className="primary-button"
                            href={primaryButtonLink}
                            style={{
                                backgroundColor: primaryButtonBg,
                                color: primaryButtonColor,
                                padding: '12px 24px',
                                fontSize: '16px',
                                fontWeight: '500',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        />
                    )}
                    {showSecondaryButton && (
                        <RichText.Content
                            tagName="a"
                            value={secondaryButtonText}
                            className="secondary-button"
                            href={secondaryButtonLink}
                            style={{
                                backgroundColor: secondaryButtonBg,
                                color: secondaryButtonColor,
                                border: `1px solid ${secondaryButtonColor}`,
                                padding: '12px 24px',
                                fontSize: '16px',
                                fontWeight: '500',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="image-wrapper">
                {sideImage.url && (
                    <img src={sideImage.url} alt={sideImage.alt || ''} />
                )}
            </div>
        </>
    );
};

export default SideLayout;