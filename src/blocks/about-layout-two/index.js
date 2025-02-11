import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, RangeControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('wondah-blocks/about-layout-two', {
    title: __('About Layout Two', 'wondah-blocks'),
    icon: 'align-pull-right',
    category: 'design',
    attributes: {
        tag: {
            type: 'string',
            default: 'About Company 🚀'
        },
        title: {
            type: 'string',
            default: 'We believe in doing the right thing'
        },
        description: {
            type: 'string',
            default: 'Foster a supportive and inclusive environment where our team can thrive. We believe in doing the right thing, always.'
        },
        buttonText: {
            type: 'string',
            default: 'Learn More'
        },
        buttonUrl: {
            type: 'string',
            default: '#'
        },
        backgroundColor: {
            type: 'string',
            default: '#F8F9FC'
        },
        tagColor: {
            type: 'string',
            default: '#E65525'
        },
        titleColor: {
            type: 'string',
            default: '#1A1A1A'
        },
        descriptionColor: {
            type: 'string',
            default: '#666666'
        },
        buttonBackgroundColor: {
            type: 'string',
            default: '#1A1A1A'
        },
        buttonTextColor: {
            type: 'string',
            default: '#FFFFFF'
        },
        mediaUrl: {
            type: 'string',
            default: ''
        },
        mediaId: {
            type: 'number'
        },
        mediaType: {
            type: 'string',
            default: 'image'
        },
        features: {
            type: 'array',
            default: [
                {
                    icon: '👍',
                    title: 'Growth',
                    description: "Our mission's to drive grow & improve progress."
                },
                {
                    icon: '📈',
                    title: 'Revenue',
                    description: "Our mission's to drive grow & improve progress."
                }
            ]
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        const handleFeatureChange = (index, field, value) => {
            const newFeatures = [...attributes.features];
            newFeatures[index] = { ...newFeatures[index], [field]: value };
            setAttributes({ features: newFeatures });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Colors', 'wondah-blocks')}>
                        <div className="color-settings">
                            <label>{__('Background Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.backgroundColor}
                                onChangeComplete={(color) => setAttributes({ backgroundColor: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Tag Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.tagColor}
                                onChangeComplete={(color) => setAttributes({ tagColor: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Title Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.titleColor}
                                onChangeComplete={(color) => setAttributes({ titleColor: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Description Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.descriptionColor}
                                onChangeComplete={(color) => setAttributes({ descriptionColor: color.hex })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={__('Button Settings', 'wondah-blocks')}>
                        <div className="url-input" style={{ marginBottom: '16px' }}>
                            <label>{__('Button URL', 'wondah-blocks')}</label>
                            <input
                                type="url"
                                value={attributes.buttonUrl}
                                onChange={(e) => setAttributes({ buttonUrl: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    marginTop: '8px'
                                }}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Button Background Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.buttonBackgroundColor}
                                onChangeComplete={(color) => setAttributes({ buttonBackgroundColor: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Button Text Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.buttonTextColor}
                                onChangeComplete={(color) => setAttributes({ buttonTextColor: color.hex })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={__('Media Settings', 'wondah-blocks')}>
                        <div style={{ marginBottom: '16px' }}>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => {
                                        setAttributes({
                                            mediaUrl: media.url,
                                            mediaId: media.id,
                                            mediaType: media.type
                                        });
                                    }}
                                    allowedTypes={['image', 'video']}
                                    value={attributes.mediaId}
                                    render={({ open }) => (
                                        <Button
                                            onClick={open}
                                            variant="secondary"
                                            style={{ width: '100%', marginBottom: '8px' }}
                                        >
                                            {attributes.mediaUrl ? __('Replace Media', 'wondah-blocks') : __('Select Media', 'wondah-blocks')}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            {attributes.mediaUrl && (
                                <Button
                                    onClick={() => setAttributes({ mediaUrl: '', mediaId: null, mediaType: 'image' })}
                                    variant="link"
                                    isDestructive
                                >
                                    {__('Remove Media', 'wondah-blocks')}
                                </Button>
                            )}
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} className="about-layout-two" style={{ backgroundColor: attributes.backgroundColor }}>
                    <div className="about-content">
                        <div className="text-content">
                            <RichText
                                tagName="span"
                                value={attributes.tag}
                                onChange={(tag) => setAttributes({ tag })}
                                className="about-tag"
                                style={{ color: attributes.tagColor }}
                            />
                            <RichText
                                tagName="h2"
                                value={attributes.title}
                                onChange={(title) => setAttributes({ title })}
                                className="about-title"
                                style={{ color: attributes.titleColor }}
                            />
                            <RichText
                                tagName="p"
                                value={attributes.description}
                                onChange={(description) => setAttributes({ description })}
                                className="about-description"
                                style={{ color: attributes.descriptionColor }}
                            />
                            <div className="features-grid">
                                {attributes.features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <RichText
                                            tagName="span"
                                            value={feature.icon}
                                            onChange={(value) => handleFeatureChange(index, 'icon', value)}
                                            className="feature-icon"
                                        />
                                        <div className="feature-content">
                                            <RichText
                                                tagName="h3"
                                                value={feature.title}
                                                onChange={(value) => handleFeatureChange(index, 'title', value)}
                                                className="feature-title"
                                                style={{ color: attributes.titleColor }}
                                            />
                                            <RichText
                                                tagName="p"
                                                value={feature.description}
                                                onChange={(value) => handleFeatureChange(index, 'description', value)}
                                                className="feature-description"
                                                style={{ color: attributes.descriptionColor }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <RichText
                                tagName="a"
                                value={attributes.buttonText}
                                onChange={(buttonText) => setAttributes({ buttonText })}
                                className="about-button"
                                style={{
                                    backgroundColor: attributes.buttonBackgroundColor,
                                    color: attributes.buttonTextColor
                                }}
                            />
                        </div>
                        <div className="image-content">
                            {attributes.mediaUrl ? (
                                attributes.mediaType === 'video' ? (
                                    <video
                                        controls
                                        className="media-content"
                                        src={attributes.mediaUrl}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img
                                        src={attributes.mediaUrl}
                                        alt=""
                                        className="media-content"
                                    />
                                )
                            ) : (
                                <div className="video-placeholder">
                                    <span className="play-icon">▶</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps} className="about-layout-two" style={{ backgroundColor: attributes.backgroundColor }}>
                <div className="about-content">
                    <div className="text-content">
                        <RichText.Content
                            tagName="span"
                            value={attributes.tag}
                            className="about-tag"
                            style={{ color: attributes.tagColor }}
                        />
                        <RichText.Content
                            tagName="h2"
                            value={attributes.title}
                            className="about-title"
                            style={{ color: attributes.titleColor }}
                        />
                        <RichText.Content
                            tagName="p"
                            value={attributes.description}
                            className="about-description"
                            style={{ color: attributes.descriptionColor }}
                        />
                        <div className="features-grid">
                            {attributes.features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <RichText.Content
                                        tagName="span"
                                        value={feature.icon}
                                        className="feature-icon"
                                    />
                                    <div className="feature-content">
                                        <RichText.Content
                                            tagName="h3"
                                            value={feature.title}
                                            className="feature-title"
                                            style={{ color: attributes.titleColor }}
                                        />
                                        <RichText.Content
                                            tagName="p"
                                            value={feature.description}
                                            className="feature-description"
                                            style={{ color: attributes.descriptionColor }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <RichText.Content
                            tagName="a"
                            value={attributes.buttonText}
                            className="about-button"
                            href={attributes.buttonUrl}
                            style={{
                                backgroundColor: attributes.buttonBackgroundColor,
                                color: attributes.buttonTextColor
                            }}
                        />
                    </div>
                    <div className="image-content">
                            {attributes.mediaUrl ? (
                                attributes.mediaType === 'video' ? (
                                    <video
                                        controls
                                        className="media-content"
                                        src={attributes.mediaUrl}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img
                                        src={attributes.mediaUrl}
                                        alt=""
                                        className="media-content"
                                    />
                                )
                            ) : (
                                <div className="video-placeholder">
                                    <span className="play-icon">▶</span>
                                </div>
                            )}
                        </div>
                </div>
            </div>
        );
    }
});