import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, URLInput, InspectorControls} from '@wordpress/block-editor';
import { Button, PanelBody, TextControl,  } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('wondah-blocks/therapy-hero', {
        edit: ({ attributes, setAttributes }) => {
            const {
                mainTitle,
                description,
                buttonText,
                buttonUrl,
                mainImage,
                secondaryImage,
                successCount,
                successText,
                therapyLabels
            } = attributes;
            
            return (
                <>
                    <InspectorControls>
                        <PanelBody title={__('Image Settings', 'wondah-blocks')}>
                            <div className="editor-image-controls">
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ mainImage: media })}
                                    allowedTypes={['image']}
                                    value={mainImage?.id}
                                    render={({ open }) => (
                                        <Button
                                            onClick={open}
                                            variant="secondary"
                                            className="editor-button"
                                        >
                                            {mainImage?.url ? __('Change Primary Image', 'wondah-blocks') : __('Add Primary Image', 'wondah-blocks')}
                                        </Button>
                                    )}
                                />
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ secondaryImage: media })}
                                    allowedTypes={['image']}
                                    value={secondaryImage?.id}
                                    render={({ open }) => (
                                        <Button
                                            onClick={open}
                                            variant="secondary"
                                            className="editor-button"
                                        >
                                            {secondaryImage?.url ? __('Change Secondary Image', 'wondah-blocks') : __('Add Secondary Image', 'wondah-blocks')}
                                        </Button>
                                    )}
                                />
                            </div>
                        </PanelBody>
                        <PanelBody title={__('Button Settings', 'wondah-blocks')}>
                            <URLInput
                                label={__('Button URL', 'wondah-blocks')}
                                value={buttonUrl}
                                onChange={(buttonUrl) => setAttributes({ buttonUrl })}
                            />
                        </PanelBody>
                    </InspectorControls>

            <div {...useBlockProps()} className="therapy-hero">
                <div className="therapy-hero-content">
                    <RichText
                        tagName="h1"
                        className="therapy-hero-title"
                        value={mainTitle}
                        onChange={(mainTitle) => setAttributes({ mainTitle })}
                        placeholder={__('Enter main title...', 'wondah-blocks')}
                    />
                    <RichText
                        tagName="p"
                        className="therapy-hero-description"
                        value={description}
                        onChange={(description) => setAttributes({ description })}
                        placeholder={__('Enter description...', 'wondah-blocks')}
                    />
                    <div className="therapy-hero-cta">
                        <RichText
                            tagName="span"
                            className="button-text"
                            value={buttonText}
                            onChange={(buttonText) => setAttributes({ buttonText })}
                        />
                        <URLInput
                            value={buttonUrl}
                            onChange={(buttonUrl) => setAttributes({ buttonUrl })}
                        />
                    </div>
                </div>

                <div className="therapy-hero-images">
                    <div className="primary-column">
                        <MediaUpload
                            onSelect={(media) => setAttributes({ mainImage: media })}
                            allowedTypes={['image']}
                            value={mainImage?.id}
                            render={({ open }) => (
                                mainImage?.url ? (
                                    <div className="image-wrapper">
                                        <img src={mainImage.url} alt="" />
                                        <div className="therapy-labels">
                                            {therapyLabels.slice(0, 2).map((label, index) => (
                                                <span key={index} className="therapy-label"
                                                    style={{
                                                        left: `${label.position.x}%`,
                                                        top: `${label.position.y}%`
                                                    }}>
                                                    {label.text}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Button onClick={open} variant="secondary">
                                        {__('Upload Primary Image', 'wondah-blocks')}
                                    </Button>
                                )
                            )}
                        />
                    </div>

                    <div className="secondary-column">
                        <div className="secondary-image">
                            <MediaUpload
                                onSelect={(media) => setAttributes({ secondaryImage: media })}
                                allowedTypes={['image']}
                                value={secondaryImage?.id}
                                render={({ open }) => (
                                    secondaryImage?.url ? (
                                        <div className="image-wrapper">
                                            <img src={secondaryImage.url} alt="" />
                                            <div className="therapy-labels">
                                                {therapyLabels.slice(2, 4).map((label, index) => (
                                                    <span key={index} className="therapy-label"
                                                        style={{
                                                            left: `${label.position.x}%`,
                                                            top: `${label.position.y}%`
                                                        }}>
                                                        {label.text}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Button onClick={open} variant="secondary">
                                            {__('Upload Secondary Image', 'wondah-blocks')}
                                        </Button>
                                    )
                                )}
                            />
                        </div>

                        <div className="success-counter">
                            <RichText
                                tagName="span"
                                className="counter"
                                value={successCount}
                                onChange={(successCount) => setAttributes({ successCount })}
                            />
                            <RichText
                                tagName="span"
                                className="counter-text"
                                value={successText}
                                onChange={(successText) => setAttributes({ successText })}
                            />
                            <div className="avatar-group">
                                <div className="avatar"></div>
                                <div className="avatar"></div>
                                <div className="avatar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const {
            mainTitle,
            description,
            buttonText,
            buttonUrl,
            mainImage,
            secondaryImage,
            successCount,
            successText,
            therapyLabels
        } = attributes;

        return (
            <div className="therapy-hero">
                <div className="therapy-hero-content">
                    <RichText.Content
                        tagName="h1"
                        className="therapy-hero-title"
                        value={mainTitle}
                    />
                    <RichText.Content
                        tagName="p"
                        className="therapy-hero-description"
                        value={description}
                    />
                    <a href={buttonUrl} className="therapy-hero-cta">
                        <RichText.Content
                            tagName="span"
                            value={buttonText}
                        />
                    </a>
                </div>

                <div className="therapy-hero-images">
                    <div className="primary-column">
                        {mainImage?.url && (
                            <div className="image-wrapper">
                                <img src={mainImage.url} alt="" />
                                <div className="therapy-labels">
                                    {therapyLabels.slice(0, 2).map((label, index) => (
                                        <span key={index} className="therapy-label"
                                            style={{
                                                left: `${label.position.x}%`,
                                                top: `${label.position.y}%`
                                            }}>
                                            {label.text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="secondary-column">
                        <div className="secondary-image">
                            {secondaryImage?.url && (
                                <div className="image-wrapper">
                                    <img src={secondaryImage.url} alt="" />
                                    <div className="therapy-labels">
                                        {therapyLabels.slice(2, 4).map((label, index) => (
                                            <span key={index} className="therapy-label"
                                                style={{
                                                    left: `${label.position.x}%`,
                                                    top: `${label.position.y}%`
                                                }}>
                                                {label.text}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="success-counter">
                            <RichText.Content
                                tagName="span"
                                className="counter"
                                value={successCount}
                            />
                            <RichText.Content
                                tagName="span"
                                className="counter-text"
                                value={successText}
                            />
                            <div className="avatar-group">
                                <div className="avatar"></div>
                                <div className="avatar"></div>
                                <div className="avatar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});