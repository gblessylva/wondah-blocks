import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
// import SocialProof from './SocialProof';

const CenterLayout = ({ attributes, setAttributes }) => {
    const {
        title, description, titleFontSize, descriptionFontSize,
        descriptionColor, gradientColor1, gradientColor2,
        primaryButtonText, secondaryButtonText,
        primaryButtonBg, primaryButtonColor,
        secondaryButtonBg, secondaryButtonColor,
        showPrimaryButton, showSecondaryButton,
        primaryButtonLink, secondaryButtonLink,
        titleFontSizeMobile, descriptionFontSizeMobile,
        primaryButtonFontSize, secondaryButtonFontSize,
        primaryButtonPadding, secondaryButtonPadding,
        primaryButtonBorderRadius, secondaryButtonBorderRadius
    } = attributes;

    return (
        <>
            <div className='heading-container'>
                <RichText
                    tagName="h1"
                    value={title}
                    onChange={(title) => setAttributes({ title })}
                    placeholder={__('Transform Your Business with AI', 'wondah-blocks')}
                    style={{
                        backgroundImage: `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textFillColor: 'transparent',
                        fontSize: `${titleFontSize}px`,
                        '--mobile-title-size': `${titleFontSizeMobile || 32 }px`
                    }}
                />
                {/* Add Description with P tag */}
                <div className='description-container'>
                    <RichText
                        tagName="p"
                        value={description}
                        onChange={(description) => setAttributes({ description })}
                        placeholder='Enter your description here...'
                        style={{
                            color: descriptionColor,
                            fontSize: `${descriptionFontSize}px`,
                            '--mobile-desc-size': `${descriptionFontSizeMobile || 16}px`
                        }}
                    />
                </div>
            </div>
            <div className="button-group">
                {showPrimaryButton && (
                    <RichText
                        tagName="a"
                        href={primaryButtonLink}
                        value={primaryButtonText}
                        onChange={(text) => setAttributes({ primaryButtonText: text })}
                        placeholder={__('Primary Button', 'wondah-blocks')}
                        style={{
                            backgroundColor: primaryButtonBg,
                            color: primaryButtonColor,
                            padding: `${primaryButtonPadding.vertical}px ${primaryButtonPadding.horizontal}px`,
                            fontSize: `${primaryButtonFontSize}px`,
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'inline-block',
                            textDecoration: 'none',
                            borderRadius: `${primaryButtonBorderRadius}px`
                        }}

                        className="primary-button"
                        multiline={false}
                        allowedFormats={[]}
                        keepPlaceholderOnFocus={true}
                    />
                )}
                {showSecondaryButton && (
                    <RichText
                        tagName="a"
                        href={secondaryButtonLink}
                        value={secondaryButtonText}
                        onChange={(text) => setAttributes({ secondaryButtonText: text })}
                        placeholder={__('Secondary Button', 'wondah-blocks')}
                        style={{
                            backgroundColor: secondaryButtonBg,
                            color: secondaryButtonColor,
                            border: `1px solid ${secondaryButtonColor}`,
                            padding: `${secondaryButtonPadding.vertical}px ${secondaryButtonPadding.horizontal}px`,
                            fontSize: `${secondaryButtonFontSize}px`,
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'inline-block',
                            textDecoration: 'none',
                            borderRadius: `${secondaryButtonBorderRadius}px`
                        }}
                        className="secondary-button"
                        multiline={false}
                        allowedFormats={[]}
                        keepPlaceholderOnFocus={true}
                    />
                )}
            </div>
            {/* <SocialProof attributes={attributes} setAttributes={setAttributes} /> */}
        </>
    );
};

export const SaveContent = ({ attributes }) => {
    const {
        title, description, titleFontSize, descriptionFontSize,
        descriptionColor, gradientColor1, gradientColor2,
        primaryButtonText, secondaryButtonText,
        primaryButtonBg, primaryButtonColor,
        showPrimaryButton, showSecondaryButton,
        secondaryButtonBg, secondaryButtonColor,
        primaryButtonLink, secondaryButtonLink,
        titleFontSizeMobile, descriptionFontSizeMobile,
        primaryButtonPadding, secondaryButtonPadding,  
        primaryButtonFontSize, secondaryButtonFontSize,
        primaryButtonBorderRadius, secondaryButtonBorderRadius 
    } = attributes;
    const mobileTitleSize = titleFontSizeMobile || Math.floor(titleFontSize * 0.625); // 62.5% of desktop size
    const mobileDescSize = descriptionFontSizeMobile || Math.floor(descriptionFontSize * 0.778);
    return (
        <>
        <div className='heading-container'>
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
                        '--mobile-title-size': `${mobileTitleSize}px`
                    }}
                />
            </div>
            <div className='description-container'>
                <RichText.Content
                    tagName="p"
                    value={description}
                    style={{
                        color: descriptionColor,
                        fontSize: `${descriptionFontSize}px`,
                        '--mobile-desc-size': `${mobileDescSize}px`
                    }}
                />
            </div>
            <div className="button-group">
                {showPrimaryButton && (
                    <RichText.Content
                        tagName="a"
                        value={primaryButtonText}
                        href={primaryButtonLink || '#'}
                        className="primary-button"
                        style={{
                            backgroundColor: primaryButtonBg,
                            color: primaryButtonColor,
                            padding: `${primaryButtonPadding?.vertical || 12}px ${primaryButtonPadding?.horizontal || 24}px`,
                            fontSize: `${primaryButtonFontSize || 16}px`,
                            fontWeight: '500',
                            display: 'inline-block',
                            textDecoration: 'none',
                            borderRadius: `${primaryButtonBorderRadius || 0}px`
                        }}
                    />
                )}
                {showSecondaryButton && (
                    <RichText.Content
                        tagName="a"
                        value={secondaryButtonText}
                        href={secondaryButtonLink || '#'}
                        className="secondary-button"
                        style={{
                            backgroundColor: secondaryButtonBg,
                            color: secondaryButtonColor,
                            border: `1px solid ${secondaryButtonColor}`,
                            padding: `${secondaryButtonPadding?.vertical || 12}px ${secondaryButtonPadding?.horizontal || 24}px`,
                            fontSize: `${secondaryButtonFontSize || 16}px`,
                            fontWeight: '500',
                            display: 'inline-block',
                            textDecoration: 'none',
                            borderRadius: `${secondaryButtonBorderRadius || 0}px`
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default CenterLayout;